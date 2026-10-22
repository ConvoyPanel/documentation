# Node Addresses API

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

## Updating an Address

**PUT** `/api/application/nodes/<nodeid>/addresses/<addressid>`

Payload

```json
{
  "mac_address": null,
  "server_id": 10,
  "address": "172.16.141.71",
  "type": "ipv4",
  "cidr": 24,
  "gateway": "172.16.141.2"
}
```

Returns

```json
{
  "data": {
    "id": 14,
    "address_pool_id": 2,
    "server_id": 10,
    "type": "ipv4",
    "address": "172.16.141.71",
    "cidr": 24,
    "gateway": "172.16.141.2",
    "mac_address": null
  }
}
```

## Deleting an Address

**DELETE** `/api/application/nodes/<nodeid>/addresses/<address id>`

Returns no content
