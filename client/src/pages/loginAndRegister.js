import React, { useState, useRef, useEffect } from "react";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { loginUser, registerUser } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { isEmailTelOrUserName } from "../utils/functions";
import { GLOBAL_TYPES } from "../redux/actions/globalTypes";
import { postDataAPI } from "../utils/fetchData";

const LoginAndRegister = () => {
  const dispatch = useDispatch();

  // EYE ICON
  let inputRef = useRef();
  let newpassRef = useRef();

  const showIcon = () => (
    <i className="fas fa-eye pointer" aria-hidden="true"></i>
  );

  const hideIcon = () => (
    <i className="fas fa-eye-slash pointer" aria-hidden="true"></i>
  );
  // END EYE ICON

  const loginState = { username_email_or_mobile_login: "", password: "" };
  const [loginData, setLoginData] = useState(loginState);
  const { username_email_or_mobile_login, password } = loginData;

  const handleChangeInputsLogin = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();

    const login = isEmailTelOrUserName(username_email_or_mobile_login);

    if (!username_email_or_mobile_login || !password) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Llena todos los campos." },
      });
    }

    if (login === "error") {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Verifica tu usuario, correo o móvil" },
      });
    }

    if (login === "usernameerror") {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Tu nombre de usuario debe tener letras." },
      });
    }

    try {

      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

      const result = await postDataAPI("auth/login", loginData);

      console.log(result);

      dispatch({
        type: GLOBAL_TYPES.LOGIN_USER,
        payload: { token: result.data.access_token, user: result.data.user },
      });

      localStorage.setItem("firstSlidesLogin", true);

      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: {}
      });

      // console.log(result);
      // console.log(user);
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
    // dispatch(loginUser(loginData));
  };

  // REGISTER
  const { auth } = useSelector((state) => state);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);

  const registerState = {
    firstname: "",
    lastname: "",
    username_email_or_mobile_register: "",
    new_password: "",
    gender: "male",
  };

  const [registerData, setRegisterData] = useState(registerState);

  const {
    firstname,
    lastname,
    username_email_or_mobile_register,
    new_password,
  } = registerData;

  const handleChangeInputsRegister = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    const login = isEmailTelOrUserName(username_email_or_mobile_register);

    if (
      !firstname ||
      !lastname ||
      !username_email_or_mobile_register ||
      !new_password
    ) {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Llena todos los campos." },
      });
    }

    if (login == "error") {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Verifica tu usuario, correo o móvil" },
      });
    }

    if (login == "usernameerror") {
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: "Tu nombre de usuario debe tener letras." },
      });
    }

    // dispatch(registerUser(registerData));
    try {

      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

      const result = await postDataAPI("auth/register", registerData);

      // console.log(result);

      dispatch({
        type: GLOBAL_TYPES.LOGIN_USER,
        payload: { token: result.data.access_token, user: result.data.user },
      });

      localStorage.setItem("firstSlidesLogin", true);

      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { success: result.data.msg },
      });

      window.location.reload();
    } catch (error) {
      console.log(error);
      dispatch({
        type: GLOBAL_TYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
    // document.getElementById('btnCloseModal').click();
  };
  // END REGISTER

  return (
    <div>
      {/* LOGIN */}
      <div className="row ht-100v flex-row-reverse no-gutters">
      <div className="col-md-6 border-danger border-left shadow-lg d-flex justify-content-center align-items-center bg-dark">
          <div className="auth-left-content mt-5 mb-5">
            <div className="mt-5 mb-5">
              <h1 className="border-bottom text-left display-1 create-account mb-3 auth-txt-logo fw-bolderer fs-big">
                Colpatria
              </h1>
              <h3 className="text-left fw-normal text-white">
                Prueba Colpatria | Sophos Solutions
              </h3>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="signup-form">
            <div className="auth-logo text-center mb-5">
              <div className="row">
                <div className="col-md-12">
                  <img
                    src="/favicon_logos/sophos.ico"
                    className="logo-img"
                    alt="Logo"
                    width="50"
                  />
                </div>
                {/* <div className="col-md-10">
                  <p>Argon Social Network</p>
                  <span>Design System</span>
                </div> */}
              </div>
            </div>
            <form onSubmit={loginSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      onChange={handleChangeInputsLogin}
                      className="form-control"
                      // {...register("username_email_or_mobile_login")}
                      placeholder="Usuario, correo o teléfono"
                      id="username_email_or_mobile_login"
                      name="username_email_or_mobile_login"
                      value={username_email_or_mobile_login}
                    />
                    {/* {errors.username_email_or_mobile_login && (
                      <p>El usuario, correo teléfono es requerido</p>
                    )} */}
                  </div>
                </div>
                <div className="col-md-12 mt-2">
                  <div className="form-group">
                    <div className="position-relative">
                      <input
                        ref={inputRef}
                        type="password"
                        onChange={handleChangeInputsLogin}
                        className="form-control"
                        placeholder="Contraseña"
                        id="password"
                        name="password"
                        value={password}

                      />

                      <ReactPasswordToggleIcon
                        inputRef={inputRef}
                        // style={{ height: "120px" }}
                        showIcon={showIcon}
                        hideIcon={hideIcon}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="col-md-6">
                  <label className="custom-control material-checkbox">
                    <input type="checkbox" className="material-control-input" />
                    <span className="material-control-indicator"></span>
                    <span className="material-control-description">
                      Remember Me
                    </span>
                  </label>
                </div> */}
                <div className="col-md-12 mt-3 text-center">
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary sign-up w-50"
                      disabled={
                        username_email_or_mobile_login && password
                          ? false
                          : true
                      }
                    >
                      Ingresar
                    </button>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <hr />
                  <button
                    type="button"
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Crear usuario
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        className="modal fade fingerprint-modal"
        id="fingerprintModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="fingerprintModalLabel"
        aria-hidden="true"
      >
        
      </div>
      {/* END LOGIN */}

      {/* REGISTER MODAL */}
      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="p-0 m-0" id="registerModalLabel">
                  Registrarte
                </h3>
                <h6 className="fw-normal">Es fácil y rápido.</h6>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                id="btnCloseModal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={registerSubmit}>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control"
                        placeholder="Nombre"
                        id="firstname"
                        name="firstname"
                        value={firstname}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Apellidos"
                        id="lastname"
                        name="lastname"
                        value={lastname}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        onChange={handleChangeInputsRegister}
                        className="form-control "
                        placeholder="Nombre de usuario, correo o móvil"
                        id="username_email_or_mobile_register"
                        name="username_email_or_mobile_register"
                        value={username_email_or_mobile_register}
                      />
                    </div>
                  </div>
                  <div className="row my-3">
                    <div className="col-md-12">
                      <div className="form-group">
                        <div className="position-relative">
                          <input
                            ref={newpassRef}
                            type="password"
                            onChange={handleChangeInputsRegister}
                            className="form-control "
                            placeholder="Contraseña nueva"
                            id="new_password"
                            name="new_password"
                            value={new_password}
                          />

                          <ReactPasswordToggleIcon
                            inputRef={newpassRef}
                            // style={{ height: "120px" }}
                            showIcon={showIcon}
                            hideIcon={hideIcon}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h5 className="text-sm">
                          <small className="text-sm">Género</small>
                        </h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-check pointer">
                          <input
                            className="form-check-input pointer"
                            type="radio"
                            name="gender"
                            id="manRadio"
                            value="male"
                            defaultChecked
                            onChange={handleChangeInputsRegister}
                          />
                          <label
                            className="form-check-label pointer"
                            htmlFor="manRadio"
                          >
                            Hombre
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check pointer">
                          <input
                            className="form-check-input pointer"
                            type="radio"
                            name="gender"
                            id="womanRadio"
                            value="female"
                            onChange={handleChangeInputsRegister}
                          />
                          <label
                            className="form-check-label pointer"
                            htmlFor="womanRadio"
                          >
                            Mujer
                          </label>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-check pointer">
                          <input
                            className="form-check-input pointer"
                            type="radio"
                            name="gender"
                            id="otherRadio"
                            value="other"
                            onChange={handleChangeInputsRegister}
                          />
                          <label
                            className="form-check-label pointer"
                            htmlFor="otherRadio"
                          >
                            Otro
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-success text-capitalize">
                  Registrarte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* END REGISTER MODAL */}
    </div>
  );
};

export default LoginAndRegister;