# Locations API

## Fetching locations

**GET** `/api/application/locations`

Available Request Parameters

-   page
-   per_page
    -   max is 100
-   short_code

Response

```json
{
    "data": [
        {
            "id": 187,
            "short_code": "103",
            "description": "103",
            "nodes_count": 0,
            "servers_count": 0
        },
        {
            "id": 188,
            "short_code": "101",
            "description": "screw you chit",
            "nodes_count": 0,
            "servers_count": 0
        },
        {
            "id": 189,
            "short_code": "113",
            "description": "113",
            "nodes_count": 0,
            "servers_count": 0
        }
    ],
    "meta": {
        "pagination": {
            "total": 5139,
            "count": 50,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 103,
            "links": {
                "next": "https://us-east.performave.com/api/admin/locations?page=2"
            }
        }
    }
}
```
