# Locations API

## Fetching locations

**GET** `/api/application/locations`

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `100`. |
| `filter[short_code]` | string | Locations whose short code contains this text, ignoring case. |

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
                "next": "https://advinservers.com/api/admin/locations?page=2"
            }
        }
    }
}
```
