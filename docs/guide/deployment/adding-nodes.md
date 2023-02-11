# Adding Nodes

Adding a node in Convoy is simple, follow the steps below to make sure you have the best results.

### Generating a Proxmox API Token

Convoy utilizes Proxmox APIs and API tokens to manage servers. First, navigate to your node's Proxmox panel and to its list of API tokens.

![Visual guide to find page with API tokens](https://imgur.com/2fWHEBZ.png)

Next, add a new token and ensure the user you generate the token on has **root** privileges. Convoy utilizes a lot of permissions with more used in the future because of new features, so it's best that you grant it all privileges. **Don't forget to disable privilege separation too!**

![Visual guide for creating an API token](https://imgur.com/NMG8VZY.png)

### Adding the Node to Convoy

With your API token, navigate to Convoy's nodes page in the administration area and add a new node. Paste the API token contents into its corresponding fields in the node creation page.

### Ensuring a Working Connection

If you are using Convoy in production, that is you have set `APP_ENV` to `production` in your environment file, you will need to have a proper SSL/TLS certificate on the Proxmox node. Convoy strictly enforces SSL certificates for security. The certificate will need to be issued from a trusted certificate authority like Let's Encrypt, Cloudflare, Google, etc. You can use [this guide](https://www.smarthomebeginner.com/proxmox-ssl-certificate-with-letsencrypt/) to generate a certificate for your node. However, if you don't or can't use a trusted certificate authority, use a self-signed certificate on your Proxmox node and add the certificate to the virtual machine or node that is running Convoy. For example, [here is a guide](https://ubuntu.com/server/docs/security-trust-store) for installing a root CA certificate for Ubuntu server.

If you have Convoy in development mode, that is you have set `APP_ENV` to `local`, then Convoy will not check certificates. However, leaving Convoy in development mode is a huge security vulnerability as Convoy may leak sensitive credentials and provide access to internal systems like the Laravel Horizon queue workers.