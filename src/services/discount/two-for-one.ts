import { Decimal } from "decimal.js";

import { DiscountRule, DiscountRuleType } from "../../model";
import { productService } from "../product";
import { DiscountHelper } from "./helper";

export class TwoForOneDiscountHelper extends DiscountHelper {
  public type = DiscountRuleType.TWO_FOR_ONE;

  protected async applyRule(
    rule: DiscountRule,
    productCode: string,
    quantity: number
  ) {
    const hasProduct =
      rule.applyOnProducts?.includes("all") ||
      rule.applyOnProducts?.includes(productCode);

    if (!hasProduct) {
      return "0";
    }

    const product = await productService.findByCode(productCode);

    if (!product) {
      return "0";
    }

    const discountQuantity = Math.floor(quantity / 2);
    const discount = new Decimal(product.price).mul(discountQuantity);

    return discount.toString();
  }
}
