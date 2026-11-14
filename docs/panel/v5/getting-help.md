# Getting Help

When something goes wrong, the answer is almost always in the panel's logs. This page shows where to look first, and how
to send the logs to the Convoy team when you can't find it yourself.

## Checking the Usual Suspects

Start with the state of the containers:

```bash
convoy ps
```

All five should be running, and `web`, `worker`, `postgres`, and `redis` should say `healthy`. Then look at whichever
part isn't working:

| Symptom                                               | Look at                                    |
|-------------------------------------------------------|--------------------------------------------|
| The panel won't load, or shows an error page          | `convoy logs web`                          |
| Actions on servers never finish                       | `convoy horizon`, then `convoy logs worker` |
| Usage graphs or scheduled tasks stop updating         | `convoy logs scheduler`                    |
| Certificate warnings, or HTTPS doesn't work           | `convoy logs web`, which includes the certificate requests |

## Sending Logs to the Convoy Team

If the logs don't make sense, send them to us with one command:

```bash
convoy support
```

It collects:

- each container's status and its logs from the last 48 hours,
- the log of an [upgrade from v4](/docs/panel/v5/upgrading-from-v4), if you ran one,
- details about the host: operating system, CPU, memory, free disk, and Docker's version,
- the panel's own checks: its configuration summary, the queue worker's status, pending database changes, and the
  error messages of the last 20 failed jobs,
- your settings from `/opt/convoy/.env`, with every password, key, and token replaced by "set".

Before anything leaves the host, it removes every password, key, and token from the logs: the values in your `.env`,
Proxmox API tokens, sign-in cookies, and credentials in URLs. Then it saves everything to a file in
`/opt/convoy/backups/support`, shows you what it collected, and asks who may open it:

```
Who can open these logs?
  staff     the Convoy team only (default)
  password  anyone with the link and a password you choose
  public    anyone with the link
```

Press Enter to keep it to the Convoy team. Choose `password` or `public` when you want to share the logs with someone
else, for example in a GitHub issue. In that case, keep in mind what secret-removal leaves in: your panel's address,
the IP addresses of people who used it, your nodes' addresses, and occasionally a customer's email address.

It asks once more before uploading, then prints two links:

- **The link to share**, such as `https://convoypanel.com/support/CVY-7K3M-Q2XP`. Paste it in
  [Discord](https://discord.convoypanel.com) or your GitHub issue.
- **A private manage link.** Keep it to yourself: it lets whoever has it change who can open the logs, or delete them.

Uploads are deleted after 30 days.

### Changing Who Can Open the Logs

From the same host, using the code from the link:

```bash
convoy support visibility CVY-7K3M-Q2XP staff
```

To delete the upload straight away:

```bash
convoy support delete CVY-7K3M-Q2XP
```

The manage link does the same from a browser, on any machine.

### Reading the Logs Before They Leave

To look first, collect without uploading:

```bash
convoy support --no-upload
```

It stops after saving the file and prints its path. Run `convoy support` again when you're ready to send it.

To cover a longer stretch than 48 hours, for example a problem that started last week, pass `--since`:

```bash
convoy support --since 7d
```

### If an Upgrade from v4 Failed

Run `convoy support` all the same. The installer set up `/opt/convoy` and the `convoy` command before the import
started, and the upload includes the import's log, which shows exactly which step failed. v4 itself isn't affected:
[Going Back to v4](/docs/panel/v5/upgrading-from-v4#going-back-to-v4) shows how to bring it back.
