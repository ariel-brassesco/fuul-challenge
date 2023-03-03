const { DATABASE_URL } = process.env;

const config = {
  client: "postgresql",

  migrations: {
    directory: "./src/model/migrations",
    tableName: "migrations",
  },

  seeds: {
    directory: "./src/model/seeds",
  },

  pool: {
    min: 1,
    max: 1,
  },

  useNullAsDefault: true,

  connection: DATABASE_URL,

  ...require("objection").knexSnakeCaseMappers(),
};

export default config;
