import { GLOBAL_TYPES } from "../actions/globalTypes";

const confirmReducer = (state = {}, action) => {
  switch (action.type) {
    case GLOBAL_TYPES.ADD_CONFIRM:
      return action.payload;
    default:
      return state;
  }
};

export default confirmReducer;
