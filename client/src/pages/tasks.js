import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";
import { getTasks, TASK_TYPES } from "../redux/actions/taskAction";
import { deleteDataAPI, getDataAPI, postDataAPI, putDataAPI } from "../utils/fetchData";

const Tasks = () => {

  const { auth } = useSelector((state) => state); // obtengo el estado global
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);

  const initState = {
    title: '',
    desc: '',
    status: ''
  };

  const [tsk, setTsk] = useState(initState);
  const { title, desc, status } = tsk; // content
  const [cancelUpdate, setCancelUpdate] = useState('d-none');

  const getTasksNow = async () => {
    dispatch({ type: TASK_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`task`, auth.token);
    console.log('task data', res.data);
    setTasks(res.data.tasks)
    dispatch({ type: TASK_TYPES.LOADING, payload: false });
  }

  useEffect(() => {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });
    getTasksNow()
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
  }, [dispatch, auth])

  // Cancelar o Terminar  Actualziación
  const cancelUpdated = () => {
    setTsk(initState)
    setIdTask('');
    setCancelUpdate('d-none');
  };

  // Crear o editar Tarea
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

    if (id && !status)
      return dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: 'El estado no puede quedar vacio' },
      });

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    let res;

    let newArr = [];
    if (id) { // editar
      res = await putDataAPI(`task/${id}`, { ...tsk }, auth.token);

      if (res.err)
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: res.err } }); // erro del back

      tasks.forEach(tk => {
        if (tk._id != id) newArr.push(tk)
        else newArr.push({
          ...tsk
        })
      })

      setTasks(newArr)
      getTasksNow()

    } else { // guardar
      res = await postDataAPI('task', { ...tsk }, auth.token);

      newArr = tasks
      newArr.push(tsk)

      setTasks(newArr)

      getTasksNow()
      if (res.err)
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: res.err } }); // erro del back
    }

    cancelUpdated();

    console.log('res', res)
    return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.msg } });
  };

  const [id, setIdTask] = useState('');

  // Editar Tarea
  const handleEditTask = (task) => {
    setIdTask(task._id);
    setTsk({ title: task.title, desc: task.desc, status: task.status })
    setCancelUpdate('d-inline');
  };

  const handleDeleteTask = async (task) => {
    let confirmDelete = window.confirm(`¿Confirmas eliminación de la tarea: "${task.title}"?`)

    if (confirmDelete) {
      let res = await deleteDataAPI(`task/${task._id}`, auth.token);

      if (res.err)
        return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: res.err } });

      let newArr = tasks
      newArr.forEach((tk, index) => {
        if (tk._id == task._id) newArr.splice(index, 1);
      })

      setTasks(newArr)
      getTasksNow()
      
      return dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: res.data.msg } });
    }

    return;

  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTsk({ ...tsk, [name]: value });
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">

            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title text-center">{id ? 'Editar' : 'Nueva'} tarea</h5>
                <p className="card-text">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" className="form-control" maxLength="50" id="title" placeholder="Ingrese un título"
                      value={title} name='title'
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Descripción</label>
                    <textarea placeholder="Ingrese una descripción" maxLength="100" className="form-control" id="desc" rows="3"
                      value={desc} name='desc'
                      onChange={handleChangeInput}
                    ></textarea>
                  </div>

                  <div className={`mb-3 ${id ? '' : 'd-none'}`}>
                    <div className="form-floating">
                      <select className="form-select px-2" id="status" name='status' value={status} onChange={handleChangeInput}>
                        <option className="px-2" value="">Seleccione...</option>
                        <option className="px-2" value="to do">Por hacer</option>
                        <option className="px-2" value="working">En proceso</option>
                        <option className="px-2" value="waiting">En espera</option>
                        <option className="px-2" value="done">Hecho</option>
                      </select>
                      <label htmlFor="desc" className="px-2">Estado</label>
                    </div>
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

              {tasks.map((tsk, index) => (
                <div className="card my-3" key={index}>
                  <h5 className="card-header text-center">{tsk.title}</h5>
                  <div className="card-body d-flex py-1">
                    <div className="container py-0">
                      <div className="row py-1">
                        <div className="col-md-10 py-0">
                          <p className="card-text fs-6">{tsk.desc}</p>
                        </div>
                        <div className="col-md-2 py-0 d-flex justify-content-end" style={{ height: '30px' }}>
                          <button type="button" className="btn btn-primary btn-sm h-auto float-right"
                            onClick={() => handleEditTask(tsk)}
                          >
                            <i className="fas fa-edit fa-sm"></i>
                          </button>
                          <button type="button" className="btn ms-2 btn-danger btn-sm h-auto"
                            onClick={() => {
                              handleDeleteTask(tsk);
                            }}
                          >
                            <i className="fas fa-trash fa-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
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
