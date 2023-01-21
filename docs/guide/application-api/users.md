# Users API

## Fetching users

**GET** `/api/application/users`

-   page
-   per_page
    -   max is 100
-   filter[name]
-   filter[id]
-   filter[email]

```json
{
    "data": [
        {
            "id": 1,
            "name": "Mike Hawk",
            "email": "t@t.com",
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
        "email": "t@t.com",
        "email_verified_at": null,
        "root_admin": true,
        "servers_count": 3
    }
}
```

## Updating a user

**PUT** `/api/application/users/<user id>`

-   Note: if you want to change the password, set it to a string instead of a null value
    -   leave it as a null value if you want no change

Payload

```json
{
    "root_admin": true,
    "name": "Mike Hawkk",
    "email": "t@t.com",
    "password": null
}
```

Returns

```json
{
    "data": {
        "id": 1,
        "name": "Mike Hawkk",
        "email": "t@t.com",
        "email_verified_at": null,
        "root_admin": true,
        "servers_count": 3
    }
}
```

## Creating a user

**POST** `/api/application/users`

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