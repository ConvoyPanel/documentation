# Addresses Api

## Fetching A Nodes Addresses

**GET** `/api/application/nodes/<nodeid>/addresses`
```json
{
    "data": {
        {
            "id": 1,
            "address": "1.2.3.4",
            "cidr": "24",
            "gateway": "192.168.1.1",
            "node_id": 1,
            "server_id": 70
        },
        {
            "id": 2,
            "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            "cidr": "64",
            "gateway": "fe80::1",
            "node_id": 1,
            "server_id": null
        }
    }
}
```

## Fetching a Address

**GET** `/api/application/nodes/<nodeid>/addresses/<addressid>`
```json
{
    "data": {
        "id": 1,
        "address": "1.2.3.4",
        "cidr": "24",
        "gateway": "192.168.1.1",
        "node_id": 1,
        "server_id": 70
    }
}
```

## Updating an Address

**PUT** `/api/application/nodes/<nodeid>/addresses/<addressid>`


Fields
```php
'server_id' => 'exists:servers,id|nullable',
'node_id' => 'required|exists:nodes,id',
'address' => 'ip',
'cidr' => 'numeric|required',
'gateway' => 'ip',
'type' => 'required', // This value can be: ip, gw, ip6, gw6.
```

Returns
```json
{
    "data": {
        "id": 1,
        "address": "1.2.3.4",
        "cidr": "24",
        "gateway": "192.168.1.1",
        "node_id": 1,
        "server_id": 70
    }
}
```

## Creating an address

**POST** `/api/application/nodes/<nodeid>/addresses`


Fields
```php
'server_id' => 'exists:servers,id|nullable',
'node_id' => 'required|exists:nodes,id',
'address' => 'ip',
'cidr' => 'numeric|required',
'gateway' => 'ip',
'type' => 'required', // This value can be: ip, gw, ip6, gw6.
```


Returns
```json
{
    "data": {
        "id": 1,
        "address": "1.2.3.4",
        "cidr": "24",
        "gateway": "192.168.1.1",
        "node_id": 1,
        "server_id": 70
    }
}
```

## Deleting an Address

**DELETE** `/api/application/nodes/<nodeid>/addresses/<address id>`

Returns no content
