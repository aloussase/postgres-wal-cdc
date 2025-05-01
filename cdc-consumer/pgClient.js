import pg from "pg";

export class PgClient {
  #client;

  constructor({ user, host, database }) {
    this.#client = new pg.Client({
      user,
      host,
      database,
    });
  }

  async start() {
    await this.#client.connect();
    console.log("Connected to Postgres");
  }

  async createTodo(todo) {
    const sql = "insert into todos (id, title, completed) values ($1, $2, $3)";
    const values = [todo.id, todo.title, todo.completed];

    const res = await this.#client.query(sql, values);

    return res.rowCount === 1;
  }
}
