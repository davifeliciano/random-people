import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const url =
  "https://api.nobelprize.org/2.1/laureates?nobelPrizeCategory=phy&limit=1000";

fetch(url)
  .then((res) => res.json())
  .then(async (data) => {
    const fullNames = data.laureates.map((laureate: any) => {
      return laureate.fullName.en;
    });

    const valuesClause = fullNames
      .map((_: string, index: number) => {
        return `($${index + 1})`;
      })
      .join(", ");

    const dropText = `
      DROP TABLE IF EXISTS people;
    `;

    await pool.query(dropText);

    const createText = `
      CREATE TABLE people (
        id serial PRIMARY KEY,
        fullname TEXT
      )
    `;

    await pool.query(createText);

    const insertText = `
      INSERT INTO people
        (fullname)
      VALUES
        ${valuesClause}
    `;

    await pool.query(insertText, fullNames);
  });
