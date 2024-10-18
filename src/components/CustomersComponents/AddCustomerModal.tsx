import { Dispatch, SetStateAction, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { getBasicFormData, notification } from "../Functions";
import { apiUrl } from "../basics";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import AddressAutocomplete from "../DealershipComponents/AddressAutocomplete";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function AddCustomerModal({ setShow }: Props) {
  /* CREATE TABLE customers (id int, fullname text, number text, address text, dealership int);*/
  const [fullname, setFullname] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAdress] = useState("");

  const onConfirmClick = () => {
    const formData = getBasicFormData();
    const dealership_id = getCookie("selected_dealership");
    if (typeof dealership_id !== "string") {
      console.log("dealership not initialized");
      return;
    }
    formData.append("customer", JSON.stringify([fullname, number, address]));
    formData.append("dealership_id", dealership_id);
    axios.post(apiUrl + "add_customer", formData).then((response) => {
      if (response.data.message === "fail")
        notification(
          "Ajout d'un client",
          "Il y a eu un probleme lors de l'ajout du client",
          "warning"
        );
      else {
        notification(
          "Ajout d'un client",
          "Client ajoute avec succes",
          "success"
        );
        setShow(false);
      }
    });
  };

  return (
    <Modal show={true} keyboard={false}>
      <Modal.Header>Ajouter un client</Modal.Header>
      <Modal.Body>
        <Form.Label>Nom complet</Form.Label>
        <Form.Control
          onChange={(event) => setFullname(event.target.value)}
        ></Form.Control>
        <Form.Label>Numero de telephone</Form.Label>
        <Form.Control
          onChange={(event) => setNumber(event.target.value)}
        ></Form.Control>
        <Form.Label>Adresse</Form.Label>
        <AddressAutocomplete setResult={setAdress} />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onConfirmClick}>Confirmer</button>
        <button onClick={() => setShow(false)}>Annuler</button>
      </Modal.Footer>
    </Modal>
  );
}
