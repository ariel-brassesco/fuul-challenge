# fuul-challenge

## Introduction

The challenge instructions can be found in [fuul challenge](https://github.com/fuul-app/code-challenge/blob/main/README.md).

The solution implements a postgres database to persist products and discount rules. This allows add or remove products, modify products data, active/inactive discount rules, and more.

The different discount rules are managed by the class `DiscountHelper` that allows to change the discount calculation taking into account all the items in checkout and the `DiscountRule` data. Also, there is a `DiscountHelperFactory` which allow easily add or remove discount rules and handle witch apply.

Finally, the checkout is managed by the class `CheckoutService`. This class allows `scan` items one-by-one, apply discounts, calculate subtotal and total.

## Build

To build the project run:

```bash
npm install && npm run build
```

If you want to try the code in console:

- Set the environment variable `DATABASE_URL` to your database url.
- Init the console and execute the method `setupDatabase` to start the connection.

```js
> var fuul = require(".");
fuul.setupDatabase();
```

## Migrate and populate database

To migrate the database follow these steps:

- Set the environment variable `DATABASE_URL` to your database url.
- Run `npm run migrate:latest`.

To populate the database run `npm run seed:run`.

## Testing

Set the environment variables `DATABASE_URL`
and `DATABASE_URL_TEST` in the form `postgres://username:password@host:port/your-data-base
`, then run:

```bash
npm run test
```
