# Servers API

## Fetching servers

**GET** `/api/application/servers?page=<page number>`

```json
{
    "data": [
        {
            "id": 1,
            "vmid": 1489,
            "installing": 0,
            "name": "Eric's personal server",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 2,
            "vmid": 3009,
            "installing": 0,
            "name": "Advinservers client area",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 3,
            "vmid": 4716,
            "installing": 0,
            "name": "Gabriel C.'s server",
            "user_id": 1,
            "node_id": 1
        }
        ...
    ],
    "meta": {
        "pagination": {
            "total": 70,
            "count": 50,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 2,
            "links": {
                "next": "http://tw-west.performave.com/api/application/servers?page=2"
            }
        }
    }
}
```

## Fetching a server

**GET** `/api/application/servers/<server id>`

```json
{
    "data": {
        "id": 1,
        "vmid": 1489,
        "installing": 0,
        "name": "Zaria",
        "user_id": 1,
        "node_id": 1
    }
}
```

## Updating a server

**PUT** `/api/application/servers/<server id>`

Fields
```php
'name' => 'min:1|max:40',
'node_id' => 'exists:nodes,id|required',
'user_id' => 'exists:users,id|required',
'vmid' => 'numeric|required',
```

Returns
```json
{
    "data": {
        "id": 1,
        "vmid": 1489,
        "installing": 0,
        "name": "Zaria",
        "user_id": 1,
        "node_id": 1
    }
}
```

## Creating a server

**POST** `/api/application/servers`

```php
'type' => 'in:new,existing|required',
'name' => 'min:1|max:40',
'node_id' => 'exists:nodes,id|required',
'user_id' => 'exists:users,id|required',
'vmid' => 'numeric|required_if:type,existing',
'template_id' => 'exists:templates,id|required_if:type,new',
'is_template' => 'boolean|required_if:type,existing',
'is_visible' => 'boolean|required_with:is_template',
'addresses' => 'array|max:2',
'addresses.*' => 'exists:ip_addresses,id'
```

Returns
```json
{
    "data": {
        "id": 1,
        "vmid": 1489,
        "installing": 0,
        "name": "Zaria",
        "user_id": 1,
        "node_id": 1
    }
}
```

## Deleting a server
::: danger
This method by default only deletes the server from the database and NOT FROM THE NODE. Make sure to set `purge` to `true` to fully clear any data associated with the server.
:::

Fields
```php
'purge' => 'boolean|nullable' // Set this to 'true' to also delete the server from the Proxmox node
```

Returns no content

## Fetching an individual server's specifications
::: danger
This endpoint can return an internal server error if the Proxmox node isn't available.
:::

**GET** `/api/application/servers/<server id>/specifications`

```json
{
    "data": {
        "node": "proxmox",
        "cores": 1,
        "memory": 3179282432,
        "disk": null,
        "disks": [
            {
                "disk": "ide0",
                "size": "2G",
                "pending": false
            },
            {
                "disk": "ide1",
                "size": "3G",
                "pending": false
            },
            {
                "disk": "sata0",
                "size": "5324M",
                "pending": false
            },
            {
                "disk": "scsi0",
                "size": "11468M",
                "pending": false
            }
        ],
        "ipconfig": {
            "key": "ipconfig0",
            "value": " "
        }
    }
}
```

## Updating a server's specifications

::: danger
If you are making automation software, DO NOT immediately update the server specifications right after creating the server. The server is locked initially while it's cloning a template.

To make sure your specifications gets processed by Proxmox, keep polling `/api/application/servers/<server id>/specifications` until Convoy returns non-null specifications. Then, you can send a request to edit the specifications.
:::

**PATCH** `/api/application/servers/<server id>/specifications`

Fields
```php
'cores' => 'numeric',
'memory' => 'numeric',
'disks' => 'array',
'disks.*.disk' => 'string|required',
'disks.*.size' => 'string|required',
'ipconfig' => 'string',
'lockIps' => 'array',
'lockIps.*' => 'ip|required', // these are the actual ips you want to lock
```

Returns
```json
{
    "data": {
        "node": "proxmox",
        "cores": 1,
        "memory": 3179282432,
        "disk": null,
        "disks": [
            {
                "disk": "ide0",
                "size": "2G",
                "pending": false
            },
            {
                "disk": "ide1",
                "size": "3G",
                "pending": false
            },
            {
                "disk": "sata0",
                "size": "5324M",
                "pending": false
            },
            {
                "disk": "scsi0",
                "size": "11468M",
                "pending": false
            }
        ],
        "ipconfig": {
            "key": "ipconfig0",
            "value": " "
        }
    }
}
```