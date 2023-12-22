# Templates API

## Fetching A Nodes templates

**GET** `/api/application/nodes/<nodeid>/template-groups`

The first depth is the template group. Do not use the template group's UUID for the `template_uuid` in server creation.

The second depth is the template itself. Use the UUID field in the second depth for server creation.

```json
{
    "data": [
        {
            "id": 3,
            "node_id": 4417,
            "uuid": "17f3cc38-8739-472f-9098-28b7acfb6611",
            "name": "Ubuntu",
            "hidden": 0,
            "order_column": 1,
            "templates": {
                "data": [
                    {
                        "id": 20,
                        "template_group_id": 3,
                        "uuid": "d176b498-87e8-421f-a958-048ef15ef199",
                        "name": "20.04",
                        "vmid": 1000,
                        "hidden": 1,
                        "order_column": 2
                    }
                ]
            }
        },
        {
            "id": 19,
            "node_id": 4417,
            "uuid": "6fed2adf-ae45-4ff2-961b-368cc05cfb33",
            "name": "Windows",
            "hidden": 0,
            "order_column": 2,
            "templates": {
                "data": [
                    {
                        "id": 21,
                        "template_group_id": 19,
                        "uuid": "1fd40e86-6e00-4495-bc13-da91a7a9b102",
                        "name": "Windows Server 2022",
                        "vmid": 1002,
                        "hidden": 0,
                        "order_column": 1
                    }
                ]
            }
        }
    ]
}
```
