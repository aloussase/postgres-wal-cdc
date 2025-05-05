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

  /**
   *
   * @returns A list of all todos in the database.
   */
  async listTodos() {
    const sql = "select id, title, completed from todos";
    const res = await this.#client.query(sql);
    return res.rows;
  }

  /**
   * Create a todo in the database.
   * @param {Todo} todo
   * @returns
   */
  async createTodo(todo) {
    const sql = "insert into todos (id, title, completed) values ($1, $2, $3)";
    const values = [todo.id, todo.title, todo.completed];

    const res = await this.#client.query(sql, values);

    return res.rowCount === 1;
  }

  /**
   *  Toggle the completion status of the todo identified by the given ID.
   * @param {number} todoId
   * @returns
   */
  async toggleTodo(todoId) {
    const sql = "update todos set completed = not completed where id = $1";
    const values = [todoId];

    const res = await this.#client.query(sql, values);

    return res.rowCount === 1;
  }

  /**
   * Set the title of the todo identified by the provided ID.
   * @param {number} todoId
   * @param {string} newTitle
   * @returns
   */
  async updateTodo(todoId, newTitle) {
    const sql = "update todos set title = $1 where id = $2";
    const values = [newTitle, todoId];

    const res = await this.#client.query(sql, values);

    return res.rowCount === 1;
  }

  /**
   * Delete the todo identified by the given ID.
   * @param {number} todoId
   * @returns
   */
  async deleteTodo(todoId) {
    const sql = "delete from todos where id = $1";
    const values = [todoId];

    const res = await this.#client.query(sql, values);

    return res.rowCount === 1;
  }
}
