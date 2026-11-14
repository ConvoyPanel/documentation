# Running Behind a Reverse Proxy

If nginx, Nginx Proxy Manager, Caddy, Traefik, Cloudflare, or a load balancer already handles HTTPS for your domain, put
the panel behind it instead of letting the panel get its own certificate. You change a few settings in
`/opt/convoy/.env` and point your proxy at the panel. You don't edit any of the panel's files, so updates keep working.

One rule matters more than the rest: your proxy talks to the panel over HTTPS. The panel's port 80 only redirects to
HTTPS, so a proxy that forwards plain HTTP is sent back to itself on every request, and the browser gives up with "too
many redirects".

## Configuring the Panel

Add these to `/opt/convoy/.env`, with your panel's hostname in place of `panel.example.com`:

```ini
CONVOY_AUTO_HTTPS=off
CADDY_GLOBAL_OPTIONS="default_sni panel.example.com"
TRUSTED_PROXIES=203.0.113.20
```

- `CONVOY_AUTO_HTTPS=off` stops the panel from requesting certificates from Let's Encrypt. It serves a self-signed
  certificate instead, which only your proxy sees.
- `CADDY_GLOBAL_OPTIONS` lets the panel use that certificate for connections that don't name the hostname they want.
  Nginx, Nginx Proxy Manager, and Traefik connect that way by default, and without this line they answer "502 Bad
  Gateway". Use the same hostname as `APP_DOMAIN`.
- `TRUSTED_PROXIES` is the address your proxy connects from.
  [Finding the Proxy's Address](#finding-the-proxys-address) explains what to put there.

Leave `APP_DOMAIN` and `APP_URL` set to the hostname your customers use, such as `https://panel.example.com`. Then apply
the changes:

```bash
convoy up
```

### When the Proxy Runs on the Same Machine

Your proxy needs ports 80 and 443, so move the panel to other ports, on an address only this machine can reach:

```ini
CONVOY_HTTP_PORT=172.17.0.1:8080
CONVOY_HTTPS_PORT=172.17.0.1:8443
```

`172.17.0.1` is Docker's own address on the machine, which `ip -4 addr show docker0` shows. A proxy installed on the
machine and one running in a container, such as Nginx Proxy Manager, can both reach it, and nothing outside the machine
can. Your proxy then forwards to `https://172.17.0.1:8443`.

The installer won't run while something else is using port 80 or 443. If your proxy already runs on this machine, stop
it while you install, make the changes above, and then start it again.

## Finding the Proxy's Address

The panel takes a visitor's address from the `X-Forwarded-For` header only when the request comes from an address in
`TRUSTED_PROXIES`. If the setting is wrong, the panel still works, but every request looks like it came from your
proxy: the activity log shows the proxy's address, and rate limits treat all your customers as one visitor.

- **A proxy on the same machine** reaches the panel through the panel's Docker network, so the panel sees that
  network's gateway. This prints it:

  ```bash
  docker network inspect convoy_default --format '{{(index .IPAM.Config 0).Gateway}}'
  ```

- **A proxy on another machine** is that machine's address, as the panel's machine sees it.
- **Cloudflare** is Cloudflare's address ranges. This prints them as one line to paste:

  ```bash
  { curl -fsS https://www.cloudflare.com/ips-v4; echo; curl -fsS https://www.cloudflare.com/ips-v6; } | grep . | paste -sd, -
  ```

Separate several addresses with commas. Ranges such as `10.0.0.0/8` work too. Never use `*`, which lets anyone who
reaches the panel directly choose the address it records.

To check the value, run `convoy logs web`, load a page through your proxy, and look at `remote_ip` in the newest line.
That is the address the panel sees, and it should be in `TRUSTED_PROXIES`.

## Configuring Your Proxy

Whichever proxy you use, it has to:

1. Forward to the panel's HTTPS port: `https://172.17.0.1:8443` on the same machine, or `https://` and the panel's
   address on port 443 from anywhere else.
2. Pass the hostname the visitor asked for in the `Host` header. The panel only answers to `APP_DOMAIN`, and a request
   for any other name gets an empty page.
3. Skip checking the panel's certificate, because it is self-signed. The connection is still encrypted, but nothing
   checks who is on the other end, so keep the path between your proxy and the panel on a network you trust.
4. Send the visitor's address in `X-Forwarded-For`.

### Examples for Common Proxies

#### nginx

```nginx
server {
    listen 443 ssl;
    server_name panel.example.com;

    ssl_certificate     /etc/letsencrypt/live/panel.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.example.com/privkey.pem;

    location / {
        proxy_pass https://172.17.0.1:8443;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

server {
    listen 80;
    server_name panel.example.com;
    return 301 https://$host$request_uri;
}
```

Keep `proxy_set_header Host $host`. Without it, nginx sends the panel's address as the hostname, and the panel answers
with an empty page. nginx doesn't check the panel's certificate unless you turn on `proxy_ssl_verify`.

#### Nginx Proxy Manager

Add a proxy host:

| Field                 | Value                                                           |
|-----------------------|-----------------------------------------------------------------|
| Domain Names          | `panel.example.com`                                             |
| Scheme                | `https`                                                         |
| Forward Hostname / IP | `172.17.0.1`, or the panel's address if it's on another machine |
| Forward Port          | `8443`, or `443` if the panel is on another machine             |

On the SSL tab, choose or request a certificate for the domain and turn on Force SSL. Nginx Proxy Manager passes the
hostname and the visitor's address on its own, and doesn't check the panel's certificate.

#### Caddy

```caddy
panel.example.com {
	reverse_proxy https://172.17.0.1:8443 {
		header_up Host {host}
		transport http {
			tls_insecure_skip_verify
		}
	}
}
```

Keep `header_up Host {host}`. When Caddy forwards to an HTTPS address, it otherwise sends that address as the hostname,
and the panel answers with an empty page.

#### Traefik

With the file provider, using the names of your own entry point and certificate resolver:

```yaml
http:
  routers:
    convoy:
      rule: Host(`panel.example.com`)
      entryPoints: [websecure]
      service: convoy
      tls:
        certResolver: letsencrypt
  services:
    convoy:
      loadBalancer:
        serversTransport: convoy
        servers:
          - url: https://172.17.0.1:8443
  serversTransports:
    convoy:
      insecureSkipVerify: true
```

#### Cloudflare

1. Proxy the panel's DNS record, so it shows the orange cloud.
2. Under SSL/TLS, set the encryption mode to **Full**. Flexible makes Cloudflare connect over plain HTTP, which loops,
   and Full (strict) rejects the panel's self-signed certificate.
3. Put Cloudflare's address ranges in `TRUSTED_PROXIES`, as described in
   [Finding the Proxy's Address](#finding-the-proxys-address).

Cloudflare connects to the panel on port 443 of its public address, so leave the panel's ports as they are.

## When Something Goes Wrong

| What you see                                          | What to check                                                                                                                      |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| The browser says the page redirects too many times    | The proxy forwards to port 80 or to an `http://` address instead of the panel's HTTPS port. On Cloudflare, the mode is Flexible.   |
| The proxy answers "502 Bad Gateway"                   | `CADDY_GLOBAL_OPTIONS` is missing or names a different host than `APP_DOMAIN`, or the proxy forwards to the wrong address or port. |
| A blank page with no error                            | The proxy doesn't pass the visitor's hostname in `Host`. The nginx and Caddy examples above show the line that does.               |
| The activity log shows the same address for everyone  | `TRUSTED_PROXIES` doesn't contain the `remote_ip` from `convoy logs web`.                                                          |
| Links in emails point somewhere customers can't reach | `APP_URL` isn't the address your customers use.                                                                                    |

After changing `/opt/convoy/.env`, run `convoy up` again. A restart isn't enough, because a restarted container keeps
the settings it started with.
