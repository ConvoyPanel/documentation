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
$rules = [
    'type' => 'in:new,existing|required',
    'name' => 'min:1|max:40',
    'node_id' => 'exists:nodes,id|required',
    'user_id' => 'exists:users,id|required',
];

if ($this->request->get('type') === 'new')
{
    $rules['template_id'] = 'exists:templates,id|required';
    $rules['vmid'] = 'sometimes|numeric|min:100|max:999999999|required';
    $rules['limits'] = 'array|required';
    $rules['limits.cpu'] = 'numeric|min:1|required';
    $rules['limits.memory'] = 'numeric|min:16777216|required';
    $rules['limits.disk'] = 'numeric|min:1|required';
    $rules['limits.address_ids'] = 'numeric|exists:ip_addresses,id|required';
}

if ($this->request->get('type') === 'existing')
{
    $rules['configuration.template'] = 'sometimes|boolean';
    $rules['configuration.visible'] = 'sometimes|boolean';
    $rules['vmid'] = 'numeric|min:100|max:999999999|required';
}
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

Fields
```php
'no_purge' => 'boolean|nullable' // Set this to 'true' to keep the virtual machine data
```

Returns no content

## Fetching an individual server's specifications
::: danger
This endpoint can return an internal server error if the Proxmox node isn't available.
:::

**GET** `/api/application/servers/<server id>/details`

```json
{
    "vmid": 100,
    "status": "running",
    "locked": false,
    "usage": {
        "uptime": 251704,
        "network": {
            "in": 0,
            "out": 0
        },
        "disk": {
            "write": 443992576,
            "read": 388644124
        }
    },
    "limits": {
        "cpu": 2,
        "memory": 3196059648,
        "disk": 4508876800,
        "addresses": {
            "ipv4": {
                "address": "1.2.3.6",
                "cidr": "22",
                "gateway": "192.168.1.1",
                "mac_address": "62:B3:98:6F:E2:90"
            },
            "ipv6": {
                "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
                "cidr": "64",
                "gateway": "fe80::1"
            }
        }
    },
    "configuration": {
        "boot_order": [
            "sata0"
        ],
        "disks": [
            {
                "disk": "sata0",
                "size": 4508876800,
                "pending": false
            },
            {
                "disk": "ide2",
                "size": 4194304,
                "pending": false
            }
        ],
        "template": 0,
        "addresses": {
            "ipv4": {
                "address": "1.2.3.6",
                "cidr": "22",
                "mac_address": "62:B3:98:6F:E2:90",
                "gateway": "192.168.1.1"
            },
            "ipv6": {
                "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
                "cidr": "64",
                "gateway": "fe80::1"
            }
        }
    },
    "node_id": 1
}
```

## Updating a server's specifications

**PATCH** `/api/application/servers/<server id>/details`

Fields
```php
'limits' => 'sometimes|array|required',
'limits.cpu' => 'sometimes|numeric|min:1|required',
'limits.memory' => 'sometimes|numeric|min:16777216|required',
'limits.disk' => 'sometimes|numeric|min:1|required',
'limits.address_ids' => 'sometimes|numeric|exists:ip_addresses,id|required'
```

Returns
```json
{
    "vmid": 100,
    "status": "running",
    "locked": false,
    "usage": {
        "uptime": 251704,
        "network": {
            "in": 0,
            "out": 0
        },
        "disk": {
            "write": 443992576,
            "read": 388644124
        }
    },
    "limits": {
        "cpu": 2,
        "memory": 3196059648,
        "disk": 4508876800,
        "addresses": {
            "ipv4": {
                "address": "1.2.3.6",
                "cidr": "22",
                "gateway": "192.168.1.1",
                "mac_address": "62:B3:98:6F:E2:90"
            },
            "ipv6": {
                "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
                "cidr": "64",
                "gateway": "fe80::1"
            }
        }
    },
    "configuration": {
        "boot_order": [
            "sata0"
        ],
        "disks": [
            {
                "disk": "sata0",
                "size": 4508876800,
                "pending": false
            },
            {
                "disk": "ide2",
                "size": 4194304,
                "pending": false
            }
        ],
        "template": 0,
        "addresses": {
            "ipv4": {
                "address": "1.2.3.6",
                "cidr": "22",
                "mac_address": "62:B3:98:6F:E2:90",
                "gateway": "192.168.1.1"
            },
            "ipv6": {
                "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
                "cidr": "64",
                "gateway": "fe80::1"
            }
        }
    },
    "node_id": 1
}
```