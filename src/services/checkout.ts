import { Decimal } from "decimal.js";

import { discountService } from "./discount";
import { productService } from "./product";

/*
  The CheckoutService class handle the items in checkout, 
  apply discounts, calculate subtotal and total.  
*/
export class CheckoutService {
  private items: Record<string, number> = {};

  private getQuantity(productCode: string) {
    return this.items[productCode] ?? 0;
  }

  private add(productCode: string) {
    this.items[productCode] = this.getQuantity(productCode) + 1;
  }

  public async scan(productCode: string) {
    const product = await productService.findByCode(productCode);

    if (!product) {
      return;
    }

    this.add(product.code);

    return this.parseItems();
  }

  public parseItems() {
    const parse = Object.entries(this.items).map(
      ([code, quantity]) => `${code}(${quantity})`
    );
    return parse.join(", ");
  }

  public async getSubTotal() {
    const productCodes = Object.keys(this.items);
    const products = await productService.findByCodes(productCodes);

    const subtotal = products.reduce((accumulate, product) => {
      const quantity = this.getQuantity(product.code);
      const cost = new Decimal(product.price).mul(quantity);

      return accumulate.plus(cost);
    }, new Decimal(0));

    return subtotal.toString();
  }

  public async getDiscount() {
    return discountService.getTotalDiscount(this.items);
  }

  public async getTotal() {
    const [subtotal, discount] = await Promise.all([
      this.getSubTotal(),
      this.getDiscount(),
    ]);

    return new Decimal(subtotal).minus(discount).toString();
  }
}
