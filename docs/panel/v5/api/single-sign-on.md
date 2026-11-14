# Single Sign On API

## Create a token

**POST** `/api/application/users/<id>/generate-sso-token`

A token is valid for 15 seconds, so redirect the user as soon as you have it.

```json
{
    "data": {
        "user_id": 1,
        "token": "5e0d50852aafca4f4e6411c3665ba8005ca416bb012b982d2f6bb7c1daf98b4b"
    }
}
```

## Use the token

Redirect the user's browser to `example.com/authenticate?token=<token content>`
