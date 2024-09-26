import { Dispatch, ReactNode, SetStateAction } from "react";
import { setCookie } from "typescript-cookie";
import imakiImage from "../assets/imaki.png";
import { CarFront } from "react-bootstrap-icons";
import garageImage from "../assets/garage.svg";

interface Props {
  setScene: Dispatch<SetStateAction<string>>;
  children?: ReactNode;
}

const titles: Record<string, string> = {
  home: "Véhicules",
  settings: "Paramètres",
  customers: "Clients",
  dealerships: "Concessions",
  publish: "Publication",
  dashboard: "Accueil",
};

export default function SideBar({ setScene, children }: Props) {
  const updateScene = (s: string) => {
    document.title = "IMAKI - " + titles[s];
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
                className="d-block p-3 text-decoration-none link-dark rounded"
                title="Accueil"
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
                style={{ cursor: "pointer" }}
                onClick={() => updateScene("dashboard")}
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
                    title="Véhicules"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                    onClick={() => updateScene("home")}
                    style={{ cursor: "pointer" }}
                  >
                    <CarFront className="fs-1" />
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title="Concessions"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Dashboard"
                    style={{ cursor: "pointer" }}
                    onClick={() => updateScene("dealerships")}
                  >
                    <img src={garageImage} width={32} height={32} />
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title="Prospection"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Orders"
                    style={{ cursor: "pointer" }}
                    onClick={() => updateScene("customers")}
                  >
                    <i className="bi-chat fs-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    className="nav-link py-3 px-2 link-dark"
                    title="Multi-publier"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Products"
                    style={{ cursor: "pointer" }}
                    onClick={() => updateScene("publish")}
                  >
                    <i className="bi-globe fs-1"></i>
                  </a>
                </li>
                <li>
                  <a
                    title="Équipe"
                    style={{ cursor: "pointer" }}
                    className="nav-link py-3 px-2 link-dark"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Équipe"
                  >
                    <i className="bi-people fs-1"></i>
                  </a>
                </li>
              </ul>
              <div className="nav-item">
                <a
                  style={{ cursor: "pointer" }}
                  title="Paramètres"
                  onClick={() => updateScene("settings")}
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
