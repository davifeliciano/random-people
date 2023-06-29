import pool from "@database/pool";
import { Person } from "@interfaces/people.interfaces";
class PeopleRepository {
  static async getRandomPerson() {
    const text = `
      SELECT
        *
      FROM people
      ORDER BY random()
      LIMIT 1
    `;

    const { rows } = await pool.query<Person>(text);
    return rows[0];
  }
}

export default PeopleRepository;
