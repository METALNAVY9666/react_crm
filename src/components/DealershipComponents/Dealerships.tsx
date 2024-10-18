import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "../basics";
import { getBasicFormData, notification } from "../Functions";
import garageIcon from "../../assets/garage.svg";
import { Form, Row, Col } from "react-bootstrap";
import { updateDealership } from "../NetworkFunctions";

export default function Dealerships() {
  const [dealerships, setDealerships] = useState<Array<Array<any>>>([]);
  const [editIndex, setEditIndex] = useState(-1);

  const [siren, setSiren] = useState("");
  const [number, setNumber] = useState("");
  const [web, setWeb] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");

  const getters = [siren, number, web, mail, address];
  const setters = [setSiren, setNumber, setWeb, setMail, setAddress];

  const fields = [
    "Siren",
    "N° De téléphone",
    "Site Web",
    "Adresse Mail",
    "Adresse",
  ];

  useEffect(() => {
    axios
      .post(apiUrl + "get_dealerships", getBasicFormData())
      .then((response) => {
        setDealerships(response.data.data);
      });
  }, []);

  const handleDealershipSave = (dealershipIndex: number) => {
    const result: Array<string> = [];
    dealerships[dealershipIndex].forEach((x, index) => {
      if (index > 2) {
        if (getters[index - 3] != "") result.push(getters[index - 3]);
        else {
          result.push(x);
        }
      } else result.push(x);
    });
    updateDealership(result).then(() =>
      notification("Concession", "Concession mise a jour", "info")
    );
    setEditIndex(-1);
  };

  return (
    <>
      <h1 className="mb-5">
        <img src={garageIcon} height={64} width={64} className="me-3" />
        Concessions
      </h1>

      {dealerships.map((dealership, dealershipIndex) => (
        <div key={dealershipIndex} className="container border rounded">
          <h3 className="mt-2">{dealership[2]}</h3>
          <Row className="m-2">
            {dealership.slice(3).map((value, fieldIndex) => (
              <Col key={fieldIndex}>
                <h6>{fields[fieldIndex]}</h6>
                <Form.Control
                  defaultValue={value}
                  disabled={dealershipIndex != editIndex}
                  onChange={(event) => setters[fieldIndex](event.target.value)}
                ></Form.Control>
              </Col>
            ))}
          </Row>
          <div className="my-3">
            {dealershipIndex == editIndex ? (
              <button onClick={() => handleDealershipSave(dealershipIndex)}>
                Enregistrer
              </button>
            ) : (
              <button onClick={() => setEditIndex(dealershipIndex)}>
                Modifier
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
