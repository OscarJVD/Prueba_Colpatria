import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBAL_TYPES } from "../../redux/actions/globalTypes";
import Tooltip from "react-simple-tooltip";

const Menu = () => {
  // const darkModeRef = useRef();

  const { auth, theme } = useSelector((state) => state);
  const [showSettings, setShowSettings] = useState(" ");
  const [showMsgs, setShowMsgs] = useState(" ");
  const dispatch = useDispatch();

  // console.log(auth)

  // const alternateTheme = () => {
  //   // document.getElementById('themePoint').click();
  //   darkModeRef.current.click()

  //   dispatch({ type: GLOBAL_TYPES.ALERT, payload: !theme })
  //   // onClick={() => dispatch({type: GLOBAL_TYPES.THEME, payload: !theme})}
  // }

  return (
    <>
      <nav
        id="navbar-main"
        className="navbar navbar-expand-lg shadow-sm sticky-top"
      >
        <div className="w-100 justify-content-md-center">
          {/* <ul className="nav navbar-nav enable-mobile px-2">
            <li className="nav-item">
              <button type="button" className="btn nav-link shadow-none">
                <i className="fas fa-plus text-dark fa-lg "></i>
              </button>
            </li>
          </ul> */}

          <ul className="navbar-nav mr-5 flex-row align-items-center" id="main_menu">
            <Tooltip content="Kanban" placement="right">
              <Link className="navbar-brand nav-item mr-lg-5" to="/home">
                <img
                  src="/favicon_logos/sophos.ico"
                  width="40"
                  height="40"
                  className="mr-3"
                  alt="Logo"
                />
              </Link>
            </Tooltip>

            <li className="nav-item s-nav nav-icon d-flex align-items-center justify-content-center text-center d-mobile">
              <Tooltip content="Tareas" placement="bottom">
                <Link
                  to="tasks"
                  className="nav-link nav-icon nav-links drop-w-tooltip"
                  data-toggle="dropdown"
                  data-placement="bottom"
                  data-title="Create"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-folder-plus text-primary"></i> <span className="fs-5 fw-bold">Mis tareas</span>
                </Link>
              </Tooltip>
            </li>

            <li className="nav-item s-nav nav-icon d-mobile d-flex align-items-center justify-content-center text-center">
              <Tooltip
                content={auth.user.firstname}
                placement="bottom"
                style={{ fontSize: "1rem" }}
              >
                <a
                  data-title={auth.user.firstname}
                  className="nav-link settings-link rm-drop-mobile drop-w-tooltip rounded-pill "
                >
                  <div className="menu-user-image">
                    {/* PROFILE PHOTO */}
                    <img
                      src={
                        auth.user.avatar
                          ? auth.user.avatar
                          : "https://res.cloudinary.com/solumobil/image/upload/v1639261011/user/icons8-usuario-masculino-en-c%C3%ADrculo-96_ipicdt.png"
                      }
                      style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
                      className="menu-user-img ml-1 nav-settings"
                      alt="Foto de perfil en Prueba Colpatria | Sophos Solutions"
                    />
                  </div>
                  <span className="pointer text-dark fs-6 fw-bold m-1">
                    {auth.user.firstname}
                  </span>
                </a>
              </Tooltip>
            </li>

            <li className="nav-item s-nav nav-icon dropdown" style={{ position: "relative", display: 'flex', justifyContent: "center", alignItems: "center" }}>
              {/* BTN DROPDOWN SETTINGS AVATAR */}
              <a
                href="#"
                onClick={() =>
                  setShowSettings(showSettings == "show" ? " " : "show")
                }
                data-toggle="dropdown"
                data-placement="bottom"
                data-title="Settings"
                className="nav-link settings-link rm-drop-mobile drop-w-tooltip rounded-circle bg-shadow"
                style={{ height: "3rem", width: "3rem", display: "inherit", position: "relative", justifyContent: "center", text: "center", alignItems: 'center' }}
                id="settings-dropdown"
              >
              </a>

              <i
                onClick={() =>
                  setShowSettings(showSettings == "show" ? " " : "show")
                }
                className="fas fa-sort-down bg-shadow-icon text-dark fa-sm pointer"
                style={{ top: '0.6rem', position: 'absolute' }}
              ></i>
              {/* END BTN DROPDOWN SETTINGS AVATAR */}

              <div
                className={`dropdown-menu dropdown-menu-right settings-dropdown shadow-sm ${showSettings}`}
                aria-labelledby="settings-dropdown"
              >
                <a
                  className="dropdown-item d-table align-items-center dark-mode"
                  href="#"
                >
                  <div className="d-inline pointer">
                    <label
                      htmlFor="theme"
                      onClick={() =>
                        dispatch({
                          type: GLOBAL_TYPES.THEME,
                          payload: !theme,
                        })
                      }
                      className="pointer"
                    >
                      {theme ? "Modo Claro" : "Modo Oscuro"}
                    </label>
                  </div>
                </a>
                <Link
                  className="dropdown-item logout-btn"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  Salir
                </Link>
              </div>
            </li>

            {/* <button
              type="button"
              className="btn border-0 nav-link shadow-none"
              id="menu-toggle"
            >
              <i className="fas fa-bars text-dark fa-lg fw-bold"></i>
            </button> */}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
