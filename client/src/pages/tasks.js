import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";
import { getTasks } from "../redux/actions/taskAction";
import { postDataAPI, putDataAPI } from "../utils/fetchData";

const Tasks = () => {

  const { auth, task } = useSelector((state) => state); // obtengo el estado global
  const dispatch = useDispatch();
  // const [tasks, setTasks] = useState([]);
  // console.log(auth);

  // useEffect(() => {
  //   dispatch(getTasks({ auth })) // seteo el estado global
  //   // console.log();
  // }, [dispatch, auth])

  // dispatch, auth, getTasks

  // useEffect(() => {
  //   console.log(task.tasks);
  //   setTasks(task.tasks) // Seteto el estado local
  // }, [task])

  useEffect(() => {
    console.log('HOALAALALALALA')
    dispatch(getTasks({ auth })) // seteo el estado global
    // setTasks(task.tasks) // Seteto el estado local
  }, [dispatch, auth])

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cancelUpdate, setCancelUpdate] = useState('d-none');
  const [taskStr, setTaskStr] = useState('task');

  // Cancelar o Terminar  Actualziación
  const cancelUpdated = () => {
    setTitle('');
    setDesc('');
    setIdTask('');
    setCancelUpdate('d-none');
  };

  // Crear o editar Categoría
  const createTask = async () => {
    if (!auth.user)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: 'Autenticación Invalida' },
      });

    if (!title)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: 'El título no puede quedar vacío' },
      });

    if (!desc)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: 'La descripción no puede quedar vacía' },
      });

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    let res;

    if (id) {
      res = await putDataAPI(`task/${id}`, { title, desc }, auth.token);
      if (res.err)
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: res.err } }); // erro del back
      // dispatch(updateItem(categories, id, res.task, 'ADD_CATEGORIES'));
    } else {
      res = await postDataAPI('task', { title, desc }, auth.token);
      if (res.err)
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: res.err } }); // erro del back
      // dispatch({
      //   type: 'ADD_CATEGORIES',
      //   payload: [...categories, res.newTask],
      // });
    }

    cancelUpdated();

    return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.msg } });
  };

  const [id, setIdTask] = useState('');

  // Editar Categoría
  const handleEditTask = (task) => {
    setIdTask(task._id);
    setTitle(task.title);
    setDesc(task.desc);
    setCancelUpdate('d-inline');
  };

  const handleDeleteTask = (task) => {
    // setIdTask(task._id);
    // setTitle(task.title);
    // setDesc(task.desc);
    // setCancelUpdate('d-inline');
    window.prompt('sdflksjdfl')
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">

            <div className="card mt-5">
              <div className="card-body">
                <h5 className="card-title">Nueva tarea</h5>
                <p className="card-text">
                  <div class="mb-3">
                    <label for="title" class="form-label">Título</label>
                    <input type="text" class="form-control" id="title" placeholder="Ingrese un título"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="desc" class="form-label">Descripción</label>
                    <textarea placeholder="Ingrese una descripción" class="form-control" id="desc" rows="3"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                </p>

                <div className="d-flex justify-content-center">
                  <button className="btn btn-success" onClick={createTask}>
                    <i className={`fas fa-${id ? 'edit' : 'save'}`}></i> {id ? 'Actualizar' : 'Guardar'}
                  </button>

                  <button className={`btn ms-4 btn-danger ${cancelUpdate}`} onClick={cancelUpdated}>
                    <i className="fas fa-times"></i> Cancelar
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-6">
            <div className="tasks p-3 m-2">

              {task.tasks.map((tsk, index) => (
                <div className="card" key={index}>
                  <h5 className="card-header"></h5>
                  <div className="card-body d-flex">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    {/* <button type="button" className="btn btn-primary btn-sm h-auto"
                    onClick={() => handleEditTask(task)}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button type="button" className="btn ms-2 btn-danger btn-sm h-auto"
                    onClick={() => {
                      handleDeleteTask(task);
                      // dispatch({
                      //   type: 'ADD_CONFIRM',
                      //   payload: [
                      //     {
                      //       data: categories,
                      //       id: rowData._id,
                      //       title: rowData.name,
                      //       type: 'ADD_CATEGORIES',
                      //     },
                      //   ],
                      // });
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
