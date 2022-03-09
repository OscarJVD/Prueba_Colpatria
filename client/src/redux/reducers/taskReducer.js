import { TASK_TYPES } from "../actions/taskAction";

const initialState = {
  loading: false,
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASK_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case TASK_TYPES.GET_TASK:
      console.log(action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
      };
    default:
      return state;
  }
};

export default taskReducer;
