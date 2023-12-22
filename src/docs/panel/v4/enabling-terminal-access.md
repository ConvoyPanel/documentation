# Enabling Terminal Access

Additional files must be downloaded on your Proxmox node for terminals to work. The source code for the broker is
available in a [repository](https://github.com/convoypanel/broker).

## Compatibility

| Broker Version | Panel Version  |
|----------------|----------------|
| v1.x and later | v3.x and later |

## Installation

Below is the command to install the terminal broker to enable console sessions over the web.

::: danger Pro-tip
You must run this command on the `/` directory of your Proxmox system.
:::

```bash
curl -fsSL https://github.com/convoypanel/broker/releases/latest/download/broker.tar.gz | tar -xzv
```

## Security Notice

The terminal broker does expose the node IP address when users are connected. If you would like to hide it, please check
out [Coterm](/docs/misc/coterm), our in-house terminal proxy for Proxmox.