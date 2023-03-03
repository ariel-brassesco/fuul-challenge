import { Decimal } from "decimal.js";

import { DiscountRule, DiscountRuleType } from "../../model";
import { DiscountHelperFactory } from "./helper-factory";
import { discountRepository } from "./repository";

class DiscountService {
  public async deactivate(rule: DiscountRuleType) {
    await DiscountRule.query().update({ active: false }).where({ type: rule });
  }

  public async activate(rule: DiscountRuleType) {
    await DiscountRule.query().update({ active: false }).where({ type: rule });
  }

  public async update(rule: DiscountRuleType, applyOnProducts: string[]) {
    await DiscountRule.query()
      .update({ applyOnProducts })
      .where({ type: rule });
  }

  public async findByType(rule: DiscountRuleType) {
    return discountRepository.findByType(rule);
  }

  public async findAll() {
    return discountRepository.findAll();
  }

  public async getTotalDiscount(items: Record<string, number>) {
    const discountRules = await this.findAll();

    const discountTypes = discountRules.map((rule) => rule.type);

    const helpers = DiscountHelperFactory.getAllByTypes(discountTypes);

    let discount = new Decimal(0);

    for (const helper of helpers) {
      const discountSubtotal = await helper.getDiscount(items);
      discount = discount.plus(discountSubtotal);
    }

    return discount.toString();
  }
}

export const discountService = new DiscountService();
