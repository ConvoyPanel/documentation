# Nodes API

## Fetching Nodes

**GET** `/api/application/nodes`

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `100`. |
| `filter[name]` | string | Nodes whose name contains this text, ignoring case. |
| `filter[fqdn]` | string | Nodes whose FQDN contains this text, ignoring case. |
| `filter[location_id]` | integer | Nodes in the location with this ID. |

```json
{
  "data": [
    {
      "id": 4417,
      "location_id": 5340,
      "name": "us-southeast",
      "cluster": "us-southeast",
      "verify_tls": true,
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
      "servers_count": 2
    },
    {
      "id": 4418,
      "location_id": 5341,
      "name": "quae",
      "verify_tls": true,
      "cluster": "proxmox",
      "fqdn": "error",
      "port": 8006,
      "memory": 68719476736,
      "memory_overallocate": 0,
      "memory_allocated": 2147483648,
      "disk": 137438953472,
      "disk_overallocate": 0,
      "disk_allocated": 21474836480,
      "vm_storage": "local",
      "backup_storage": "local",
      "iso_storage": "local",
      "network": "vmbr0",
      "servers_count": 1
    }
  ],
  "meta": {
    "pagination": {
      "total": 32,
      "count": 32,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```

## Fetching a Node

**GET** `/api/application/nodes/<nodeid>`

```json
{
  "data": {
    "id": 4417,
    "location_id": 5340,
    "name": "us-southeast",
    "cluster": "us-southeast",
    "verify_tls": true,
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
    "servers_count": 2
  }
}
```
