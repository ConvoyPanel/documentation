# Nodes Api

## Fetching Nodes

**GET** `/api/application/nodes?page=<page number>`

```json
{
    "data": [
        {
            "id": 1,
            "name": "Cletus",
            "cluster": "proxmox",
            "hostname": "proxmox.stratumpanel.com",
            "port": 8006
        },
        {
            "id": 2,
            "name": "Reuben",
            "cluster": "proxmox",
            "hostname": "Block",
            "port": 8006
        },
        {
            "id": 3,
            "name": "Horacio",
            "cluster": "proxmox",
            "hostname": "Rutherford",
            "port": 8006
        },
        {
            "id": 4,
            "name": "Dorthy",
            "cluster": "proxmox",
            "hostname": "Hamill",
            "port": 8006
        },
        {
            "id": 5,
            "name": "Hester",
            "cluster": "proxmox",
            "hostname": "Ankunding",
            "port": 8006
        },
        {
            "id": 6,
            "name": "Cordie",
            "cluster": "proxmox",
            "hostname": "Little",
            "port": 8006
        },
        {
            "id": 7,
            "name": "Eldora",
            "cluster": "proxmox",
            "hostname": "Leannon",
            "port": 8006
        },
        {
            "id": 8,
            "name": "sfdsdf",
            "cluster": "proxmox",
            "hostname": "proxmox.stratumpanel.com",
            "port": 8006
        }
    ],
    "meta": {
        "pagination": {
            "total": 8,
            "count": 8,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```

## Fetching a Node

**GET** `/api/application/nodes/<server id>`
```json
{
    "data": {
        "id": 1,
        "name": "Cletus",
        "cluster": "proxmox",
        "hostname": "proxmox.stratumpanel.com",
        "port": 8006
    }
}
```