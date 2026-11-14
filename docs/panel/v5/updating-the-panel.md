# Updating the Panel

This page covers updates within Convoy 5, for example from `5.0.0-alpha.1` to a newer 5.x release. To move a v4 panel
onto Convoy 5, follow [Upgrading from v4](/docs/panel/v5/upgrading-from-v4) instead.

## Finding Out About Updates

Security notices and news from the Convoy team that apply to your version appear on the admin overview. Critical ones
also appear as a banner on every page an administrator opens, until you update. **Admin → Settings → Updates** lists them all, along with the newest release on
GitHub, checked once an hour. That check only sees full releases, so during the alpha, new alphas appear on the
[releases page](https://github.com/ConvoyPanel/panel/releases) instead.

## Updating

```bash
convoy upgrade
```

That's the whole update. You don't need to check for running jobs first:

1. It downloads the new release and updates the `convoy` command to the one that comes with it.
2. It stops starting new jobs and lets the queue worker finish the ones it's running. Backups, installs, and restores
   keep running on Proxmox in the meantime, and the panel picks them up again when it's back.
3. It saves a copy of the database to `/opt/convoy/backups`.
4. It starts the new release, which applies database changes, and waits for it to report healthy before starting the
   worker and scheduler again.

If something fails before the new release starts, such as the database backup, your running panel isn't touched, and the
worker and scheduler start again. If the new release isn't healthy within five minutes, the update stops and points you
at `convoy logs web`. The worker and scheduler stay stopped, so no jobs run against a half-updated panel, until you've
fixed it and run `convoy up`.

If you've edited `/opt/convoy/compose.yml`, the update leaves it as it is and saves the new release's next to it as
`compose.yml.new`, so you can compare them and bring over what you need.

### Updating from 5.0.0-alpha.1

The `convoy` command that came with 5.0.0-alpha.1 can't update itself, and it restarts everything at once. Replace it
once with the one from 5.0.0-alpha.2, point the install at that release, and update:

```bash
curl -fsSL https://github.com/ConvoyPanel/panel/releases/download/v5.0.0-alpha.2/convoy -o /usr/local/bin/convoy
chmod 755 /usr/local/bin/convoy
sed -i 's/^CONVOY_VERSION=.*/CONVOY_VERSION=5.0.0-alpha.2/' /opt/convoy/.env
convoy upgrade
```

From then on, `convoy upgrade` keeps the command up to date itself.

## Choosing What You Update To

`convoy upgrade` updates to whatever `CONVOY_VERSION` in `/opt/convoy/.env` names:

| `CONVOY_VERSION` | Updates to                                               |
|------------------|----------------------------------------------------------|
| `5.0.0-alpha.1`  | Exactly that release, so `convoy upgrade` changes nothing. |
| `5.1`            | The newest 5.1.x release, once 5.1 is out.               |
| `5`              | The newest 5.x release, once 5.0 is out.                 |

None of them move a panel to Convoy 6 on its own.

During the alpha, every install names an exact release. To move to a newer alpha, edit `CONVOY_VERSION`, for example
to `5.0.0-alpha.2`, then run `convoy upgrade`.

## Getting Ready for Convoy 6

Convoy 6 will upgrade from Convoy 5, but it doesn't keep everything. **Admin → Settings → Upgrade** lists what it will
do with this panel's data, such as templates and ISOs it drops, nodes that need a new terminal setup, and backups it
deletes. It only reads, so it's safe to open at any time. The same list is available from the command line:

```bash
convoy artisan convoy:upgrade-check
```

Convoy 6 doesn't keep the activity log. To keep a copy, export it before you upgrade:

```bash
convoy export-activity > activity.csv
```
