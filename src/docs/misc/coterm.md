# Coterm

[Convoy terminal](https://github.com/ConvoyPanel/coterm) is a console proxy for Convoy that hides the Proxmox origin IP
address. Written with Rust and utilizing Svelte, Coterm is built for performance, and every millisecond counts.

::: warning notice
Xterm.js support is currently not implemented. We're asking the community for support in helping us reverse engineer the network layer of Proxmox's Xterm.js sessions. A write-up on our issue can be found [here](https://forum.proxmox.com/threads/cannot-proxy-xterm-js-traffic.137831/).
:::

## Quick Start

```
docker run -p 3000:3000 -e CONVOY_URL="<panel url>" -e TOKEN="<coterm token>" ghcr.io/convoypanel/coterm:latest
```

The port can be modified by editing the first number to a different value. For example, if you want to broadcast on port
80, you do `...-p 80:3000...`. More information about publishing ports can be
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
