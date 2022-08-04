# Servers API

## Fetching Servers

**GET** `/api/application/servers?page=<page number>`

```json
{
    "data": [
        {
            "id": 1,
            "vmid": 1489,
            "installing": 0,
            "name": "Eric's personal server",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 2,
            "vmid": 3009,
            "installing": 0,
            "name": "Advinservers client area",
            "user_id": 1,
            "node_id": 1
        },
        {
            "id": 3,
            "vmid": 4716,
            "installing": 0,
            "name": "Gabriel C.'s server",
            "user_id": 1,
            "node_id": 1
        }
        ...
    ],
    "meta": {
        "pagination": {
            "total": 70,
            "count": 50,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 2,
            "links": {
                "next": "http://tw-west.performave.com/api/application/servers?page=2"
            }
        }
    }
}
```