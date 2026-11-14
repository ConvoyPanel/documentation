# Telemetry

We build Convoy for panels we can't see. Without numbers, we can't tell how many panels a change would affect, which
Proxmox and PHP versions are still in use, or which pages people actually open. So once a day, Convoy 5 sends the
Convoy team an anonymous report of counts and version numbers. It replaces the Plausible script that Convoy 4 loaded on
every page; the panel now loads no third-party scripts at all.

It's on by default, and you can see exactly what it sends or turn it off at any time.

## What the Report Contains

- **Versions:** the panel's version, PHP's, the database's, and each node's Proxmox VE version.
- **Size:** how many accounts and administrators there are, and how many signed in during the last day, week, and
  month; each node's CPU count, memory, and number of servers; and totals such as backups, locations, addresses, and
  API tokens.
- **Setup:** whether any node uses Coterm, and whether the panel can send mail.
- **Page views:** how many times each page was opened since the last report, counted by page (for example "a server's
  backups page"), never by address or by who opened it.
- **A random installation id**, so a day's report replaces the previous one instead of counting the panel twice.

## What Is Never Sent

- Names, email addresses, IP addresses, hostnames, or URLs, including the panel's own address.
- Your license key, `APP_KEY`, or anything derived from them.
- Anything typed into the panel: server names, descriptions, or activity log entries.
- Who did anything. Every count is a total for the whole panel.

The installation id is random. It isn't derived from your license, your address, or `APP_KEY`. The Convoy team stores
the country the report came from, not the address it came from.

## Seeing Exactly What Is Sent

Open **Admin → Settings → Telemetry** and choose **View report**. It shows the JSON the next report will send, built by
the same code that sends it. From the command line:

```bash
convoy artisan c:telemetry:show
```

The [full description of every field](https://github.com/ConvoyPanel/panel/blob/5.x/docs/telemetry.md) is in the
panel's repository.

## Turning It Off

Switch it off under **Admin → Settings → Telemetry**, or run:

```bash
convoy artisan c:telemetry:disable
```

Either way, the panel stops sending reports, asks the Convoy team to erase every report already received from it, and
replaces its installation id. If you turn it back on later, it starts as a new installation, with nothing from the time
it was off.

For a panel that should never report, for example one without internet access, set this in `/opt/convoy/.env` and run
`convoy up`:

```ini
CONVOY_TELEMETRY_ENABLED=false
```

This stops the reports without contacting the Convoy team, so it doesn't erase reports already sent. Use the switch in
the admin area for that.

## When It Is Sent

Once a day, at a minute of the day picked from the installation id, so reports from every panel are spread across the
day. A report that fails isn't retried; the next day's report carries its page views.

## Other Connections the Panel Makes

Telemetry is the only thing the panel sends about itself. It also makes two requests that send nothing but its version
number, and you can turn off either one in `/opt/convoy/.env`:

| What                                                     | How often   | To turn it off               |
|----------------------------------------------------------|-------------|------------------------------|
| Fetches security notices and news from the Convoy team.   | Once an hour | `CONVOY_ANNOUNCEMENTS_URL=`  |
| Checks GitHub for a newer release, for the Updates page. | Once an hour | `CONVOY_RELEASES_URL=`       |

Logs only leave the panel when you run [`convoy support`](/docs/panel/v5/getting-help) and agree to upload them.
