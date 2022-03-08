import { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { postDataAPI, putDataAPI } from '../utils/fetchData';
import Notfound from '../components/NotFound';
import { getEsDate } from '../utils/functions';
import { useSelector, useDispatch } from 'react-redux';
import MTable from '../components/table/MTable';
import { updateTask } from '../redux/actions/taskAction';
import ConfirmMsg from '../components/alert/ConfirmMsg';

const Tasks = () => {
  const [title, setTitle] = useState('');
  const [cancelUpdate, setCancelUpdate] = useState('d-none');
  const { tasks, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [taskStr, setTaskStr] = useState('task');

  // Cancelar o Terminar  Actualziación
  const cancelUpdated = () => {
    setTitle('');
    setId('');
    setCancelUpdate('d-none');
  };

  // Crear o editar Tarea
  const createTask = async () => {
    if (!auth.user)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'Autenticación Invalida' },
      });

    if (!title)
      return dispatch({
        type: 'NOTIFY',
        payload: { error: 'El nombre no puede quedar vacío' },
      });

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    let res;

    if (id) {
      res = await putDataAPI(`task/${id}`, { title }, auth.token);
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } }); // erro del back
      dispatch(updateTask(tasks, id, res.task, 'ADD_CATEGORIES'));
    } else {
      res = await postDataAPI('task', { title }, auth.token);
      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } }); // erro del back
      dispatch({
        type: 'ADD_CATEGORIES',
        payload: [...tasks, res.newTask],
      });
    }

    cancelUpdated();

    return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
  };

  // Editar Tarea
  const [id, setId] = useState('');
  const handleEditTask = (task) => {
    setId(task._id);
    setTitle(task.title);
    setCancelUpdate('d-inline');
  };

  // Confirmación de acción
  const [isOpen, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true)
  const handleDialogClose = () => setOpen(false)

  if (!auth.user) return <Notfound />;

  return (
    <>
      <div className='container my-5'>
        <div className='row justify-content-center'>
          <div className='order-summary col-md-4'>
            <div className='wrap-login-item'>
              <div className='login-form form-item form-stl'>
                <fieldset className='wrap-title text-center'>
                  <h1 className='form-title text-lg py-1 text-center text-uppercase'>
                    Tarea
                  </h1>
                </fieldset>

                <fieldset className='wrap-input'>
                  <label htmlFor='name'>Título</label>

                  <input
                    type='text'
                    id='title'
                    placeholder='Título'
                    className='form-control'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>

                <div className='text-center'>
                  <button
                    type='button'
                    className='btn mt-3 d-inline'
                    onClick={createTask}>
                    {id ? 'Actualizar' : 'Guardar'}
                  </button>

                  <button
                    type='button'
                    className={`btn mt-3 mx-2 ${cancelUpdate}`}
                    onClick={cancelUpdated}>
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <MTable
              title={<h3 className='text-uppercase'>Tareas</h3>}
              data={tasks}
              columns={[
                {
                  title: '#',
                  field: '_id',
                  defaultSort: 'desc'
                },

                { title: 'Título', field: 'title' },
                {
                  title: '',
                  field: 'title',
                  render: (rowData) => (
                    <>
                      <EditIcon
                        className='cursor-pointer'
                        onClick={() => handleEditTask(rowData)}
                        title='Editar Tarea'
                        color='primary'
                      />

                      <DeleteIcon
                        className='cursor-pointer'
                        title='Eliminar Tarea'
                        color='secondary'
                        onClick={() => {
                          handleClickOpen();
                          dispatch({
                            type: 'ADD_CONFIRM',
                            payload: [
                              {
                                data: tasks,
                                id: rowData._id,
                                title: rowData.title,
                                type: 'ADD_CATEGORIES',
                              },
                            ],
                          });
                        }}
                      />
                    </>
                  ),
                },
              ]}
              grouping={false}
              detailPanel={(rowData) => (
                <>
                  <table className='table table-striped table-responsive text-center'>
                    <thead>
                      <tr>
                        <th scope='col'>Fecha creación</th>
                        <th scope='col'>Fecha actualización</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>{getEsDate(rowData.createdAt)}</th>
                        <th>{getEsDate(rowData.updatedAt)}</th>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
            />
          </div>
        </div>
      </div>

      <ConfirmMsg
        isOpen={isOpen}
        handleClose={handleDialogClose}
        subtitle='¿Quieres borrar la tarea?'
      />
    </>
  );
};

export default Tasks;
