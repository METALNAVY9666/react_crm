import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { setCookie } from "typescript-cookie";
import { apiUrl } from "../basics";
import { getBasicFormData, notification } from "../Functions";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function SelectDealershipModal({ setShow }: Props) {
  const [dealerships, setDealerships] = useState<Array<Array<any>>>([]);

  const selectAndLeave = (id: number) => {
    setCookie("selected_dealership", id);
    notification(
      "Concessions",
      "Vous avez sélectionné la concession " +
        dealerships.filter((dealership) => dealership[0] == id)[0][2],
      "info"
    );
    setShow(false);
  };

  useEffect(() => {
    axios
      .post(apiUrl + "get_dealerships", getBasicFormData())
      .then((response) => {
        setDealerships(response.data.data);
      });
  }, []);

  return (
    <Modal show={true} keyboard={false}>
      <Modal.Header>Choisir une concession</Modal.Header>
      <Modal.Body>
        {dealerships.map((dealership, key) => (
          <div key={key}>
            <button onClick={() => selectAndLeave(dealership[0])}>
              <h5>{dealership[2]}</h5>
              <small>{dealership[7]}</small>
            </button>
            <br />
          </div>
        ))}
      </Modal.Body>
    </Modal>
  );
}
