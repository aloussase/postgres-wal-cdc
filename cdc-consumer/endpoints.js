export const createEndpoints = (pgClient) => {
  const toggleTodo = async (req, res) => {
    const id = req.params.id;
    const ok = await pgClient.toggleTodo(id);

    if (ok) {
      return res.status(200).send();
    }

    res.status(404).send();
  };

  const deleteTodo = async (req, res) => {};

  const updateTodo = async (req, res) => {};

  const addTodo = async (req, res) => {
    const newTodo = req.body;

    const ok = await pgClient.createTodo(newTodo);

    if (ok) {
      console.log("successfully created todo");
      return res.status(201).json(newTodo);
    }

    console.log("There was a problem creating the todo");
    res.status(404).send();
  };

  return {
    toggleTodo,
    deleteTodo,
    updateTodo,
    addTodo,
  };
};
