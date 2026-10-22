# Adding a Node

## Connection Requirements

- Valid TLS certificate on your Proxmox node
  - If you don't have a trusted certificate, you can generate one with Let's Encrypt in [this guide](https://www.smarthomebeginner.com/proxmox-ssl-certificate-with-letsencrypt/).
  - We heavily discourage against disabling TLS verification because enables man-in-the-middle attacks.

## Generating a Proxmox API Token

Navigate to the Proxmox node that you want to add and create a new token.

![Arrow directions to locating where to add tokens in Proxmox's interface](/assets/images/directions-to-adding-tokens-in-proxmox.png)

Next, click on `Add` and generate a new token under a user that **has root privileges** and verify that **privilege separation** is **disabled**.

![Screenshot of adding a new token dialog](/assets/images/create-proxmox-token-dialog-directions.png)

## Adding Location

Before adding a new Node, you must create a location for your node. On the Admin Control Panel, click on the Locations tab and click `Create Location`. Fill in the `Short Code` and `Description`. After that, click `Create` to submit.

![Screenshot of adding a new location](/assets/images/add-location-modal.png)


## Adding the Node in Convoy

With your API token, navigate to Convoy's nodes page in the administration area and add a new node. Click the `Create Node` button and fill in the information required.
- `Display Name` : Type any name for identifying your node 
- `Location Group` : Choose the location you already created before
- `Node Name In Proxmox`: Type the same name as your node name in Proxmox
- `Verify TLS Certificates`: Check this if you have a valid TLS certificate on your Proxmox node
- `Token ID`: Paste from your Proxmox user page
- `Secret`: Paste from your Proxmox user page
- `FQDN`: Type your Proxmox IP or FQDN without http/https
- `Port`: Type the port to access Proxmox. Default `8006` if you access with IP
- `Memory Allocation`: Type how much memory is allocated for managed by Convoy in MiB
- `Memory Overallocation`: Type how much memory can be overallocated in percentage (%)
- `Disk Allocation`: Type how much disk is allocated for managed by Convoy in MiB
- `Disk Overallocation`: Type how much disk can be overallocated in MiB
- `VM Storage`: Type name of storage to save disk image
- `Backup Storage`: Type name of storage to save backup
- `ISO Storage`: Type name of storage to save ISO file
- `Network`: Type your network bridge name

![Screenshot of adding a new node](/assets/images/add-node-modal.png)
