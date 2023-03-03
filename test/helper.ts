import path from "path";

import { knex, setupDatabase, uuid } from "../src/utils";
import { seed } from "./fixture";

const { DATABASE_URL_TEST, DATABASE_URL } = process.env;

const root = process.cwd();
const migrationsDirectory = path.resolve(root, "dist/model/migrations");

export async function initDisposableDatabase(drop = true) {
  const originalDatabaseUrl = DATABASE_URL;
  const id = uuid().replace(/[_-]/g, "").toLowerCase();

  try {
    await setupDatabase();

    const databaseUrl = `${DATABASE_URL_TEST}_${id}?sslmode=disable`;
    process.env.DATABASE_URL = databaseUrl;

    await knex.raw(`CREATE DATABASE fuul_test_${id}`);
    console.log(`Created database fuul_test_${id}`);

    await setupDatabase();

    await knex.migrate.latest({
      directory: migrationsDirectory,
      extension: "js",
      loadExtensions: [".js"],
    });

    await seed(knex);
  } catch (error) {
    console.error("initDisposableDatabase failed", error);

    throw error;
  }

  return async () => {
    knex.destroy();
    process.env.DATABASE_URL = originalDatabaseUrl;
    await setupDatabase();

    if (drop) {
      console.log(`Dropping database fuul_test_${id}`);
      await knex.raw(`DROP DATABASE fuul_test_${id}`);
    }

    await knex.destroy();
  };
}
