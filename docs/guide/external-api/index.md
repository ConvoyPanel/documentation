# Getting Started With External API

## Configuration

::: info
Convoy currently uses hard-coded values in your environment file to authorize requests to the external API. This method will most likely be replaced in the future with Bearer tokens and the ability to manage scopes and generate keys on the panel.
:::

Open your `.env` file in the root directory of Convoy and fill the `EXTERNAL_SECRET` field with a secure key. You will use this key in the `Authorization` header of all of your requests.

```js
...
EXTERNAL_SECRET=A_VERY_SECURE_KEY
...
```

## Making requests

In your client, make sure you have the following fields.

```js
Authorization: A_VERY_SECURE_KEY
Accept: application/json
```