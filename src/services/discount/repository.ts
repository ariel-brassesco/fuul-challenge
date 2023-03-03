import { DiscountRule, DiscountRuleType } from "../../model";

/*
  This class handle the discount_rule table and must define
  any query we will need.

  This allow to share queries between services and providers 
  without repeating code to avoid circular dependency.
*/
class DiscountRepository {
  public findById = async (id: string) => {
    return DiscountRule.query().findById(id);
  };

  public async findByType(rule: DiscountRuleType) {
    return DiscountRule.query()
      .whereNull("deletedAt")
      .where({ type: rule })
      .first();
  }

  public async findAll() {
    return DiscountRule.query().whereNull("deletedAt").where("active", true);
  }

  public async deactivate(rule: DiscountRuleType) {
    return DiscountRule.query().update({ active: false }).where({ type: rule });
  }

  public async activate(rule: DiscountRuleType) {
    return DiscountRule.query().update({ active: false }).where({ type: rule });
  }

  public async update(rule: DiscountRuleType, applyOnProducts: string[]) {
    return DiscountRule.query()
      .update({ applyOnProducts })
      .where({ type: rule });
  }
}

export const discountRepository = new DiscountRepository();
