# Adding a Node

## Convoy Node Location Prerequisite

In order to add a node within Convoy, it is required first to create an entry within the Locations section. This is just a base organizer entry that allows nodes to be organized by physical location. A “Short Code” and “Description” entry are all that are required. This entry is simply a syntax requirement when creating a node.

## Connection Requirements

- Valid TLS certificate on your Proxmox node
  - Convoy verifies TLS certificates with a trusted certificate authority in production mode&#8212;that is `APP_ENV=production` in your environment file.
  - If you don't have a trusted certificate, you can generate one with Let's Encrypt in [this guide](https://www.smarthomebeginner.com/proxmox-ssl-certificate-with-letsencrypt/).
  - Alternatively, you can trust your Proxmox self-signed certificate in your system's keychain.

## Generating a Proxmox API Token

Navigate to the Proxmox node that you want to add and create a new token.

![Arrow directions to locating where to add tokens in Proxmox's interface](/assets/images/directions-to-adding-tokens-in-proxmox.png)

Next, click on `Add` and generate a new token under a user that **has root privileges** and verify that **privilege separation** is **disabled**.

![Screenshot of adding a new token dialog](/assets/images/create-proxmox-token-dialog-directions.png)

## Adding the Node in Convoy

With your API token, navigate to Convoy's nodes page in the administration area and add a new node. Paste the API token contents into its corresponding fields in the node creation page.
