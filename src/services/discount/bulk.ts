import { Decimal } from "decimal.js";

import { DiscountRule, DiscountRuleType } from "../../model";
import { productService } from "../product";
import { DiscountHelper } from "./helper";

export class BulkDiscountHelper extends DiscountHelper {
  public type = DiscountRuleType.BULK;

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

    if (quantity < 3) {
      return "0";
    }

    const product = await productService.findByCode(productCode);

    if (!product) {
      return "0";
    }

    const discount = new Decimal(product.price).minus(50).mul(quantity);

    return discount.toString();
  }
}
