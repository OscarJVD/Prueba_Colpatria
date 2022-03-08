import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { getDataAPI } from "../utils/fetchData";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const DataProvider = ({ children }) => {

  // const initialState = {
  //   auth: {},
  //   tasks: [],
  // };
  
  // const { tasks, auth } = useSelector((state) => state);
  // const dispatch = useDispatch();

  // // TRAER CATEGORIAS Y MARCAS
  // useEffect(() => {
  //   getDataAPI("task/gettasks", auth.token).then((res) => {
  //     console.log(res)
      
  //     if (res.err)
  //       return dispatch({ type: "NOTIFY", payload: { error: res.err } }); // erro del back

  //     dispatch({
  //       type: "ADD_TASKS",
  //       payload: res.tasks,
  //     });
  //   });
  // }, [auth.token]);

  return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
