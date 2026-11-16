# Getting Started

> [!WARNING] Alpha
> Convoy 5 is in alpha. Use it for test installs and to rehearse your upgrade, and keep production panels on
> [Convoy 4](/docs/panel/v4/getting-started) until 5.0 is released.

Convoy 5 is the same panel as Convoy 4, with the same pages, API, and data, packaged differently: it runs from a
ready-made container image on Postgres, and one command installs it. You no longer download the source, build
containers, or run Composer yourself.

If you already run Convoy 4, don't install from scratch. Follow [Upgrading from v4](/docs/panel/v5/upgrading-from-v4)
instead, which carries your data across.

You'll need to be comfortable on a Linux command line: connecting over SSH, running commands as root, and editing a
file. Convoy expects a host of its own. It takes ports 80 and 443 and assumes nothing else on the machine uses them.

## Compatibility

### Operating Systems

These are the systems the installer is tested on. Others that run Docker may work, but we can't help with problems that
only happen on them.

| Operating System             | Supported | Notes                                                                                                                                                       |
|------------------------------|:---------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Debian 12 and 13             |    ✅     |                                                                                                                                                             |
| Ubuntu 22.04 and 24.04       |    ✅     |                                                                                                                                                             |
| AlmaLinux and Rocky Linux 9 and 10 |    ✅     |                                                                                                                                                       |
| Proxmox VE                   |    ❌     | Proxmox's networking interferes with Docker's, which causes confusing network errors in Convoy. Install the panel in a virtual machine instead. |

### Proxmox VE

| VE Version      | Panel Version  |
|-----------------|----------------|
| 7.3-4 and newer | v3.x and newer |

### Minimum Hardware Requirements

|        |        | Notes                                                                                   |
|--------|--------|-----------------------------------------------------------------------------------------|
| CPU    | 2 Core | `x86_64` or `arm64`. Upgrading from v4 needs `x86_64`.                                  |
| Memory | 2 GiB  | 4 GiB is recommended.                                                                   |
| Disk   | 20 GiB |                                                                                         |

## Installing the Panel

Run the installer as root:

```bash
curl -fsSL https://install.convoypanel.com/5 | sudo bash -s -- --version 5.0.0-alpha.5
```

It asks for two things: the hostname your customers will reach the panel on (such as `panel.example.com`), and an email
address for the first administrator. Then it installs Docker if it's missing, writes the install to `/opt/convoy`,
installs the `convoy` command, starts the panel, and prints its address with a temporary password:

```
Convoy is installed.

  URL        https://panel.example.com
  Email      you@example.com
  Password   Kd8vQ2mXbR!t7LwPz3Na
```

Sign in and change that password. It isn't stored anywhere else.

To install without being asked anything, for example from a provisioning script, pass the answers up front:

```bash
curl -fsSL https://install.convoypanel.com/5 | sudo bash -s -- --version 5.0.0-alpha.5 \
  --domain panel.example.com --email you@example.com --yes
```

### Choosing a Version

`--version` decides what you install, and the choice is saved, so updating never moves you past it:

- `5.0.0-alpha.5` installs exactly that release. While Convoy 5 is in alpha, this is the only way in.
- Once 5.0 is released, `5` (the default, when you leave `--version` out) follows the newest 5.x release, and `5.1`
  follows the newest 5.1.x.

[Updating the Panel](/docs/panel/v5/updating-the-panel) explains how to change it later.

## Securing the Panel with HTTPS

If the hostname you gave the installer is a domain that points at the host, the panel gets a certificate from Let's
Encrypt by itself and renews it before it expires. This needs ports 80 and 443 reachable from the internet. If you use
Cloudflare or another proxy in front of the domain, turn it off until the first certificate is issued.

If you gave it an IP address instead, the panel uses a self-signed certificate, because certificate authorities don't
issue certificates for IP addresses. Browsers will warn on the first visit. To fix it later, point a domain at the host
and set it as described in [Changing Settings](#changing-settings).

### Running Behind Your Own Proxy or Load Balancer

If nginx, Nginx Proxy Manager, Cloudflare, or a load balancer already handles HTTPS for the domain, follow
[Running Behind a Reverse Proxy](/docs/panel/v5/running-behind-a-reverse-proxy) instead. It takes a few settings in
`/opt/convoy/.env`, with examples for the common proxies.

## Changing Settings

Every setting lives in one file, `/opt/convoy/.env`. After editing it, apply the change:

```bash
convoy up
```

This recreates the containers that use the file. `convoy restart` is not enough, because a restarted container keeps
the settings it started with.

To move the panel to a different hostname, change both `APP_DOMAIN` (the bare hostname) and `APP_URL` (the same
hostname with `https://`), then run `convoy up`. The panel requests a certificate for the new name.

## Managing the Panel with the `convoy` Command

The installer adds a `convoy` command for the everyday jobs:

```
convoy ps                    status of every container
convoy logs web              follow the panel's logs
convoy upgrade               back up, update, restart, and check the panel
convoy backup                save a copy of the database to /opt/convoy/backups
convoy artisan <command>     run an Artisan command
convoy shell                 open a shell in the panel's container
convoy horizon               check the queue worker
convoy export-activity       export the activity log as CSV
convoy support               send logs to the Convoy team
```

It's a thin wrapper around Docker Compose. If you already know Docker, `cd /opt/convoy` and use `docker compose`
directly; nothing breaks.

To create another administrator from the command line:

```bash
convoy artisan users:create
```

## Backing Up the Database

`convoy backup` saves a compressed copy of the database to `/opt/convoy/backups`. `convoy upgrade` runs it before every
update, but nothing runs it on a schedule. To keep a nightly copy, add it to root's crontab:

```
0 3 * * * /usr/local/bin/convoy backup >/dev/null
```

Copy the backups somewhere off the host as well. Keep `/opt/convoy/.env` with them: its `APP_KEY` is what decrypts the
node credentials and two-factor secrets in the database, and a backup without it can't restore those.

## Deployment FAQ

### What if I restart my machine?

The panel starts again by itself once Docker is up. If it doesn't, start it with:

```bash
convoy up
```

### What is actually running?

Five containers, all defined in `/opt/convoy/compose.yml`:

| Container   | What it does                                                                                         |
|-------------|------------------------------------------------------------------------------------------------------|
| `web`       | Serves the panel and handles HTTPS.                                                                  |
| `worker`    | Runs queued jobs. Every action on a server goes through it, so nothing happens on Proxmox without it. |
| `scheduler` | Runs the timed jobs, such as syncing server usage.                                                   |
| `postgres`  | The database.                                                                                        |
| `redis`     | The queue, cache, and sessions.                                                                      |

The first three run the same image and read the same `.env`.

### Can I use my own database or Redis?

Yes. Point the `DB_` and `REDIS_` settings in `/opt/convoy/.env` at your servers, then remove the `postgres` and `redis`
services from `/opt/convoy/compose.yml`, along with the `depends_on` blocks that mention them and their entries under
`volumes`. Apply it with `cd /opt/convoy && docker compose up -d --remove-orphans`. `convoy backup` only covers the
bundled database, so back up your own with your provider's tools. Updates leave your edited `compose.yml` alone and
save each release's as `compose.yml.new`, so compare the two after updating.

### The panel won't start

Its startup checks stop it on purpose when something is wrong, and say what:

```bash
convoy logs web
```

The usual causes are a missing `APP_KEY`, an `APP_URL` still set to `localhost`, or a certificate that can't be issued
because port 80 isn't reachable or the domain points somewhere else. If the logs don't make it clear,
[Getting Help](/docs/panel/v5/getting-help) explains how to send them to us.
