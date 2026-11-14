# Installing Templates

Convoy builds every server by cloning a template on its node, so a node needs templates before anyone can deploy to it.
[Coport](https://github.com/ConvoyPanel/cofoundry/blob/main/docs/coport.md) installs ready-made templates for Ubuntu,
Debian, AlmaLinux, Rocky Linux, and Windows Server, so you don't have to build them by hand. It needs Proxmox VE 9.

## Installing Coport

Run these as root on your Proxmox node, over SSH or in its web shell:

```bash
wget -O /usr/local/bin/coport https://github.com/ConvoyPanel/cofoundry/releases/latest/download/coport-linux-x64
chmod +x /usr/local/bin/coport
```

## Downloading Templates to Your Node

```bash
coport
```

Coport asks three things:

1. **Templates.** Space selects one, and `a` selects them all.
2. **VMIDs.** Keep the suggested IDs, or change any of them.
3. **Storage.** Only storages that can hold VM disks are listed.

It then downloads and installs the templates, and prints each one's VMID. `coport --list` shows them again later.

To install every template without the prompts, name the storage:

```bash
coport --all --storage local-lvm
```

## Offering Templates to Your Users

Templates are added per node. Once you've [added the node](/docs/panel/v4/adding-a-node), open **Nodes** in the admin
area, pick the node, and open **Templates**.

1. Create a **template group** for each operating system, such as `Ubuntu`. Users choose from these groups when they
   install or reinstall a server.
2. Add each template to its group, with a **Display Name** your users will recognize, such as `Ubuntu 24.04`, and the
   **VMID** Coport printed.

The Windows Server templates are evaluation editions, so activate servers built from them with your own licenses.

## Keeping Templates Up to Date

When new builds are published, install them with:

```bash
coport --upgrade
```

Each template is replaced at the same VMID, so Convoy needs no changes, and servers you've already deployed aren't
affected. `coport --help` lists every option, and the
[Coport reference](https://github.com/ConvoyPanel/cofoundry/blob/main/docs/coport.md) explains them.
