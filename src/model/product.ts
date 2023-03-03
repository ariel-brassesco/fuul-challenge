import { Base, getBaseModifiers } from "./base";

export class Product extends Base {
  static tableName = "product";
  static modifiers = getBaseModifiers(Product);

  code!: string;

  name!: string;

  price!: string;

  currencyCode!: string;
}

export type ProductData = Omit<Product, keyof Base>;
