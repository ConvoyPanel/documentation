# Single Sign On API

## Create a token

**POST** `/api/application/users/<user id>/sso`

Tokens expire after 2 minutes or if it gets used.

```json
{
    "user_id": 1,
    "token": "5e0d50852aafca4f4e6411c3665ba8005ca416bb012b982d2f6bb7c1daf98b4b",
    "updated_at": "2022-08-14T03:10:09.000000Z",
    "created_at": "2022-08-14T03:10:09.000000Z",
    "id": 2
}
```

## Use the token

Redirect the browser/client to `/sso/authorize?token=<token content>`