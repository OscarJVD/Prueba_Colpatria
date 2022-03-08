import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginAndRegister from "./pages/loginAndRegister";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { refreshToken } from "./redux/actions/authAction";
import Menu from "./components/base/Menu";
import PageRender from "./utils/customRouter/PageRender";
import PrivateRouter from "./utils/customRouter/PrivateRouter";
import { GLOBAL_TYPES } from "./redux/actions/globalTypes";
import { postDataAPI } from "./utils/fetchData";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    // dispatch(refreshToken());
    const firstSlidesLogin = localStorage.getItem("firstSlidesLogin");

    if (firstSlidesLogin) {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });
  
      try {
        const result = await postDataAPI("auth/refreshTkn");
  
        console.log(result);
  
        if (result)
          dispatch({
            type: GLOBAL_TYPES.LOGIN_USER,
            payload: { token: result.data.access_token, user: result.data.user },
          });
  
        dispatch({ type: GLOBAL_TYPES.ALERT, payload: {} });
      } catch (error) {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/"
        ) {
          console.log(GLOBAL_TYPES.ALERT);
  
          if (GLOBAL_TYPES.ALERT)
            dispatch({
              type: GLOBAL_TYPES.ALERT,
              payload: {
                error: error.response ? error.response : 'error',
              },
            });
        } else {
          dispatch({
            type: GLOBAL_TYPES.ALERT,
            payload: {},
          });
        }
      }
    }
  }, [
    dispatch
  ]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="container-fluid" id="wrapper">
          <div className="row newsfeed-size">
            <div className="col-md-12 newsfeed-right-side">
              {auth.token && <Menu />}

              <Route
                exact
                path="/"
                component={auth.token ? Home : LoginAndRegister}
              />

              <PrivateRouter
                exact
                path="/:username"
                component={auth.token ? PageRender : LoginAndRegister}
              />

              <PrivateRouter
                exact
                path="/:username/:id"
                component={auth.token ? PageRender : LoginAndRegister}
              />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
