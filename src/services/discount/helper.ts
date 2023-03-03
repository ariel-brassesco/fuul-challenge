import { Decimal } from "decimal.js";

import { DiscountRule, DiscountRuleType } from "../../model";
import { discountRepository } from "./repository";

/*
  Base class for a discount handler.
  
  Define the common methods and the structure of the helpers
  to manage discount promotions.
*/
export class DiscountHelper {
  public type!: DiscountRuleType;

  protected hasProduct(rule: DiscountRule, productCode: string) {
    return (
      rule.applyOnProducts?.includes("all") ||
      rule.applyOnProducts?.includes(productCode)
    );
  }

  protected async applyRule(
    _rule: DiscountRule,
    _productCode: string,
    _quantity: number
  ) {
    return "0";
  }

  public async getDiscount(items: Record<string, number>): Promise<string> {
    const rule = await discountRepository.findByType(this.type);

    if (!rule) {
      return "0";
    }

    let totalDiscount = new Decimal(0);
    for (const [productCode, quantity] of Object.entries(items)) {
      const discount = await this.applyRule(rule, productCode, quantity);
      totalDiscount = totalDiscount.plus(discount);
    }

    return totalDiscount.toString();
  }
}
