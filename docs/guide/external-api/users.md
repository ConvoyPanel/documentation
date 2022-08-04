# Users API

## Fetching users

**GET** `/api/application/users?page=<page number>`

```json
{
    "data": [
        {
            "id": 1,
            "name": "Idell Stokes",
            "email": "lavern41@example.com",
            "root_admin": false,
            "created_at": "2022-08-04T02:15:18.000000Z",
            "updated_at": "2022-08-04T02:15:18.000000Z"
        },
        {
            "id": 2,
            "name": "Rylee Heidenreich",
            "email": "jermaine55@example.com",
            "root_admin": false,
            "created_at": "2022-08-04T02:15:47.000000Z",
            "updated_at": "2022-08-04T02:15:47.000000Z"
        },
        {
            "id": 3,
            "name": "Joany Bosco",
            "email": "cleveland29@example.org",
            "root_admin": false,
            "created_at": "2022-08-04T02:15:48.000000Z",
            "updated_at": "2022-08-04T02:15:48.000000Z"
        }
    ],
    "meta": {
        "pagination": {
            "total": 3,
            "count": 3,
            "per_page": 50,
            "current_page": 1,
            "total_pages": 1,
            "links": {}
        }
    }
}
```

## Fetching an individual user

**GET** `/api/application/users/<user id>`

```json
{
    "data": {
        "id": 1,
        "name": "Idell Stokes",
        "email": "lavern41@example.com",
        "root_admin": false,
        "created_at": "2022-08-04T02:15:18.000000Z",
        "updated_at": "2022-08-04T02:15:18.000000Z"
    }
}
```

## Updating a user

**PUT** `/api/application/users/<user id>`

Fields
```php
'name' => 'string|max:40|required',
'email' => 'email|required',
'password' => 'nullable', // minimum of 8 characters
'root_admin' => 'boolean|required',
```

Returns
```json
{
    "data": {
        "id": 1,
        "name": "Eric Wang",
        "email": "eric@performave.com",
        "root_admin": true,
        "created_at": "2022-08-04T02:15:18.000000Z",
        "updated_at": "2022-08-04T02:20:49.000000Z"
    }
}
```

## Creating a user

**POST** `/api/application/users`

Fields
```php
'name' => 'string|max:40|required',
'email' => 'email|required',
'password' => 'required', // minimum of 8 characters
'root_admin' => 'boolean|required',
```

Returns
```json
{
    "data": {
        "id": 9,
        "name": "Anush K",
        "email": "anush.k@advinservers.com",
        "root_admin": true,
        "created_at": "2022-08-04T02:22:43.000000Z",
        "updated_at": "2022-08-04T02:22:43.000000Z"
    }
}
```
