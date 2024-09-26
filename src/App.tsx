import "bootstrap/dist/css/bootstrap.css";
import "react-datetime/css/react-datetime.css";
import { Offline, Online } from "react-detect-offline";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginComponents/LoginModal";
import Home from "./components/Home";
import { getDealershipList, isLogged } from "./components/Functions";
import SideBar from "./components/SideBar";
import { getCookie } from "typescript-cookie";
import Settings from "./components/SettingsComponents/Settings";
import Dashboard from "./components/Dashboard";
import Publish from "./components/PublishingComponents/Publish";
import "react-notifications-component/dist/theme.css";
import CreateDealershipModal from "./components/DealershipComponents/CreateDealershipModal";
import Dealerships from "./components/DealershipComponents/Dealerships";
import CustomerList from "./components/CustomersComponents/CustomerList";
import { ReactNotifications } from "react-notifications-component";
import DinoGame from "react-chrome-dino-ts";
import "react-chrome-dino-ts/index.css";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [dealershipInitialized, setDealershipInitialized] = useState(true);

  const scenes: Record<string, JSX.Element> = {
    dashboard: <Dashboard />,
    home: <Home />,
    settings: <Settings />,
    publish: <Publish />,
    dealerships: <Dealerships />,
    customers: <CustomerList />,
  };

  const getPreviousScene = () => {
    const cookie = getCookie("previousScene");
    if (typeof cookie === "undefined") {
      return "";
    }
    return cookie;
  };

  const [scene, setScene] = useState<string>(getPreviousScene());

  useEffect(() => {
    isLogged().then((result) => {
      setLogged(result);
      if (result) {
        getDealershipList().then((data) =>
          setDealershipInitialized(data.length > 0)
        );
      }
    });
  }, [logged]);

  return (
    <>
      <Online>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
        ></link>

        {logged ? (
          <div>
            <ReactNotifications />
            <SideBar setScene={setScene}>
              {dealershipInitialized ? (
                <div className="w-100">{scenes[scene]}</div>
              ) : (
                <CreateDealershipModal
                  setDealershipInitialized={setDealershipInitialized}
                  setScene={setScene}
                />
              )}
            </SideBar>
          </div>
        ) : (
          <LoginModal setLogged={setLogged} setScene={setScene} />
        )}
      </Online>
      <Offline>
        <DinoGame />
      </Offline>
    </>
  );
}
