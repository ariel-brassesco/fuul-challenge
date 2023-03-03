import dayjs from "dayjs";
import { Model, Modifiers } from "objection";

export const getBaseModifiers = <T extends typeof Model>(
  model: T
): Modifiers => ({
  deleted(query, columnReference: string) {
    const { ref } = model;
    const column = columnReference ?? ref("deletedAt");
    return query.whereNotNull(column);
  },

  notDeleted(query, columnReference: string) {
    const { ref } = model;
    const column = columnReference ?? ref("deletedAt");
    return query.whereNull(column);
  },

  ordered: (query, columnReference: string) => {
    const { ref } = model;
    const column = columnReference ?? ref("createdAt");
    return query.orderBy(column, "DESC");
  },
});

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

export type Optional<T> = T | undefined;
export type Nullable<T> = Optional<T> | null;
