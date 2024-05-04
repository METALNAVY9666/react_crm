import { useState, ChangeEvent } from "react";
import axios from "axios";
import { getCookie, setCookie } from "typescript-cookie";
import { sha256 } from "js-sha256";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { apiUrl } from "./basics";

// https://react-bootstrap.netlify.app/docs/components/modal/
// https://www.npmjs.com/package/js-sha256

interface Props {
  setLogged: (value: boolean) => void;
}

export default function LoginModal(props: Props) {
  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // gestion majs
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(sha256.create().update(event.currentTarget.value).hex());
  };

  // gestion fermeture
  const handleClose = () => setShow(false);

  // gestion connexion
  const handleLogin = () => {
    setMsg("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axios.post(apiUrl + "login", formData).then((response) => {
      setMsg(response.data.message);
      if (response.data.message === "Authentification réussie") {
        props.setLogged(true);
        setCookie("cookie", response.data.cookie);
        setCookie("username", username);
      } else {
        props.setLogged(false);
      }
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Veuillez vous connecter</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Label htmlFor="inputUsername">Nom d'utilistaeur</Form.Label>
          <Form.Control
            type="username"
            id="inputUsername"
            onChange={handleUsernameChange}
            defaultValue={getCookie("username")}
          />

          <Form.Label htmlFor="inputPassword">Password</Form.Label>
          <Form.Control
            type="password"
            id="inputPassword"
            onChange={handlePasswordChange}
          />

          <div id="passwordMessage" className="mt-3">
            {msg}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button
            id="exit-btn"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Mot de passe oublié
          </button>
          <button id="login-btn" className="btn" onClick={handleLogin}>
            Se connecter
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
