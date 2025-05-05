export const createEndpoints = (idGenerator, pgClient) => {
  const generateId = async (req, res) => {
    const id = idGenerator.newId();
    return res.status(200).json({ id });
  };

  const listTodos = async (req, res) => {
    const todos = await pgClient.listTodos();
    return res.status(200).json(todos);
  };

  const toggleTodo = async (req, res) => {
    const id = req.params.id;
    const ok = await pgClient.toggleTodo(id);

    if (ok) {
      return res.status(200).send();
    }

    res.status(404).send();
  };

  const deleteTodo = async (req, res) => {
    const id = req.params.id;
    const ok = await pgClient.deleteTodo(id);

    if (ok) {
      return res.status(204).send();
    }

    res.status(404).send();
  };

  const updateTodo = async (req, res) => {
    const { title } = req.body;
    const id = req.params.id;

    const ok = await pgClient.updateTodo(id, title);

    if (ok) {
      return res.status(204).send();
    }

    res.status(404).send();
  };

  const addTodo = async (req, res) => {
    const newTodo = req.body;

    const ok = await pgClient.createTodo(newTodo);

    if (ok) {
      console.log("successfully created todo");
      return res.status(201).json(newTodo);
    }

    console.log("There was a problem creating the todo");
    res.status(400).send();
  };

  return {
    generateId,
    toggleTodo,
    deleteTodo,
    updateTodo,
    addTodo,
    listTodos,
  };
};
