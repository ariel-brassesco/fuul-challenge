import { Base, getBaseModifiers } from "./base";

export enum DiscountRuleType {
  BULK = "BULK",
  TWO_FOR_ONE = "TWO_FOR_ONE",
}

export class DiscountRule extends Base {
  static tableName = "discountRule";
  static modifiers = getBaseModifiers(DiscountRule);

  type!: DiscountRuleType;

  active?: boolean;

  applyOnProducts?: string[];
}

export type DiscountRuleData = Omit<DiscountRule, keyof Base>;
