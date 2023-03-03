import { Knex } from "knex";

const createProducts = () => {
  return [
    {
      code: "APE",
      name: "Bored Apes",
      price: "75",
      currencyCode: "ETH",
    },
    {
      code: "PUNK",
      name: "Crypto Punks",
      price: "60",
      currencyCode: "ETH",
    },
    {
      code: "MEEBIT",
      name: "Meebits",
      price: "4",
      currencyCode: "ETH",
    },
  ];
};

const createDiscounts = () => {
  return [
    {
      type: "BULK",
      active: true,
      applyOnProducts: JSON.stringify(["PUNK"]),
    },
    {
      type: "TWO_FOR_ONE",
      active: true,
      applyOnProducts: JSON.stringify(["APE"]),
    },
  ];
};

export async function seed(knex: Knex) {
  await knex("product").insert(createProducts());

  await knex("discount_rule").insert(createDiscounts());
}
