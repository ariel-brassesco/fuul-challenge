import { Decimal } from "decimal.js";

import { DiscountRule, DiscountRuleType } from "../../model";
import { productService } from "../product";
import { DiscountHelper } from "./helper";

/*
  The particular implementation for 2x1 promotion.
*/
export class TwoForOneDiscountHelper extends DiscountHelper {
  public type = DiscountRuleType.TWO_FOR_ONE;

  protected async applyRule(
    rule: DiscountRule,
    productCode: string,
    quantity: number
  ) {
    const hasProduct = this.hasProduct(rule, productCode);

    if (!hasProduct) {
      return "0";
    }

    const product = await productService.findByCode(productCode);

    if (!product) {
      return "0";
    }

    const discountQuantity = Decimal.floor(quantity / 2);
    const discount = new Decimal(product.price).mul(discountQuantity);

    return discount.toString();
  }
}
