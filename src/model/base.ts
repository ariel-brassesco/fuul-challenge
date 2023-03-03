import dayjs from "dayjs";
import { Model } from "objection";

/*
 Define common database table columns and some behavior
*/
export class Base extends Model {
  static modelPaths = [__dirname];
  static useLimitInFirst = true;

  id!: string;

  createdAt!: Date;

  updatedAt?: Date;

  deletedAt?: Date;

  $beforeInsert(): void {
    this.createdAt = dayjs().toDate();
  }

  $beforeUpdate(): void {
    this.updatedAt = dayjs().toDate();
  }
}
