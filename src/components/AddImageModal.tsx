import { Modal } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function AddImageModal({ setShow }: Props) {
  return (
    <>
      <Modal show={true} keyboard={false}>
        <Modal.Header>Ajouter une image</Modal.Header>
        <Modal.Body>fart</Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => {
              setShow(false);
            }}
          >
            Annuler
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
