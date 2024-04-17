import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import Home from "./components/Home";
import { isLogged } from "./components/Functions";

export default function App() {
  const [logged, setLogged] = useState(true);

  useEffect(() => {
    isLogged().then((result) => setLogged(result));
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
      ></link>
      {!logged ? <LoginModal setLogged={setLogged} /> : null}
      <Home />
    </>
  );
}
