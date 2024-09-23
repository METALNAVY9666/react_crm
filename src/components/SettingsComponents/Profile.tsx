import { confirmAlert } from "react-confirm-alert";
import { Button, Form } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";
import { DoorClosed, DoorOpen } from "react-bootstrap-icons";
import { useState } from "react";

function confirmDisconnect() {
  const disconnect = () => {
    ["cookie", "username", "previousScene", "selected_dealership"].forEach(
      (x) => removeCookie(x)
    );
    window.location.reload();
  };

  confirmAlert({
    title: "Déconnexion",
    message: "Êtes-vous sûr de vouloir vous déconnecter ?",
    closeOnEscape: false,
    closeOnClickOutside: false,
    buttons: [
      {
        label: "Oui",
        onClick: disconnect,
      },
      {
        label: "Non",
        onClick: () => {},
      },
    ],
  });
}

export default function Profile() {
  const [disconnectMouseHover, setDisconnectMouseHover] = useState(false);

  return (
    <>
      <div className="m-3">
        <Form.Label>Setting random</Form.Label>
        <Form.Control defaultValue=""></Form.Control>
      </div>

      <Button
        onClick={confirmDisconnect}
        className="m-3 btn-dark"
        onMouseEnter={() => setDisconnectMouseHover(true)}
        onMouseLeave={() => setDisconnectMouseHover(false)}
      >
        {disconnectMouseHover ? (
          <DoorOpen className="me-1" />
        ) : (
          <DoorClosed className="me-1" />
        )}
        Déconnexion
      </Button>
    </>
  );
}
