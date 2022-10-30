# Addresses Api

## Fetching A Nodes Addresses

**GET** `/api/application/nodes/<nodeid>/addresses?filter[server_id]=<server id>&filter[node_id]=<node id>&filter[address]=<address>&filter[cidr]=<cidr>&filter[gateway]=<gateway>&filter[type]=<type>`
```json
{
    "data": {
        {
            "id": 1,
            "address": "1.2.3.4",
            "cidr": "24",
            "gateway": "192.168.1.1",
            "node_id": 1,
            "server_id": 70,
            "mac_address": null
        },
        {
            "id": 2,
            "address": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            "cidr": "64",
            "gateway": "fe80::1",
            "node_id": 1,
            "server_id": null,
            "mac_address": null
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
        "server_id": 70,
        "mac_address": null
    }
}
```

## Updating an Address

**PUT** `/api/application/nodes/<nodeid>/addresses/<addressid>`


Fields
```php
'server_id' => 'exists:servers,id|nullable',
'address' => 'ip',
'cidr' => 'numeric|required', //subnet mask, netmask
'gateway' => 'ip',
'type' => 'required', // This value can be: ipv4, ipv6
```

Returns
```json
{
    "data": {
      "id": 1,
      "address": "192.168.0.1",
      "cidr": "24",
      "gateway": "192.168.1.1",
      "node_id": 1,
      "server_id": 12,
      "mac_address": null
    }
}
```

## Creating an address

**POST** `/api/application/nodes/<nodeid>/addresses`


Fields
```php
'server_id' => 'exists:servers,id|nullable',
'address' => 'ip',
'cidr' => 'numeric|required',
'gateway' => 'ip',
'type' => 'required', // This value can be: ipv4, ipv6
```


Returns
```json
{
    "data": {
      "id": 1,
      "address": "192.168.0.1",
      "cidr": "24",
      "gateway": "192.168.1.1",
      "node_id": 1,
      "server_id": 12,
      "mac_address": null
    }
}
```

## Deleting an Address

**DELETE** `/api/application/nodes/<nodeid>/addresses/<address id>`

Returns no content
