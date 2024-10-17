import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import FacebookLogin from "../PublishingComponents/Socials/FacebookLogin";

interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function FacebookSetupModal({ setShowModal }: Props) {
  const [facebookValid, setFacebookValid] = useState(false);

  useEffect(() => {
    if (facebookValid) setShowModal(false);
  }, [facebookValid]);

  return (
    <Modal show backdrop="static" keyboard={false}>
      <Modal.Header>Configuration de Facebook</Modal.Header>
      <Modal.Body>
        <p>Cliquez ci-dessous pour configurer le Facebook.</p>
        <FacebookLogin setLoginSuccessful={setFacebookValid}></FacebookLogin>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setShowModal(false)}>Annuler</button>
      </Modal.Footer>
    </Modal>
  );
}
