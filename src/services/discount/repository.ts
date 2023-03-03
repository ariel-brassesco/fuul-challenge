import { DiscountRule, DiscountRuleType } from "../../model";

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
}

export const discountRepository = new DiscountRepository();
