import knex from 'knex';
import * as fs from "fs";

const readFileSync = (filename: string): string =>
  fs.readFileSync(filename).toString("utf8");

const databaseConnection= knex({
  client: 'mysql2',
  connection: {
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_DB  ,
      user: process.env.DATABASE_USER ,
      password: process.env.DATABASE_PASSWORD
        ? readFileSync(process.env.DATABASE_PASSWORD)
        : undefined,
      port: Number(process.env.DATABASE_PORT)
    // if you're not using docker compose for local development, this will default to 8080
    // to prevent non-root permission problems with 80. Dockerfile is set to make this 80
    // because containers don't have that issue :)
},
});

export default databaseConnection;