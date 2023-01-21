# Servers API

## Fetching servers

**GET** `/api/application/servers`

Available Request Parameters

-   page
-   per_page
    -   max is 100
-   filter[name]
-   filter[node_id]
-   filter[user_id]

```json
{
    "data": [
        {
            "id": "ffa92c56",
            "uuid": "ffa92c56-42e3-4dd4-9999-698008d8c8c9",
            "node_id": 4418,
            "hostname": "langosh.info",
            "name": "culpa",
            "description": null,
            "status": null,
            "usages": { "bandwidth": 0 },
            "limits": {
                "cpu": 2,
                "memory": 2147483648,
                "disk": 21474836480,
                "snapshots": 16,
                "backups": 16,
                "bandwidth": 107374182400,
                "addresses": { "ipv4": [], "ipv6": [] },
                "mac_address": null
            },
            "user_id": 10,
            "vmid": 1631,
            "internal_id": 30
        },
        {
            "id": "01b8d6e4",
            "uuid": "01b8d6e4-0dd2-4050-a134-aead28cea52e",
            "node_id": 4419,
            "hostname": "rolfson.com",
            "name": "tempora",
            "description": null,
            "status": null,
            "usages": { "bandwidth": 0 },
            "limits": {
                "cpu": 2,
                "memory": 2147483648,
                "disk": 21474836480,
                "snapshots": 16,
                "backups": 16,
                "bandwidth": 107374182400,
                "addresses": { "ipv4": [], "ipv6": [] },
                "mac_address": null
            },
            "user_id": 11,
            "vmid": 702,
            "internal_id": 32
        }
    ],
    "meta": {
        "pagination": {
            "total": 302,
            "count": 50,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 7,
            "links": {
                "next": "https://us-east.performave.com/api/admin/servers?page=2"
            }
        }
    }
}
```

## Fetching a server

**GET** `/api/application/servers/<uuid>`

```json
{
    "data": {
        "id": "ffa92c56",
        "uuid": "ffa92c56-42e3-4dd4-9999-698008d8c8c9",
        "node_id": 4418,
        "hostname": "langosh.info",
        "name": "culpa",
        "description": null,
        "status": null,
        "usages": { "bandwidth": 0 },
        "limits": {
            "cpu": 2,
            "memory": 2147483648,
            "disk": 21474836480,
            "snapshots": 16,
            "backups": 16,
            "bandwidth": 107374182400,
            "addresses": { "ipv4": [], "ipv6": [] },
            "mac_address": null
        },
        "user_id": 10,
        "vmid": 1631,
        "internal_id": 30
    }
}
```

## Updating a server's general information

**PATCH** `/api/application/servers/<uuid>`

Payload

```json
{
    "node_id": 4417,
    "user_id": 1,
    "status": null,
    "name": "ubunt",
    "hostname": "ubuntu.org",
    "vmid": 127080199
}
```

Response

```json
{
    "data": {
        "id": "72ddf699",
        "uuid": "72ddf699-1468-43e2-bd14-65d0d51c9299",
        "node_id": 4417,
        "hostname": "ubuntu.org",
        "name": "ubunt",
        "description": null,
        "status": null,
        "usages": {
            "bandwidth": 0
        },
        "limits": {
            "cpu": 3,
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
        "user_id": 1,
        "vmid": 127080199,
        "internal_id": 352,
        "user": {
            "data": {
                "id": 1,
                "name": "Mike Hawk",
                "email": "t@t.com",
                "email_verified_at": null,
                "root_admin": true,
                "servers_count": 0
            }
        },
        "node": {
            "data": {
                "id": 4417,
                "location_id": 5340,
                "name": "us-southeast",
                "cluster": "us-southeast",
                "fqdn": "us-southeast.performave.com",
                "port": 8006,
                "memory": 68719476736,
                "memory_overallocate": 0,
                "memory_allocated": 6442450944,
                "disk": 137438953472,
                "disk_overallocate": 0,
                "disk_allocated": 6442450944,
                "vm_storage": "local",
                "backup_storage": "local",
                "iso_storage": "local",
                "network": "vmbr0",
                "servers_count": 0
            }
        }
    }
}
```

## Updating a server's build

**PATCH** `/api/application/servers/<uuid>/settings/build`

Payload

```json
{
    "address_ids": [6, 7],
    "snapshot_limit": 0,
    "backup_limit": null,
    "bandwidth_limit": null,
    "bandwidth_usage": 0,
    "cpu": 3,
    "memory": 4294967296,
    "disk": 4294967296
}
```

Returns

```json
{
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
            "cpu": 3,
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
        "user_id": 1,
        "vmid": 127080199,
        "internal_id": 352,
        "user": {
            "data": {
                "id": 1,
                "name": "Mike Hawk",
                "email": "t@t.com",
                "email_verified_at": null,
                "root_admin": true,
                "servers_count": 0
            }
        },
        "node": {
            "data": {
                "id": 4417,
                "location_id": 5340,
                "name": "us-southeast",
                "cluster": "us-southeast",
                "fqdn": "us-southeast.performave.com",
                "port": 8006,
                "memory": 68719476736,
                "memory_overallocate": 0,
                "memory_allocated": 6442450944,
                "disk": 137438953472,
                "disk_overallocate": 0,
                "disk_allocated": 6442450944,
                "vm_storage": "local",
                "backup_storage": "local",
                "iso_storage": "local",
                "network": "vmbr0",
                "servers_count": 0
            }
        }
    }
}
```

## Creating a server

**POST** `/api/application/servers`

Payload

```json
{
    "node_id": 4417,
    "user_id": 1,
    "name": "testee",
    "hostname": "advinservers.com",
    "vmid": null,
    "limits": {
        "cpu": 3,
        "memory": 4294967296,
        "disk": 3145728000,
        "snapshots": 0,
        "backups": null,
        "bandwidth": null,
        "address_ids": []
    },
    "account_password": "q%#tUyLPAm@2q",
    "should_create_server": true,
    "template_uuid": "d176b498-87e8-421f-a958-048ef15ef199",
    "start_on_completion": false
}
```

Returns

```json
{
    "data": {
        "id": "d45309ad",
        "uuid": "d45309ad-9c9e-4ea7-b386-01a2e54a421e",
        "node_id": 4417,
        "hostname": "advinservers.com",
        "name": "testee",
        "description": null,
        "status": "installing",
        "usages": {
            "bandwidth": 0
        },
        "limits": {
            "cpu": 3,
            "memory": 4294967296,
            "disk": 3145728000,
            "snapshots": 0,
            "backups": null,
            "bandwidth": null,
            "addresses": {
                "ipv4": [],
                "ipv6": []
            },
            "mac_address": null
        },
        "user_id": 1,
        "vmid": 549998493,
        "internal_id": 355,
        "user": {
            "data": {
                "id": 1,
                "name": "Mike Hawk",
                "email": "t@t.com",
                "email_verified_at": null,
                "root_admin": true,
                "servers_count": 0
            }
        },
        "node": {
            "data": {
                "id": 4417,
                "location_id": 5340,
                "name": "us-southeast",
                "cluster": "us-southeast",
                "fqdn": "us-southeast.performave.com",
                "port": 8006,
                "memory": 68719476736,
                "memory_overallocate": 0,
                "memory_allocated": 10737418240,
                "disk": 137438953472,
                "disk_overallocate": 0,
                "disk_allocated": 9588178944,
                "vm_storage": "local",
                "backup_storage": "local",
                "iso_storage": "local",
                "network": "vmbr0",
                "servers_count": 0
            }
        }
    }
}
```

## Deleting a server

**DELETE** `/api/application/servers/<uuid>`

Available Parameters
- no_purge
  - set this to true to retain the VM and its associated files on the Proxmox node while deleting it off of Convoy


Returns no content

## Suspending a server

**POST** `/api/application/servers/<uuid>/suspend`

No parameters/body is needed and no content is returned if successful

## Unsuspending a server

**POST** `/api/application/servers/<uuid>/unsuspend`

No parameters/body is needed and no content is returned if successful
