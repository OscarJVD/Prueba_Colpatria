export const TASK_TYPES = {
  ADD_TASKS: "ADD_TASKS",
};

// QUITAR SOLO UN ARTICULO DEL CARRITO
export const deleteTask = (globalStateData, id, type) => {
  const newData = globalStateData.filter((item) => item._id !== id);
  return { type, payload: newData };
};

// Actualiza la info del elemento por id que se le pasa con res.result (FETCH)
export const updateTask = (
  globalStateData,
  id,
  backendResultToUpdateView,
  type
) => {
  const newData = globalStateData.map((item) =>
    item._id === id ? backendResultToUpdateView : item
  );
  return { type, payload: newData };
};
