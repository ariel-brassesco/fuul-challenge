import { Base } from "./base";

export enum DiscountRuleType {
  BULK = "BULK",
  TWO_FOR_ONE = "TWO_FOR_ONE",
}

/*
  DiscountRule table structure:
   - type: specific the kind of discount promotion.
   - active: use to turn on/off.
   - applyOnProducts: a list of product codes whose promotion is valid.
*/
export class DiscountRule extends Base {
  static tableName = "discountRule";

  type!: DiscountRuleType;

  active?: boolean;

  applyOnProducts?: string[];
}
