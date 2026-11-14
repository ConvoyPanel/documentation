# IPAM API

## Fetching pools

**GET** `/api/application/address-pools`

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `100`. |
| `filter[name]` | string | Pools whose name contains this text, ignoring case. |

```json
{
  "data": [
    {
      "id": 2,
      "name": "Node dc01.local",
      "nodes_count": 1,
      "addresses_count": 6
    },
    {
      "id": 1,
      "name": "Node 172.16.141.50",
      "nodes_count": 1,
      "addresses_count": 5
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

## Fetching a pool

**GET** `/api/application/address-pools/<pool_id>`

```json
{
  "data": {
    "id": 1,
    "name": "Node 172.16.141.50",
    "nodes_count": 1,
    "addresses_count": 5
  }
}
```

## Fetching a pool addresess

**GET** `/api/application/address-pools/<pool_id>/addresses`

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `999999`. |
| `filter[type]` | string | `ipv4` or `ipv6`. |
| `filter[address]` | string | The address, ignoring case. |
| `filter[*]` | string | An address's ID, the address itself, or its MAC address, ignoring case. Separate several with commas. |
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

## Creating a pool

**POST** `/api/application/address-pools`

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | The pool's name. Up to 191 characters. |
| `node_ids` | array of integers | No | IDs of the nodes that can use this pool. |

Payload

```json
{
  "name": "Node dc01.local",
  "node_ids": [
    1
  ]
}
```

Returns

```json
{
  "data": {
    "id": 4,
    "name": "Node dc01.local",
    "nodes_count": 1,
    "addresses_count": 0
  }
}
```

## Adding an Address

**POST** `/api/application/address-pools/<pool_id>/addresses`

Adds one address to a pool.

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `is_bulk_action` | boolean | Yes | Always `false` when adding one address. |
| `address` | string | Yes | The IP address to add. |
| `type` | string | Yes | `ipv4` or `ipv6`. `address` and `gateway` must be of this type. |
| `cidr` | integer | Yes | The network's prefix length, from `0` to `128`. |
| `gateway` | string | Yes | The network's gateway address. |
| `mac_address` | string or null | No | MAC address for the address. `null` leaves it empty. |
| `server_id` | integer or null | Yes | ID of the server to allocate the address to. `null` leaves it unallocated. |

Payload

```json
{
  "is_bulk_action": false,
  "mac_address": null,
  "server_id": 10,
  "address": "172.16.141.71",
  "type": "ipv4",
  "cidr": 24,
  "gateway": "172.16.141.1"
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
    "gateway": "172.16.141.1",
    "mac_address": null
  }
}
```

## Adding a Range of Addresses

**POST** `/api/application/address-pools/<pool_id>/addresses`

Adds every address from a starting address to an ending address. A range holds at most 65,536 addresses.

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `is_bulk_action` | boolean | Yes | Always `true` when adding a range. |
| `starting_address` | string | Yes | The first IP address of the range. |
| `ending_address` | string | Yes | The last IP address of the range. |
| `type` | string | Yes | `ipv4` or `ipv6`. `starting_address`, `ending_address`, and `gateway` must be of this type. |
| `cidr` | integer | Yes | The network's prefix length, from `0` to `128`. |
| `gateway` | string | Yes | The network's gateway address. |
| `mac_address` | string or null | Yes | MAC address for every address in the range. `null` leaves them empty. |
| `server_id` | integer or null | Yes | ID of the server to allocate every address in the range to. `null` leaves them unallocated. |

Payload

```json
{
  "is_bulk_action": true,
  "starting_address": "172.16.141.80",
  "ending_address": "172.16.141.85",
  "mac_address": null,
  "server_id": 10,
  "type": "ipv4",
  "cidr": 24,
  "gateway": "172.16.141.1"
}
```

Returns no content

## Updating a pool

**PUT** `/api/application/address-pools/<pool_id>`

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | The pool's new name. Up to 191 characters. |
| `node_ids` | array of integers | Yes | IDs of every node that can use this pool. Nodes left out are detached, so leaving the field out detaches them all. The request is refused if a node you detach has servers using the pool's addresses. |

Payload

```json
{
  "name": "Network Node dc01.local",
  "node_ids": [
    1
  ]
}
```

Returns

```json
{
  "data": {
    "id": 2,
    "name": "Network Node dc01.local",
    "nodes_count": 1,
    "addresses_count": 6
  }
}
```

## Updating an address

**PUT** `/api/application/address-pools/<pool_id>/addresses/<address_id>`

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `type` | string | Yes | `ipv4` or `ipv6`. `address` must be of this type. |
| `cidr` | integer | Yes | The network's prefix length, from `0` to `128`. |
| `address` | string | Yes | The IP address. |
| `gateway` | string | No | The network's gateway address. |
| `mac_address` | string or null | No | MAC address for the address. `null` leaves it empty. |
| `server_id` | integer or null | No | ID of the server to allocate the address to. `null` leaves it unallocated. |

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

## Deleting a pool

**DELETE** `/api/application/address-pools/<pool_id>`

- Note: make sure that there are no nodes associated with that pool before deleting. If there are nodes, an HTTP
  exception will be thrown and the action won't be processed.

Returns no content

## Deleting an address

**DELETE** `/api/application/address-pools/<pool_id>/addresses/<address_id>`

Returns no content
