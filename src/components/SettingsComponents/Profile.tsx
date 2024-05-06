import { confirmAlert } from "react-confirm-alert";
import { Button, Form } from "react-bootstrap";
import { removeCookie } from "typescript-cookie";

function confirmDisconnect() {
  const disconnect = () => {
    ["cookie", "username", "previousScene"].forEach((x) => removeCookie(x));
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
  return (
    <>
      <div className="m-3">
        <Form.Label>Setting random</Form.Label>
        <Form.Control defaultValue=""></Form.Control>
      </div>

      <Button onClick={confirmDisconnect} className="m-3 btn-dark">
        Déconnexion
      </Button>
    </>
  );
}
