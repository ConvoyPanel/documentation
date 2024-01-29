# Coterm

<p align="center">
  <img src="https://github.com/ConvoyPanel/coterm/assets/37554696/a79f7746-1ff0-4b7b-af2a-723f0a8f7de8" alt="Coterm banner" />
</p>

[Convoy terminal](https://github.com/ConvoyPanel/coterm) is a console proxy for Convoy that hides the Proxmox origin IP
address. Written with Rust and utilizing Svelte, Coterm is built for performance, and every millisecond counts.

## Quick start

```
docker run -p 2115:2115 -e CONVOY_URL="<panel url>" -e COTERM_TOKEN="<coterm token>" ghcr.io/convoypanel/coterm:latest
```

The port can be modified by editing the first number to a different value. For example, if you want to broadcast on port
80, you do `...-p 80:2115...`. More information about publishing ports can be
found [here](https://docs.docker.com/network/#published-ports) on the Docker documentation.

## Docker compose

While the quick start is an easy way to get up and running, you may want to enable TLS for Coterm to serve console
sessions securely. For that reason, we recommend using a `docker-compose.yml` configuration. The default configuration
we have below is for [Caddy](https://caddyserver.com/). You may modify the settings to use other web servers like Nginx,
Apache, etc.

Download the example compose file and environment file

```sh
curl -o docker-compose.yml https://raw.githubusercontent.com/ConvoyPanel/coterm/develop/docker-compose.example.yml
curl -o .env https://raw.githubusercontent.com/ConvoyPanel/coterm/develop/.env.docker.example
```

Please open the `.env` environment file in your editor of choice and populate the variables.

If you need to modify the Caddy web server configuration, please refer to
the [Caddyfile documentation](https://caddyserver.com/docs/caddyfile).

## Updating Coterm

### Compose file

To update Coterm to the latest version, simply run `docker compose pull`, `docker compose down`,
and `docker compose up -d`.

### Docker run command

To update Coterm to the latest version, run `docker pull ghcr.io/convoypanel/coterm:latest`. Then, stop the existing
container with `docker stop <container id>` (you can find the container id by running `docker ps`). Finally, run the new
container with the same command you used to start it.

## FAQ

### Invalid TLS Certificates

::: danger
This option makes your Coterm vulnerable to man-in-the-middle attacks. Only use this option if you know what you are
doing. It's also pretty irresponsible to use this option in production, especially as a hosting provider.
:::

If you are using a self-signed certificate that isn't trusted in the Docker container that's running Coterm, you will
get
TLS verification errors. Although very insecure, you can set this option in your environment file to disable TLS

```ini
DANGEROUS_DISABLE_TLS_VERIFICATION=true
```

or use this flag on your Docker run command

```sh
-e DANGEROUS_DISABLE_TLS_VERIFICATION=true
```

After setting this option, you will need to restart your Coterm container for the changes to take effect. You can check
when you see this message in the logs below.

![Console message indicating that Coterm TLS verification is disabled](/assets/images/coterm-console-indicating-tls-verify-disabled.png)