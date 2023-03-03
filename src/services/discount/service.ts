import { Decimal } from "decimal.js";

import { DiscountRuleType } from "../../model";
import { DiscountHelperFactory } from "./helper-factory";
import { discountRepository } from "./repository";

/*
  This service is used from outside, this class has the function
  to manage the discount promotions.

  An external service must use this service to interact with any discount.
  The other class or functions defined are auxiliary elements for 
  this class and must not be used outside this class.
*/
class DiscountService {
  public async deactivate(rule: DiscountRuleType) {
    return discountRepository.deactivate(rule);
  }

  public async activate(rule: DiscountRuleType) {
    return discountRepository.activate(rule);
  }

  public async updateApplyProducts(
    rule: DiscountRuleType,
    applyOnProducts: string[]
  ) {
    return discountRepository.update(rule, applyOnProducts);
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
