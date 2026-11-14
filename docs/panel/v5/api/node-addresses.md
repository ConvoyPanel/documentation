# Node Addresses API

## Fetching a Node's Addresses

**GET** `/api/application/nodes/<nodeid>/addresses`

Available Request Parameters

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `999999`. |
| `filter[address]` | string | Addresses that contain this text. |
| `filter[type]` | string | `ipv4` or `ipv6`. |
| `filter[server_id]` | integer | Addresses allocated to the server with this ID. Leave it empty (`?filter[server_id]=`) to list unallocated addresses. |

```json
{
  "data": [
    {
      "id": 11,
      "address_pool_id": 2,
      "server_id": null,
      "type": "ipv4",
      "address": "172.16.141.70",
      "cidr": 24,
      "gateway": "172.16.141.1",
      "mac_address": null
    },
    {
      "id": 10,
      "address_pool_id": 2,
      "server_id": null,
      "type": "ipv4",
      "address": "172.16.141.69",
      "cidr": 24,
      "gateway": "172.16.141.1",
      "mac_address": null
    },
    {
      "id": 9,
      "address_pool_id": 2,
      "server_id": null,
      "type": "ipv4",
      "address": "172.16.141.68",
      "cidr": 24,
      "gateway": "172.16.141.1",
      "mac_address": null
    },
    {
      "id": 8,
      "address_pool_id": 2,
      "server_id": null,
      "type": "ipv4",
      "address": "172.16.141.67",
      "cidr": 24,
      "gateway": "172.16.141.1",
      "mac_address": null
    }
  ],
  "meta": {
    "pagination": {
      "total": 4,
      "count": 4,
      "per_page": 50,
      "current_page": 1,
      "total_pages": 1,
      "links": {}
    }
  }
}
```
