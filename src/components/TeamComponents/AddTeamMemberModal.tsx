import { useState } from "react";
import { Form, Modal } from "react-bootstrap";

export default function AddTeamMemberModal() {
  const [hidden, setHidden] = useState(false);

  return (
    <Modal
      show={true}
      backdrop={hidden ? false : "static"}
      keyboard={false}
      style={{ visibility: hidden ? "hidden" : "visible" }}
    >
      <Modal.Header>
        Veuillez renseigner votre concession automobile
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
