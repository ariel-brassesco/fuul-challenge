import { DiscountRuleType } from "../../model";
import { BulkDiscountHelper } from "./bulk";
import { DiscountHelper } from "./helper";
import { TwoForOneDiscountHelper } from "./two-for-one";

export class DiscountHelperFactory {
  private static getHelperMap = () => ({
    [DiscountRuleType.BULK]: new BulkDiscountHelper(),
    [DiscountRuleType.TWO_FOR_ONE]: new TwoForOneDiscountHelper(),
    default: new DiscountHelper(),
  });

  public static get<Type extends DiscountHelper>(
    type: DiscountRuleType | "default" = "default"
  ): Type {
    const helperMap = this.getHelperMap();
    return (helperMap[type] ?? helperMap.default) as Type;
  }

  public static getAllByTypes<Type extends DiscountHelper>(
    types: DiscountRuleType[]
  ): Type[] {
    const helperMap = this.getHelperMap();
    const helpers: Type[] = [];

    for (const key of types) {
      const helper = helperMap[key];
      if (helper) {
        helpers.push(helper);
      }
    }

    return helpers;
  }
}
