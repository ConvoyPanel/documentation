# Servers API

## Fetching servers

**GET** `/api/application/servers?page=<page number>&filter[uuid]=<server uuid>&filter[uuidShort]=<server short uuid>&filter[user_id]=<user id>&filter[node_id]=<node_id>&filter[vmid]=<vmid>`

```json
{
    "data": [
        {
            "id": 1,
            "vmid": 1489,
            "status": "installing",
            "name": "Eric's personal server",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 2,
            "vmid": 3009,
            "status": "installing",
            "name": "Advinservers client area",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 3,
            "vmid": 4716,
            "status": "installing",
            "name": "TeYroX's server",
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
        "status": "installing",
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
        "status": "installing",
        "name": "Zaria",
        "user_id": 1,
        "node_id": 1
    }
}
```

## Creating a server

**POST** `/api/application/servers`

Example payload
```json
{
  "type": "new", // "new" is for making a new server. "existing" just adds a server to the db without creating a vm
  "name": "I use arch btw",
  "user_id": 1,
  "node_id": 9,
  "template_id": 5, // this MUST be a valid template that exists AND is under the corresponding "node_id".
  "limits": {
    "cpu": 2,
    "memory": 1006777216, // bytes
    "disk": 1006777216, // bytes
    "bandwidth_limit": 1006777216, // bytes
    "snapshot_limit": 30,
    "backup_limit": 30,
    "addresses": [4,2,0,6,9] // these are the IDs of IP addresses
  },
  "config": { // config is used only when the "type" is set to "existing"
    "template": 1, // (boolean) should this server be marked as a template?
    "visible": 1, // (boolean) should this server
  }
}
```

Returns
```json
{
    "data": {
        "id": 1,
        "vmid": 1489,
        "status": "installing",
        "name": "Zaria",
        "user_id": 1,
        "node_id": 1
    }
}
```

## Deleting a server

Fields
```php
'no_purge' => 'boolean|nullable' // Set this to 'true' to keep the virtual machine data
```

Returns no content

## Fetching an individual server's details
::: danger
This endpoint can return an internal server error if the Proxmox node isn't available.
:::

**GET** `/api/application/servers/<server id>/details`

```json
{
  "node_id": 1,
  "vmid": 1000,
  "status": "stopped",
  "locked": false,
  "usage": {
    "uptime": 0,
    "network": {
      "in": 0, // bytes
      "out": 0, // bytes
      "monthly_total": 0 // bytes
    },
    "disk": {
      "write": 0, // bytes
      "read": 0 // bytes
    }
  },
  "limits": {
    "cpu": 1,
    "memory": 1073741824, // bytes
    "address_ids": null, // Deprecated
    "disk": 1073741824, // bytes
    "snapshot_limit": 0,
    "backup_limit": 0,
    "bandwidth_limit": 1073741824, // bytes
    "addresses": {
      "ipv4": [

      ],
      "ipv6": [

      ]
    },
    "mac_address": null
  },
  "config": {
    "mac_address": "7A:04:A8:F7:46:13",
    "boot_order": [
      "sata0"
    ],
    "disks": [
      {
        "disk": "sata0",
        "size": 2361393152 // bytes
      }
    ],
    "template": true, // Deprecated
    "addresses": {
      "ipv4": null,
      "ipv6": null
    },
    "visible": null // Deprecated
  }
}
```

## Updating a server's specifications

**PATCH** `/api/application/servers/<server id>/details`

Example payload
```json
{
  "limits": {
    "cpu": 2,
    "memory": 1006777216, // bytes
    "disk": 1006777216, // bytes
    "bandwidth_limit": 1006777216, // bytes
    "snapshot_limit": 30,
    "backup_limit": 30,
    "addresses": [4,2,0,6,9] // these are the IDs of IP addresses
  }
}
```

Returns
```json
{
  "node_id": 1,
  "vmid": 1000,
  "status": "stopped",
  "locked": false,
  "usage": {
    "uptime": 0,
    "network": {
      "in": 0, // bytes
      "out": 0, // bytes
      "monthly_total": 0 // bytes
    },
    "disk": {
      "write": 0, // bytes
      "read": 0 // bytes
    }
  },
  "limits": {
    "cpu": 1,
    "memory": 1073741824, // bytes
    "address_ids": null, // Deprecated
    "disk": 1073741824, // bytes
    "snapshot_limit": 0,
    "backup_limit": 0,
    "bandwidth_limit": 1073741824, // bytes
    "addresses": {
      "ipv4": [

      ],
      "ipv6": [

      ]
    },
    "mac_address": null
  },
  "config": {
    "mac_address": "7A:04:A8:F7:46:13",
    "boot_order": [
      "sata0"
    ],
    "disks": [
      {
        "disk": "sata0",
        "size": 2361393152 // bytes
      }
    ],
    "template": true, // Deprecated
    "addresses": {
      "ipv4": null,
      "ipv6": null
    },
    "visible": null // Deprecated
  }
}
```

## Suspending a server

**POST** `/api/application/servers/<server id>/suspend`

No parameters/body is needed and no content is returned if successful

## Unsuspending a server

**POST** `/api/application/servers/<server id>/unsuspend`

No parameters/body is needed and no content is returned if successful