import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import { getBasicFormData, notification } from "../Functions";
import { apiUrl } from "../basics";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import AddressAutocomplete from "../DealershipComponents/AddressAutocomplete";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
  customer: Array<string>;
  reloadFunction: () => void;
}

export default function EditCustomerModal({
  setShow,
  customer,
  reloadFunction,
}: Props) {
  /* CREATE TABLE customers (id int, fullname text, number text, address text, dealership int);*/
  const [fullname, setFullname] = useState(customer[1]);
  const [number, setNumber] = useState(customer[2]);
  const [address, setAdress] = useState(customer[3]);
  const [changed, setChanged] = useState(false);

  const onConfirmClick = () => {
    const formData = getBasicFormData();
    const dealership_id = getCookie("selected_dealership");
    if (typeof dealership_id !== "string") {
      console.log("dealership not initialized");
      return;
    }
    formData.append(
      "customer",
      JSON.stringify([customer[0], fullname, number, address, dealership_id])
    );
    axios.post(apiUrl + "update_customer", formData).then((response) => {
      if (response.data.message === "fail")
        notification(
          "Modification du client",
          "Il y a eu un probleme lors de la modification du client",
          "warning"
        );
      else {
        notification(
          "Modification du client",
          "Client modifie avec succes",
          "success"
        );
        reloadFunction();
        setShow(false);
      }
    });
  };

  useEffect(() => {
    const vars = [fullname, address, number];
    vars.forEach((x, index) => {
      if (x != customer[index + 1]) {
        setChanged(true);
      }
    });
  }, [fullname, address, number]);

  return (
    <Modal show={true} keyboard={false}>
      <Modal.Header>Modifier un client</Modal.Header>
      <Modal.Body>
        <Form.Label>Nom complet</Form.Label>
        <Form.Control
          onChange={(event) => setFullname(event.target.value)}
          defaultValue={fullname}
        ></Form.Control>
        <Form.Label>Numero de telephone</Form.Label>
        <Form.Control
          onChange={(event) => setNumber(event.target.value)}
          defaultValue={number}
        ></Form.Control>
        <Form.Label>Adresse</Form.Label>
        <AddressAutocomplete setResult={setAdress} defaultValue={address} />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onConfirmClick} disabled={changed}>
          Confirmer
        </button>
        <button onClick={() => setShow(false)}>Annuler</button>
      </Modal.Footer>
    </Modal>
  );
}
