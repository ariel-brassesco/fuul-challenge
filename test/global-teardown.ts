import { knex } from "../src/utils";

export default async () => {
  await knex.destroy();
};
