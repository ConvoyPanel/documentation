# Users API

## Fetching users

**GET** `/api/application/users`

Query parameters

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | The page to return. |
| `per_page` | integer | Results per page. Defaults to `50`; the most is `100`. |
| `filter[id]` | integer | The user with this ID. |
| `filter[name]` | string | Users whose name contains this text, ignoring case. |
| `filter[email]` | string | The user with this email address, ignoring case. |

```json
{
    "data": [
        {
            "id": 1,
            "name": "Mike Hawk",
            "email": "joe@advinservers.com",
            "email_verified_at": null,
            "root_admin": true,
            "servers_count": 3
        },
        {
            "id": 7,
            "name": "Crystal Larson",
            "email": "kovacek.rex@example.org",
            "email_verified_at": "2022-12-10T20:55:51.000000Z",
            "root_admin": false,
            "servers_count": 0
        }
    ],
    "meta": {
        "pagination": {
            "total": 37,
            "count": 37,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```

## Fetching a user

**GET** `/api/application/users/<id>`

```json
{
    "data": {
        "id": 1,
        "name": "Mike Hawk",
        "email": "joe@advinservers.com",
        "email_verified_at": null,
        "root_admin": true,
        "servers_count": 3
    }
}
```

## Updating a user

**PUT** `/api/application/users/<id>`

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | The user's name. 1 to 191 characters. |
| `email` | string | Yes | The user's email address. Must not belong to another user. |
| `password` | string or null | No | A new password of at least 8 characters. `null`, or leaving it out, keeps the current one. |
| `root_admin` | boolean | Yes | `true` for an administrator, `false` for a regular user. Setting it to `false` on an administrator also deletes their API tokens. |

Payload

```json
{
    "root_admin": true,
    "name": "Mike Hawkk",
    "email": "joe@advinservers.com",
    "password": null
}
```

Returns

```json
{
    "data": {
        "id": 1,
        "name": "Mike Hawkk",
        "email": "joe@advinservers.com",
        "email_verified_at": null,
        "root_admin": true,
        "servers_count": 3
    }
}
```

## Creating a user

**POST** `/api/application/users`

Body parameters

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | The user's name. 1 to 191 characters. |
| `email` | string | Yes | The user's email address. Must not belong to another user. |
| `password` | string | Yes | The user's password. At least 8 characters. |
| `root_admin` | boolean | Yes | `true` for an administrator, `false` for a regular user. |

Payload

```json
{
    "root_admin": true,
    "name": "Anush K",
    "email": "anush.k@advinservers.com",
    "password": "qCG2xHoA^%@%g"
}
```

Returns

```json
{
    "data": {
        "id": 43,
        "name": "Anush K",
        "email": "anush.k@advinservers.com",
        "email_verified_at": null,
        "root_admin": true,
        "servers_count": 0
    }
}
```

## Deleting a user

**DELETE** `/api/application/users/<id>`

-   Note: make sure that there are no servers associated with that server before deleting. If there are servers, a HTTP exception will be thrown and the action won't be processed.

Returns no content