import { Sequelize, type Dialect } from "sequelize";
import config from "./config.ts";

const dialect = config.DB.DIALECT;
const host = config.DB.HOST;
const port = config.DB.PORT;
const database = config.DB.NAME;
const username = config.DB.USER;
const password = config.DB.PASSWORD;

export const dbConnection: Sequelize = new Sequelize(database, username, password, {
  host,
  port,
  dialect: dialect as Dialect,
});
