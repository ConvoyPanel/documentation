# IPAM API

## Fetching pools

**GET** `/api/application/address-pools`

Available Request Parameters

- page
- per_page
    - max is 100
- filter[name]

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

Available Request Parameters

- page
- per_page
    - max is 100
- filter[type] = ipv4 | ipv6
- filter[address]
- filter[*]
    - search by wildcard
- filter[server_id]
    - an empty server_id field will search for unallocated IP addresses

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

Available Request Parameters

- `name`: Pool name
- `node_ids`: Node ID that can access this pool in array

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

## Creating single or multiple address

**POST** `/api/application/address-pools/<pool_id>/addresses`

- `is_bulk_action`: `true` for multiple adresses and `false` for single address
    - For single address use this:
        - `address`: IP address value
    - For multiple address use this to define range:
        - `starting_address`: First IP address value
        - `ending_address`: Last IP address value
- `type`: `ipv4` or `ipv6`
- `cidr`: CIDR value
- `gateway`: Network gateway IP value
- `mac_address`: MAC address value or `null` for empty
- `server_id`: Server id number for adress allocation or `null` for empty

### Single address

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

### Multiple address

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

- `name`: new name
- `node_ids`: new node ID that can access this pool in array

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

- `address`: New IP address value
- `type`: `ipv4` or `ipv6`
- `cidr`: New CIDR value
- `gateway`: New network gateway IP value
- `mac_address`: New MAC address value
- `server_id`: New server id number for address allocation
    - null indicates that the address is not allocated to any server

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
