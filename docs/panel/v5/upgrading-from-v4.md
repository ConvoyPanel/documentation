# Upgrading from v4

> [!WARNING] Alpha
> Convoy 5 is in alpha. Rehearse the upgrade on your own data now, but keep production panels on v4 until 5.0 is
> released.

Convoy 6, the rewritten panel, will only upgrade from Convoy 5. Convoy 5 is the step in between: the panel you already
run, with the same pages, API, and data, moved onto Postgres and a container image. Making that move now, while the
panel itself doesn't change, means the later jump to Convoy 6 is an ordinary update.

A v4 install lives in `/var/www/convoy`, keeps its data in MySQL, and is built from source. Convoy 5 lives in
`/opt/convoy` and keeps its data in Postgres. One command copies everything across, and it never changes the v4 install,
so you can always go back to it.

## What Comes Across

- Every account, server, node, location, address pool, template, backup record, and API token. Customers sign in with
  the passwords they already have, and billing integrations keep working with their existing tokens.
- `APP_KEY`, unchanged. It decrypts the node credentials and two-factor secrets in the database, so without it those
  would be unreadable.
- The panel's address (`APP_URL`) and its mail settings.
- Uploaded files from `storage/app`, and the TLS certificates v4 already obtained.

Other settings you changed in v4's `.env` don't come across. If you set any, set them again in `/opt/convoy/.env`
afterwards.

## Before You Begin

You'll need:

- v4.6.2 or later. [Update v4](/docs/panel/v4/updating-the-panel) first if it's older.
- An `x86_64` host. The tool that converts the database crashes on `arm64`.
- Enough free disk for a compressed copy of v4's database plus a second, uncompressed copy in Postgres.

## Rehearsing on a Copy

Start with a dry run. It sets up Convoy 5 in `/opt/convoy`, then converts a copy of your data and checks it, while v4
keeps serving your customers:

```bash
curl -fsSL https://install.convoypanel.com/5 | sudo bash -s -- --version 5.0.0-alpha.5 --import /var/www/convoy --dry-run
```

It dumps v4's database, converts it to Postgres, compares the number of rows in every table, starts Convoy 5 on the
copy, and checks that every encrypted value decrypts and every record loads. Then it throws the copy away and prints
`Dry run passed.` Nothing your customers see changes.

If the dry run fails, it says which step failed and v4 is unaffected. [Getting Help](/docs/panel/v5/getting-help)
explains how to send us the details.

## Running the Upgrade

Once a dry run passes, run the import for real:

```bash
convoy import-v4 /var/www/convoy
```

The panel is offline from here until Convoy 5 is running, which takes a few minutes for most panels and longer for very
large databases. The import:

1. puts v4 into maintenance mode, waits up to five minutes for running jobs such as backups to finish, and stops v4's
   queue workers,
2. saves a compressed copy of v4's database to `/opt/convoy/backups` and stops v4,
3. converts the copy to Postgres and compares the row counts again,
4. starts Convoy 5 on the same ports and checks it the same way the dry run did,
5. copies over uploaded files and certificates.

When it finishes, it prints the panel's address. Sign in as you did on v4.

If v4 ran on an IP address or plain `http://`, Convoy 5 starts with a self-signed certificate.
[Securing the Panel with HTTPS](/docs/panel/v5/getting-started#securing-the-panel-with-https) explains how to switch to a
real one.

## Going Back to v4

The import prints these commands when it finishes, and again if it fails partway:

```bash
docker compose -f /opt/convoy/compose.yml down
cd /var/www/convoy && docker compose up -d --force-recreate && docker compose exec php php artisan up
```

They stop Convoy 5 and bring v4 back exactly as it was before the import. Anything that changed in Convoy 5 after the
import, such as new servers or accounts, isn't copied back, so decide soon after upgrading.

Once you're happy with Convoy 5, `/var/www/convoy` can be archived or removed. Keep the database copy in
`/opt/convoy/backups` until you're sure.

## After the Upgrade

From now on, `convoy` manages the panel. [Getting Started](/docs/panel/v5/getting-started#managing-the-panel-with-the-convoy-command)
lists what it does, and [Updating the Panel](/docs/panel/v5/updating-the-panel) covers updates.

Administrators will see a notice that the panel now sends an anonymous daily usage report.
[Telemetry](/docs/panel/v5/telemetry) explains exactly what it sends and how to turn it off.
