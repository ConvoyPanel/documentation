# Getting Started

Convoy Panel is designed to run in Docker containers. This setup enables consistent and secure deployments.
Unfortunately, the configuration makes it difficult to install the panel on web hosting platforms, and we don't provide
any support for non-standard installations.

You are expected to understand how to read documentation to use this Panel. We have spent many hours detailing how to
install or upgrade our software; take some time and read rather than copy and pasting and then complaining when things
do not work. This panel does not exist as a drag-and-drop service to run your servers. It is a highly complex system
requiring multiple dependencies and administrators willing to spend some time learning how to use it.
**If you expect to
be able to install this with no understanding of basic linux system administration you should stop and
turn around now.**

## Compatibility

Convoy runs on a plentiful variety of operating systems and is flexible with differing hardware configurations.

### Operating Systems

These are a list of operating systems known to work with Convoy. It's not a comprehensive list, so you may successfully
install Convoy on a system that's not listed here. However, we won't provide any support in case issues arise.

If you find that a system not listed on here that works,
please [let us know](https://github.com/ConvoyPanel/documentation/issues/new) and we can add it to the list.

::: warning
The panel cannot be installed in a container due to limitations with Docker.
:::

| Operating System       |     Supported      | Notes                                                                                                                                                                                    |
|------------------------|:------------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Debian 11 and later    | :white_check_mark: |                                                                                                                                                                                          |
| Ubuntu 20.04 and later | :white_check_mark: | Safe bet because this was Convoy's development environment.                                                                                                                              |
| Proxmox VE             |        :x:         | Hard no because Proxmox's networking setup interferes with Docker's network, leading to confusing network errors in Convoy. However, you may install the panel in a KVM virtual machine. |

### Proxmox VE

These are a list of virtual environments known to work with Convoy. It's not a comprehensive list, so you may use Convoy
on a version that's not listed here. However, we won't provide any support in case issues arise.

If you find that a version not listed on here that works,
please [let us know](https://github.com/ConvoyPanel/documentation/issues/new) and we can add it to the list. But note,
you must have thoroughly tested the compatibility as one part of Convoy working doesn't necessarily mean that it works
throughout.

| VE Version         | Panel Version    |
|--------------------|------------------|
| 7.2-7 &rarr; 7.3-4 | v1.x &rarr; v2.x |
| 7.3-4 and later    | v3.x and later   |

### Minimum Hardware Requirements

|        |        | Notes                                                                                                                                                                                                                                                                                                          |
|--------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| CPU    | 1 Core | Non-x86 architectures aren't supported because the MySQL image in our deployment doesn't support other platforms. You may swap it out for another database or use [Rosetta 2](https://en.wikipedia.org/wiki/Rosetta_(software)) on Apple Silicon, but we won't provide support for non-standard installations. |
| Memory | 4 GiB  | You may use swap, but it may cause degraded performance.                                                                                                                                                                                                                                                       |
| Disk   | 10 GiB |                                                                                                                                                                                                                                                                                                                |

### Odd Exceptions

The panel can't be hosted with hosting providers that utilize Combahton for DDoS protection. When Docker tries to build,
it can't locate the necessary packages over Combahton's network.

## Installation

### Install Docker

Convoy uses Docker for everything. The source code comes with a Docker configuration that will ensure that everything
works.

```bash
curl -fsSL https://get.docker.com/ | sh
```

::: warning
Please ensure your installation of Docker succeeded using the command above. Otherwise,
visit [Docker](https://docker.com) and find a guide for your operating system to manually install Docker.
:::

### Download Files

First, create the folder where the panel will be stored in and change your current directory to that newly created
folder.

```bash
mkdir -p /var/www/convoy
cd /var/www/convoy
```

Once you've created the directory and moved into it, you'll need to download the panel. Then, you'll need to unpack the
archive. Next, you'll need to set the correct permissions on the `storage/` and `bootstrap/cache/` directories.

```bash
curl -Lo panel.tar.gz https://github.com/convoypanel/panel/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
chmod -R o+w storage/* bootstrap/cache/
```

::: tip Tip
If you receive file permission errors like in [this picture](https://imgur.com/JsKKctZ.png), try
running `docker compose exec workspace chmod -R o+w storage/* bootstrap/cache/`
:::

### Configuration

First, we'll create a copy a new environment file.

```bash
cp .env.example .env
```

For the following configuration steps, you'll need to edit your environment file with an editor of your choice.

```bash
# nano
nano .env
# NeoVIM
nvim .env
# VIM
vim .env
```

### Configuring Your Environment File

#### Accessibility

First up, let's declare where this panel will be hosted. You'll need to edit the `APP_URL` variable with a URL that your
users can access. If you don't have a domain, you can host directly from your IP address by leaving it
as `APP_URL=http://localhost`

::: tip Pro-tip
Convoy comes with auto-TLS. If you'd like extra security, make sure to set your protocol to `https:`. However, auto-TLS
requires a registered domain that's pointed to your IP address, and if you're using Cloudflare or proxies, they must be
disabled.
:::

```ini
APP_URL=http://localhost
```

#### Database

Next, we need to configure the database credentials for

- `DB_DATABASE`
- `DB_USERNAME`
    - This value cannot be `root`
- `DB_PASSWORD`
- `DB_ROOT_PASSWORD`

If your password contains special characters, please wrap your value with double quotation marks.

```ini
DB_DATABASE=convoy
DB_USERNAME=convoy_user
DB_PASSWORD="I can use special characters here!"
DB_ROOT_PASSWORD=im_alphanumeric
```

#### Cache Server

Now we need to configure the cache server, which is essential to providing low-latency requests. Please supply a
password for the `REDIS_PASSWORD` variable. Again, if you need to use special characters, please wrap them in double
quotation marks.

```ini
REDIS_PASSWORD=a_secure_password
```

### Docker Build Step

Next, we need to build the Docker images that'll run Convoy.

```bash
docker compose up -d
```

### Installing Dependencies

```bash
docker compose exec workspace bash -c "composer install --no-dev --optimize-autoloader"
```

### Setting an Application Key

After installing the dependencies, you need to also set an application key `APP_KEY` in your environment file. This key
is used to hash your users' password and other cryptographic functions. It's wise to keep this key protected and backed
up.

```bash
docker compose exec workspace bash -c "php artisan key:generate --force && \
                                       php artisan optimize"
```

### Database Initialization

Now we need to migrate Convoy's database structure to your database. The command below may take a moment to complete.

```bash
docker compose exec workspace php artisan migrate --force
```

### Preparing for Production

After you've confirmed that your installation of Convoy is accessible, you'll need to edit your environment file again.
Update the `APP_ENV` and `APP_DEBUG` variables like in the following snippet:

```ini
APP_ENV=production
APP_DEBUG=false
```

Then, rebuild the Dockerfiles and fully restart the containers.

```bash
docker compose down
docker compose up -d --build
```

### Adding a User

Execute the command below and follow the steps that appear in your terminal.

```bash
docker compose exec workspace php artisan c:user:make
```

## Deployment FAQ

### What if I restart my machine?

Convoy is configured to automatically start up upon booting into your operating system. In an event that it doesn't,
you may run the command below.

```bash
docker compose up -d
```

### Editing my environment file doesn't do anything

Convoy caches your environment file at build time and runtime. If you made a change, you must rebuild your containers
and reset the cache.

```bash
docker compose down
docker compose up -d --build --no-cache
docker compose exec workspace bash -c "php artisan optimize:clear && \
                                       php artisan optimize"
```

