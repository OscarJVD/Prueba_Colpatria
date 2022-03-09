import { getDataAPI } from "../../utils/fetchData";
import { GLOBAL_TYPES } from "./globalTypes";

export const TASK_TYPES = {
  LOADING: "LOADING",
  GET_TASK: "GET_TASK",
};

export const getTasks = ({ auth }) => async (dispatch) => {
  try {
    dispatch({ type: TASK_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`task/gettasks`, auth.token);

    console.log('task data', res.data);

    dispatch({ type: TASK_TYPES.GET_TASK, payload: res.data }); // seteo el estado global de las tareas
    dispatch({ type: TASK_TYPES.LOADING, payload: false });

    // return res
  } catch (error) {

    console.log(error)
    dispatch({
      type: GLOBAL_TYPES.ALERT,
      payload: {
        error: error.response.data.msg
          ? error.response.data.msg
          : error.response
      },
    });
  }
};
