import Knex, { Knex as KnexType } from "knex";
import { knexSnakeCaseMappers, Model } from "objection";

export interface DatabaseConfig {
  pool: {
    min: number;
    max: number;
  };
}

let knexInstance!: KnexType;
let knex!: KnexType;

export const setupDatabase = async (config: Partial<DatabaseConfig> = {}) => {
  knexInstance = Knex({
    client: "postgresql",

    pool: {
      min: config.pool?.min ?? 0,
      max: config.pool?.min ?? 5,

      createTimeoutMillis: 30_000,
      acquireTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      reapIntervalMillis: 1000,
      createRetryIntervalMillis: 100,
    },

    useNullAsDefault: true,

    connection: process.env.DATABASE_URL,

    ...knexSnakeCaseMappers(),
  });

  knex = knexInstance;

  Model.knex(knex);
};

export { knex };
