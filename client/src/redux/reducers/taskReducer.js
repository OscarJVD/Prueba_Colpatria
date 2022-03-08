import { GLOBAL_TYPES } from "../actions/globalTypes";

const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.TASK:
      return action.payload;
    default:
      return state;
  }
};

export default taskReducer;
