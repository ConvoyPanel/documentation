# Deploying Convoy

::: danger
Convoy is not free software. Production use of Convoy is prohibited. You will need an active subscription or explicit permission from Performave.
:::

## Prerequisites

- Basic knowledge about Docker commands, specifically Docker compose.
    - `docker compose build`
    - `docker compose up -d`
        - add a `--build` flag to combine the first and second command.
    - `docker compose down`
    - `docker compose restart`
    - `docker compose stop <container>`
- Basic Convoy maintenance commands
    - Clear cache - `docker compose exec workspace php artisan optimize:clear`
    - Cache - `docker compose exec workspace php artisan optimize`

## Requirements

### Supported Operating Systems

::: danger
Do not install Convoy in a container. If you can't install Convoy on bare metal, use KVM but please do not install Convoy in a container.
:::

| Operating System |     Supported      | Notes                                                                            |
| ---------------- | :----------------: | -------------------------------------------------------------------------------- |
| Debian 11        | :x:                | This OS is known to have issues with Convoy, including resource hogging to the point that the system freezes, networking issues, etc.                                                                                 |
| Ubuntu 20.04     | :white_check_mark: |                                                                                  |
| Ubuntu 22.04     | :white_check_mark: | The development server for Convoy runs on Ubuntu, so it's known to work                                                                                 |
| Proxmox VE       |        :x:         | Docker, which Convoy relies on, doesn't work properly on the host Proxmox system |



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
We do not provide support for methods of deployment other than our official Docker configuration.
:::

::: danger
Do not install Convoy/Docker on your host Proxmox system. This includes even containers as it's not complete isolation from the Proxmox OS. If you install Convoy in a KVM container in Proxmox, make sure it doesn't have Cloudinit installed because anything can interfere with Docker's networking.
:::

Convoy uses Docker for everything. The source code comes with a Docker configuration that will ensure that everything works.

```sh
curl -fsSL https://get.docker.com/ | sh
```

::: danger
Make sure Docker installed correctly with ZERO error messages. Do not proceed if the command above resulted in a non-zero exit code, install Docker manually. For example, if you are using Ubuntu, you can try this official guide from Docker https://docs.docker.com/engine/install/ubuntu/
:::

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
chmod -R o+w storage/* bootstrap/cache/
```

::: warning
If you receive file permission errors like in [this picture](https://imgur.com/JsKKctZ.png), try running `docker compose exec workspace chmod -R o+w storage/* bootstrap/cache/`
:::

## Installation

Now you have all the files, it's time to configure Convoy.

First, we'll create a copy a new environment file.

```sh
cp .env.example .env
```

For the following section, you need to edit the ".env" file, you just created. To do so, open the file with any text editor (i.e. nano).

```sh
nano .env
```

### Environment Configuration

First up, let's configure the display information and where this panel will be hosted. To determine what to use for `APP_URL`, first determine where you are hosting this panel. If you are hosting it on your IP address or locally, leave it as `http://localhost`. If you are hosting it on a domain, put `http://your-domain.name`. Additionally, if you want SSL automatically generated, replace `http://` with `https://` and make sure that your domain points to the IP address that's hosting Convoy. Please note that automatic SSL does not work with Cloudflare proxy.

```
APP_NAME=Convoy
...
APP_URL=http://localhost
```

Next, we'll need to add credentials for the `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and `DB_ROOT_PASSWORD` fields. You can define alphanumeric values or have a combination of special characters too. If you want to use  any special characters at all, you **have** to wrap the value in single quotation marks. Also, set the `DB_USERNAME` field anything other than `root` or else your database **won't start**. In addition, you **have** to define a `DB_ROOT_PASSWORD` too for your database to start. Finally, leave `DB_HOST` as is.

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

Now, we need to configure the Redis server that'll store key value pairs in its in-memory storage, which provides performance benefits especially if you want low latency requests. Also note again, if you want to use special characters on top of alphanumeric characters, you **have** to wrap the value in single quotation marks. Finally, leave `REDIS_HOST` and `REDIS_PORT` as is.

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

::: warning
If you come across errors like "unable to locate package" [like this](https://imgur.com/hE3E7xq.ong), then make sure your host system has updated package lists and is connected to the internet. Also, check if this is an issue with your network or DDoS provider. Combahton DDoS protection is known to have issues.
:::

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

::: danger
Make sure to check if Convoy is running properly by visiting the panel in your browser before preparing for production as you will not get any debug information in production.
:::

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
