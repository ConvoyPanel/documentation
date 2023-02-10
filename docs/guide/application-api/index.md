# Getting Started With Application API

::: danger
If you forget to set your `Authorization` header, have an invalid token, or didn't set your `Accept` header to `application/json`, you may get HTTP error 500. This bug is being investigated and resolved.
- 1/21/2023 MM/DD/YYYY
:::

## Configuration

To get started, generate an application key in the Convoy admin panel under "tokens"

## Making requests

In your HTTP client, make sure you have the following fields.

```js
Authorization: Bearer your_key_here
Accept: application/json
Content-Type: application/json
```
