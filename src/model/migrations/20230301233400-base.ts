/* eslint-disable unicorn/no-null */
import { Knex } from "knex";

import { commonColumns } from "../../utils";

export async function up(knex: Knex): Promise<any> {
  await knex.raw(`
    SET TIMEZONE='UTC';
  `);

  await knex.schema.createTable("product", (table) => {
    commonColumns(knex, table);
    table.string("code").unique().notNullable();
    table.string("name");
    table.decimal("price", null, 18);
    table.string("currencyCode").notNullable();
  });

  await knex.schema.raw(
    "ALTER TABLE product ADD CONSTRAINT product_price_check CHECK (price >= 0 );"
  );

  await knex.schema.createTable("discount_rule", (table) => {
    commonColumns(knex, table);
    table.string("type").unique().notNullable();
    table.boolean("active");
    table.json("apply_on_products").defaultTo([]);
  });
}

export async function down(knex: Knex): Promise<any> {
  const tables = ["product", "discount_rule"];

  for (const table of tables.reverse()) {
    await knex.schema.dropTableIfExists(table);
  }
}
