import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import { TASK_TYPES } from "../../redux/actions/taskAction";
import { getDataAPI } from "../../utils/fetchData";

const Kanban = () => {

  const { auth } = useSelector((state) => state); // obtengo el estado global
  const dispatch = useDispatch();
  const [tasksToDo, setTasksToDo] = useState([]);
  const [tasksWorking, setTasksWorking] = useState([]);
  const [tasksWaiting, setTasksWaiting] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);

  const getTasksNow = async () => {
    dispatch({ type: TASK_TYPES.LOADING, payload: true });
    const res = await getDataAPI(`task`, auth.token);

    console.log('res.data.tasks', res.data.tasks);

    let arrTasksToDo = [], arrTasksWorking = [], arrTasksWaiting = [], arrTasksDone = [];

    res.data.tasks.forEach(tsk => {
      if (!tsk.status || tsk.status == 'to do') arrTasksToDo.push(tsk)
      else if (tsk.status == 'working') arrTasksWorking.push(tsk)
      else if (tsk.status == 'waiting') arrTasksWaiting.push(tsk)
      else if (tsk.status == 'done') arrTasksDone.push(tsk)
    })

    setTasksToDo(arrTasksToDo)
    setTasksWorking(arrTasksWorking)
    setTasksWaiting(arrTasksWaiting)
    setTasksDone(arrTasksDone)
    // setTasksToDo(res.data.tasks)
    dispatch({ type: TASK_TYPES.LOADING, payload: false });
  }

  useEffect(() => {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });
    getTasksNow()
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
  }, [dispatch, auth])

  return (
    <>
      <div className="container-fluid w-100 mb-5">
        <div className="row">
          <h1 className="text-center my-3">Tablero Kanban</h1>
        </div>
        <div className="row w-100 h-100">
          <div className="col-md-12 px-0 overflow-auto h-100">
            <table class="table-bordered table w-100 p-0 m-0 table-responsive overflow-auto h-100">
              <tbody className="align-middle text-center justify-content-center align-items-center overflow-auto">
                <tr className="border align-middle text-center justify-content-center align-items-center">
                  <th rowSpan={2} className="border border-5 border-start-0 border-bottom-0 border-end-0 border-primary border-top align-middle text-center justify-content-center align-items-center text-primary">
                    <span className="h-100 w-100 m-auto">
                      Por hacer
                    </span>
                  </th>
                  <th colSpan={2} className="border border-5 border-start-0 border-bottom-0 border-end-0 border-warning border-top align-middle text-center justify-content-center align-items-center text-warning">
                    <span className="h-100 w-100 m-auto">
                      En progreso
                    </span>
                  </th>
                  <th rowSpan={2} className="border border-5 border-start-0 border-bottom-0 border-end-0 border-success border-top align-middle text-center justify-content-center align-items-center text-success">
                    <span className="h-100 w-100 m-auto">
                      Hecho
                    </span>
                  </th>
                </tr>
                <tr>
                  <th className="align-middle text-center justify-content-center align-items-center">En proceso</th>
                  <th className="align-middle text-center justify-content-center align-items-center">En espera</th>
                  <th className="align-middle text-center justify-content-center align-items-center"></th>
                  <th className="align-middle text-center justify-content-center align-items-center"></th>
                </tr>
                <tr className="w-100 overflow-auto py-0 my-0">
                  <th className="border border-bottom-0 py-0 my-0">

                    {tasksToDo.map((tsk, index) => (
                      <div className="card shadow card-header p-2 m-2" key={index}>
                        <h5 className="card-header text-center mt-1 fs-6">{tsk.title}</h5>
                        <div className="card-body px-0 d-flex py-1">
                          <div className="container-fluid px-0 mx-0">
                            <div className="row w-100 mx-0 px-0">
                              <div className="col-md-12 py-0 px-0 mx-0 w-100">
                                <div className="card-body card d-flex mt-2 py-1 w-100">
                                  <p className="card-text fs-6 fw-normal w-100">{tsk.desc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </th>

                  <th className="border border-left-0 border-bottom-0">
                    {tasksWorking.map((tsk, index) => (
                      <div className="card shadow card-header p-2 m-2" key={index}>
                        <h5 className="card-header text-center mt-1 fs-6">{tsk.title}</h5>
                        <div className="card-body px-0 d-flex py-1">
                          <div className="container-fluid px-0 mx-0">
                            <div className="row w-100 mx-0 px-0">
                              <div className="col-md-12 py-0 px-0 mx-0 w-100">
                                <div className="card-body card d-flex mt-2 py-1 w-100">
                                  <p className="card-text fs-6 fw-normal w-100">{tsk.desc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </th>

                  <th className="border border-left-0 border-bottom-0">
                    {tasksWaiting.map((tsk, index) => (
                      <div className="card shadow card-header p-2 m-2" key={index}>
                        <h5 className="card-header text-center mt-1 fs-6">{tsk.title}</h5>
                        <div className="card-body px-0 d-flex py-1">
                          <div className="container-fluid px-0 mx-0">
                            <div className="row w-100 mx-0 px-0">
                              <div className="col-md-12 py-0 px-0 mx-0 w-100">
                                <div className="card-body card d-flex mt-2 py-1 w-100">
                                  <p className="card-text fs-6 fw-normal w-100">{tsk.desc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </th>

                  <th className="border border-left-0 border-bottom-0">
                    {tasksDone.map((tsk, index) => (
                      <div className="card shadow card-header p-2 m-2" key={index}>
                        <h5 className="card-header text-center mt-1 fs-6">{tsk.title}</h5>
                        <div className="card-body px-0 d-flex py-1">
                          <div className="container-fluid px-0 mx-0">
                            <div className="row w-100 mx-0 px-0">
                              <div className="col-md-12 py-0 px-0 mx-0 w-100">
                                <div className="card-body card d-flex mt-2 py-1 w-100">
                                  <p className="card-text fs-6 fw-normal w-100">{tsk.desc}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Kanban