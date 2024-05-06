import { Dispatch, ReactNode, SetStateAction } from "react";
import { setCookie } from "typescript-cookie";
import imakiImage from "../assets/imaki.png";

interface Props {
  scene: string;
  setScene: Dispatch<SetStateAction<string>>;
  logged: boolean;
  children?: ReactNode;
}

export default function SideBar({ scene, setScene, logged, children }: Props) {
  const updateScene = (s: string) => {
    setCookie("previousScene", s);
    setScene(s);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-light sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
              <a
                className="d-block p-3 text-decoration-none link-dark"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (logged) {
                    updateScene("dashboard");
                  }
                }}
              >
                <img
                  src={imakiImage}
                  style={{ width: "80px" }}
                  className="rounded"
                />
              </a>
              <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <li className="nav-item">
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                    onClick={() => {
                      if (logged) {
                        updateScene("home");
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <i className={"bi-house fs-1"}></i>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Dashboard"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi-speedometer2 fs-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Orders"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi-table fs-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Products"
                    style={{ cursor: "pointer" }}
                  >
                    <i className="bi-heart fs-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    title="Équipe"
                    style={{ cursor: "pointer" }}
                    className="nav-link py-3 px-2 link-dark"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Customers"
                  >
                    <i className="bi-people fs-1"></i>
                  </a>
                </li>
              </ul>
              <div className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  title="Paramètres"
                  onClick={() => {
                    if (logged) {
                      updateScene("settings");
                    }
                  }}
                >
                  <i className="bi-person-circle h2" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm p-3 min-vh-100">{children}</div>
        </div>
      </div>
    </>
  );
}
