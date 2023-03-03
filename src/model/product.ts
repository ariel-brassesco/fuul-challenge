import { Base } from "./base";

/*
  Product table structure:
  - code: string for unique identifier.
  - name: string for display description.
  - price: unitary price.
  - currencyCode: currency of the price.
*/
export class Product extends Base {
  static tableName = "product";

  code!: string;

  name!: string;

  price!: string;

  currencyCode!: string;
}
