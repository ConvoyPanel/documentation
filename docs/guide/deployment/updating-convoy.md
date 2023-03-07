# Updating the Panel

This documentation covers the process for upgrading within the `3.x` series of releases. This means updating from — for example — `3.1.0` to `3.2.0`.

## Before You Begin

Please backup your files before proceeding so that you can rollback in an event of a broken update. It's as simple as copying the folder that contains Convoy, and it will contain your database entries (unless you're not using Convoy's pre-configured deployment), configuration, and Convoy itself.

Though, don't immediately start backing up right now as your panel is still running. Read the rest of this documentation, and we'll tell you when it's safe.

## Manual Update

### Enter Maintenance Mode

Whenever you are performing an update you should be sure to place your Panel into maintenance mode. This will prevent users from encountering unexpected errors and ensure everything can be updated before users encounter potentially new features.

Use the `secret` option to specify a maintenance mode bypass token, so you can access the queue system dashboard after setting your server into maintenance mode.

```sh
cd /var/www/convoy

docker compose up -d workspace
docker compose exec workspace php artisan down --secret="1630542a-246b-4b66-afa1-dd72a4c43515"
```

After placing Convoy in maintenance mode, you may navigate to the URL matching this token and Convoy will issue a maintenance mode bypass cookie to your browser:
```
https://example.com/1630542a-246b-4b66-afa1-dd72a4c43515
```
When accessing this hidden route, you will then be redirected to the `/` route of Convoy. Once the cookie has been issued to your browser, you will be able to browse Convoy normally as if it was not in maintenance mode.

### Check For Running Jobs

After you have set the Panel to maintenance mode, check Convoy's workers to see whether they are still processing jobs (e.g. server installations, backups, restorations). Goto `your.domain/horizon` after signing into Convoy with an account that has administrator privileges. Then, check whether there are still any jobs pending or processing.

If there are pending jobs or jobs in progress, patiently wait for them to complete. If you don't wait for the jobs to complete, you risk putting servers in an unknown state and this is not the only potential consequence.

![Screenshot of Laravel Horizon](https://imgur.com/5DAn80H.png)

### Shutting Down Containers

Once Convoy is idle, you can now safely turn off the Docker containers.

```sh
docker compose down
```

After turning off the containers, you may now backup Convoy.

### Download the Update

The first step in the update process is to download the new panel files from GitHub. The command below will download the release archive for the most recent version of Convoy, save it in the current directory and will automatically unpack the archive into your current folder.

```sh
curl -L https://github.com/convoypanel/panel/releases/latest/download/panel.tar.gz | tar -xzv
```

Once all of the files are downloaded we need to set the correct permissions on the cache and storage directories to avoid any webserver related errors.

```sh
chmod -R o+w storage/* bootstrap/cache
```

### Rebuilding Containers

Now that you have the update, proceed to rebuild the Docker containers for Convoy

```sh
docker compose build --no-cache
```

### Update Dependencies

After you've downloaded all of the new files you will need to upgrade the core components of the panel. To do this, simply run the commands below and follow any prompts.

```sh
docker compose up -d workspace
docker compose exec workspace composer install --no-dev --optimize-autoloader
```

### Database Updates

You'll also need to update your database schema for the newest version of Convoy. Running the command below will update the schema of your database.

```sh
docker compose up -d database
docker compose exec workspace php artisan migrate --force
```

### Clear Compiled Template Cache

You'll also want to clear the compiled template cache to ensure that new and modified templates show up correctly for users.

```sh
docker compose up -d redis
docker compose exec workspace php artisan optimize:clear
docker compose exec workspace php artisan optimize
```

### Starting the Ignition

Now that everything has been updated, you can start up the rest of the containers so that the Panel can resume accepting connections.

```sh
docker compose down
docker compose up -d
docker compose exec workspace php artisan up
```
