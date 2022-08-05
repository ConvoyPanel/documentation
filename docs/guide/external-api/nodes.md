# Nodes Api

## Fetching Nodes

**GET** `/api/application/nodes?page=<page number>`

```json
{
    "data": {
        {
            "id": 1,
            "name": "Cletus",
            "cluster": "proxmox",
            "hostname": "proxmox.stratumpanel.com",
            "port": 8006,
            "auth_type": "pam",
            "latency_in_ms": null
        },
        {
            "id": 2,
            "name": "Reuben",
            "cluster": "proxmox",
            "hostname": "Block",
            "port": 8006,
            "auth_type": "pam",
            "latency_in_ms": null
        },
        {
            "id": 3,
            "name": "Horacio",
            "cluster": "proxmox",
            "hostname": "Rutherford",
            "port": 8006,
            "auth_type": "pam",
            "latency_in_ms": null
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
        "port": 8006,
        "auth_type": "pam",
        "latency_in_ms": null
    }
}
```

## Updating a Node

**PUT** `/api/application/nodes/<server id>`


Fields
```php
'name' => 'string|required',
'cluster' => 'string|required',
'hostname' => "new Hostname, 'required'",
'username' => 'string|required',
'password' => 'string|required',
'port' => 'integer|required',
'auth_type' => 'required' // This field can be: pve, pam.
```

Returns
```json
{
    "data": {
        "id": 1,
        "name": "Cletus",
        "cluster": "proxmox",
        "hostname": "proxmox.stratumpanel.com",
        "port": 8006,
        "auth_type": "pam",
        "latency_in_ms": null
    }
}
```

## Creating a Node

**POST** `/api/applications/nodes`


Fields
```php
'name' => 'string|required',
'cluster' => 'string|required',
'hostname' => "new Hostname, 'required'",
'username' => 'string|required',
'password' => 'string|required',
'port' => 'integer|required',
'auth_type' => 'required' // This value can be: pve, pam.
```


Returns
```json
{
    "data": {
        "id": 1,
        "name": "Cletus",
        "cluster": "proxmox",
        "hostname": "proxmox.stratumpanel.com",
        "port": 8006,
        "auth_type": "pam",
        "latency_in_ms": null
    }
}
```

## Deleting a node
::: danger
This method by default only deletes the node from the database and NOT FROM THE NODE. Make sure to set `purge` to `true` to fully clear any data associated with the server.
:::

Fields
```php
'purge' => 'boolean|nullable' // Set this to 'true' to also delete the server from the Proxmox node
```

Returns no content
