# Configuring NoVNC

Install the noVNC broker to allow clients to connect their servers. Without this, clients will not be able to manage their servers from
the web.

Make sure you run the command below on the `/` directory of your Proxmox node.

```sh
curl -fsSL https://github.com/convoypanel/broker/releases/latest/download/broker.tar.gz | tar -xzv
```
