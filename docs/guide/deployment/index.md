# Deploying Convoy

::: danger
Convoy is not free software. Production use of Convoy is prohibited. You will need an active subscription or explicit permission from Performave.
:::

## Requirements

### Supported Operating Systems

| Operating System |     Supported      | Notes |
| ---------------- | :----------------: | ----- |
| Debian 11        | :white_check_mark: |       |
| Ubuntu 20.04     | :white_check_mark: |       |
| Ubuntu 22.04     | :white_check_mark: |       |

### Supported Proxmox Versions

| ProxmoxVE Version | Convoy Version             | Notes |
| ----------------- | -------------------------- | ----- |
| 7.2-7 & 7.3-4     | v1.1.0-beta to v2.0.3-beta |       |
| 7.3-4 & later     | v3.0.0-beta & later        |       |

### Minimum System Requirements

|        |        | Notes                               |
| ------ | ------ | ----------------------------------- |
| CPU    | 2 Core |                                     |
| Memory | 4 GiB  | Swap also works but not recommended |
| Disk   | 10 GiB |                                     |

## Install Docker

::: danger
There's ZERO support from Performave if you don't install Convoy with Docker.
:::

Convoy uses Docker for everything. The source code comes with a Docker configuration that will ensure that everything works. It's possible to use cPanel, but it'll be ABSOLUTELY hard. You'll be spending more time debugging configuration errors with cPanel than working at a retail job for enough money to buy a virtual machine to run Convoy smoothly.

```sh
curl -fsSL https://get.docker.com/ | sh
```

## Download Files

First, create the folder where the panel will be stored in and change your current directory to that newly created folder.

```sh
mkdir -p /var/www/convoy
cd /var/www/convoy
```

Once you've created the directory and moved into it, you'll need to download the panel. Then, you'll need to unpack the archive. Next, you'll need to set the correct permissions on the `storage/` and `bootstrap/cache/` directories.

```sh
curl -Lo panel.tar.gz https://github.com/convoypanel/panel/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
chmod -R 755 storage/* bootstrap/cache/
```

## Installation

Now you have all the files, it's time to configure Convoy.

First, we'll create a copy a new environment file.

```sh
cp .env.example .env
```

### Environment Configuration

First up, let's configure the display information and where this panel will be hosted. To determine what to use for `APP_URL`, first determine where you are hosting this panel. If you are hosting it on your IP address or locally, leave it as `http://localhost`. If you are hosting it on a domain, put `http://your-domain.name`. Additionally, if you want SSL automatically generated, replace `http://` with `https://` and make sure that your domain points to the IP address that's hosting Convoy.

```
APP_NAME=Convoy
...
APP_URL=http://localhost
```

Next, we'll need to configure the database credentials. You can define any alphanumeric values for `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_ROOT_PASSWORD`. If you want to use special characters for `DB_PASSWORD` and `DB_ROOT_PASSWORD` for security purposes, wrap the value with double quotation marks. Also, do not define the `DB_USERNAME` field as `root`, this will not work and the database will refuse to start up. Please leave `DB_HOST` as is.

```
DB_HOST=database
...
DB_DATABASE=convoy
DB_USERNAME=convoy_user
DB_PASSWORD='Use special characters by wrapping the password with quotation marks :)'
DB_ROOT_PASSWORD=this_is_alphanumeric_6_9
```

After, we need to configure the cache driver, queue driver, and the session driver for authorization.

```
CACHE_DRIVER=redis
...
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

Now, we need to configure the Redis server that'll store key value pairs in its hyper-fast storage. Please leave `REDIS_HOST` and `REDIS_PORT` as is.

```
REDIS_HOST=redis
REDIS_PASSWORD=SUPER_SECURE_PASSWORD
REDIS_PORT=6379
```

### Building the Dockerfiles

Awesome! You've completed the configuration step of deploying Convoy. Next, we need to build the Docker images that'll run Convoy.

```sh
docker compose up -d
```

### Installing & Building Dependencies

We now have to install the core dependencies that Convoy depends on.

```sh
docker compose exec workspace bash -c "composer install --no-dev --optimize-autoloader && \
                                       npm install && \
                                       npm run build"
```

### Setting an Application Key

We also have to generate an application key for Convoy. This key will be used for password hashes and other parts of Convoy that depends on cryptography. This command will also cache the current configuration for performance improvements. If any changes are ever made to Convoy, either the code or any configuration, it's good to rerun `php artisan optimize` to make sure the new values are cached.

```sh
# Only run the command below if you are installing this panel for
# the first time and do not have any data in the database.
docker compose exec workspace bash -c "php artisan key:generate --force && \
                                       php artisan optimize"
```

::: danger
Back up your encryption key (APP_KEY in the `.env` file). It is used as an encryption key for all data that needs to be stored securely (e.g. api keys). Store it somewhere safe - not just on your server. If you lose it all encrypted data is irrecoverable -- even if you have database backups.
:::

### Database Setup

Now we need to scaffold the tables for Convoy in the database. **The command below may take a while to run depending on your machine. Please do not exit the process until it is completed.**

```sh
docker compose exec workspace php artisan migrate --force
```

### Preparing for Production

Go back in your `.env` file you've copied while following the steps for `Environment Configuration`. Edit `APP_ENV` and `APP_DEBUG`. Making the following changes for `APP_ENV` will enable caching in PHP-FPM to serve requests faster. Editing `APP_DEBUG` will disable verbose error messages from emitting (it's also for security purposes as sometimes these verbose logs will dump your environment file).

```
APP_ENV=production
...
APP_DEBUG=false
```

Then, rebuild the Dockerfiles and fully restart the containers.

```sh
docker compose build
docker compose down
docker compose up -d
```

### Adding a User

```sh
docker compose exec workspace php artisan c:user:make
```

## FAQ

### What happens if I restart the machine running Convoy?

Convoy is configured to automatically start up upon reboots or from any crashes the application may encounter. In case if it doesn't restart, run the following commands to bring up the Docker containers.

```sh
cd /var/www/convoy
docker compose up -d
```

### My performance isn't as expected

If Convoy isn't able to keep up with the demand of your users, you can try tweaking the settings of PHP-FPM. In `/var/www/convoy/dockerfiles/php/Dockerfile`, there is this specific line below. Tweak `100` to any number. This number dictates how many concurrent requests PHP-FPM can handle. We don't recommend putting a million or a sextillion because in times of heavy traffic, Convoy can consume too many resources and crash your system.

```
RUN echo 'pm.max_children = 100' >> /usr/local/etc/php-fpm.d/zz-docker.conf
```

You can also tweak the [PHP OPCache settings](https://www.php.net/manual/en/intro.opcache.php) that will provide performance improvements for both heavy traffic and even light traffic—by decreasing the latency of each request. I'd recommend searching `how to optimize PHP OPCache` on Google and make sure the article was posted in the last two years (and not 7 years). Then, you can tweak the OPCache settings in `/var/www/convoy/dockerfiles/php/php.ini-production` or `/var/www/convoy/dockerfiles/php/php.ini-development` if your `APP_ENV` is set to `local`.

After you make the necessary changes, you can make them live with the following commands.

```sh
docker compose build
docker compose up -d
```

### My changes in the .env or environment file isn't going live or persisting

If you made changes to your environment file, Convoy won't pick it up until the configuration cache is cleared. Run the commands below to recache the configuration.

```sh
docker compose exec workspace bash -c "php artisan optimize:clear && \
                                       php artisan optimize"
```
