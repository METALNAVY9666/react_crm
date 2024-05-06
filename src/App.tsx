import "bootstrap/dist/css/bootstrap.css";
import "react-datetime/css/react-datetime.css";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginComponents/LoginModal";
import Home from "./components/Home";
import { isLogged } from "./components/Functions";
import SideBar from "./components/SideBar";
import { getCookie } from "typescript-cookie";
import Settings from "./components/SettingsComponents/Settings";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [logged, setLogged] = useState(true);
  const [scene, setScene] = useState<string>(
    String(getCookie("previousScene"))
  );

  useEffect(() => {
    isLogged().then((result) => setLogged(result));
  }, []);

  console.log(getCookie("cookie"));

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      ></link>
      <SideBar scene={scene} setScene={setScene} logged={logged}>
        {!logged ? (
          <LoginModal setLogged={setLogged} setScene={setScene} />
        ) : null}
        {scene === "dashboard" ? <Dashboard /> : null}
        {scene === "home" ? <Home /> : null}
        {scene === "settings" ? <Settings /> : null}
      </SideBar>
    </>
  );
}
