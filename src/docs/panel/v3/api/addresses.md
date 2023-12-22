# Addresses API

## Fetching a Node's Addresses

**GET** `/api/application/nodes/<nodeid>/addresses`

Available Request Parameters

-   page
-   per_page
    - max is 100
-   filter[address]
-   filter[type] = ipv4 | ipv6
-   filter[server_id]
    -   This field is nullable and will return unallocated addresses if you leave it as `?filter[server_id]=` in your request

```json
{
    "data": [
        {
            "id": 6,
            "server_id": 352,
            "type": "ipv4",
            "address": "1.1.1.2",
            "cidr": 24,
            "gateway": "127.0.0.1",
            "mac_address": null
        },
        {
            "id": 7,
            "server_id": 352,
            "type": "ipv4",
            "address": "192.168.1.2",
            "cidr": 24,
            "gateway": "192.168.1.1",
            "mac_address": null
        }
    ],
    "meta": {
        "pagination": {
            "total": 2,
            "count": 2,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```

## Updating an Address

**PUT** `/api/application/nodes/<nodeid>/addresses/<addressid>`

Payload

```json
{
    "server_id": 352,
    "address": "1.1.1.2",
    "cidr": 24,
    "gateway": "127.0.0.1",
    "mac_address": "",
    "type": "ipv4"
}
```

Returns

```json
{
    "data": {
        "id": 6,
        "server_id": 352,
        "type": "ipv4",
        "address": "1.1.1.2",
        "cidr": 24,
        "gateway": "127.0.0.1",
        "mac_address": null,
        "server": {
            "data": {
                "id": "72ddf699",
                "uuid": "72ddf699-1468-43e2-bd14-65d0d51c9299",
                "node_id": 4417,
                "hostname": "ubuntu.org",
                "name": "ubuntu",
                "description": null,
                "status": null,
                "usages": {
                    "bandwidth": 0
                },
                "limits": {
                    "cpu": 2,
                    "memory": 4294967296,
                    "disk": 4294967296,
                    "snapshots": 0,
                    "backups": null,
                    "bandwidth": null,
                    "addresses": {
                        "ipv4": [
                            {
                                "id": 6,
                                "server_id": 352,
                                "type": "ipv4",
                                "address": "1.1.1.2",
                                "cidr": 24,
                                "gateway": "127.0.0.1",
                                "mac_address": null
                            },
                            {
                                "id": 7,
                                "server_id": 352,
                                "type": "ipv4",
                                "address": "192.168.1.2",
                                "cidr": 24,
                                "gateway": "192.168.1.1",
                                "mac_address": null
                            }
                        ],
                        "ipv6": []
                    },
                    "mac_address": null
                },
                "internal_id": 352
            }
        }
    }
}
```

## Creating an address

**POST** `/api/application/nodes/<nodeid>/addresses`

Payload

```json
{
    "server_id": 354,
    "address": "127.0.0.1",
    "cidr": 24,
    "gateway": "1.2.2.3",
    "mac_address": "",
    "type": "ipv4"
}
```

Returns

```json
{
    "data": {
        "id": 8,
        "server_id": 354,
        "type": "ipv4",
        "address": "127.0.0.1",
        "cidr": 24,
        "gateway": "1.2.2.3",
        "mac_address": null,
        "server": {
            "data": {
                "id": "45e1aa5c",
                "uuid": "45e1aa5c-36ba-4306-9404-66341ba2b6fe",
                "node_id": 4417,
                "hostname": "ubuntu2.org",
                "name": "ubuntu 2.0",
                "description": null,
                "status": "installing",
                "usages": { "bandwidth": 0 },
                "limits": {
                    "cpu": 2,
                    "memory": 2147483648,
                    "disk": 2147483648,
                    "snapshots": 0,
                    "backups": null,
                    "bandwidth": null,
                    "addresses": {
                        "ipv4": [
                            {
                                "id": 8,
                                "server_id": 354,
                                "type": "ipv4",
                                "address": "127.0.0.1",
                                "cidr": 24,
                                "gateway": "1.2.2.3",
                                "mac_address": null
                            }
                        ],
                        "ipv6": []
                    },
                    "mac_address": null
                },
                "internal_id": 354
            }
        }
    }
}
```

## Deleting an Address

**DELETE** `/api/application/nodes/<nodeid>/addresses/<address id>`

Returns no content
