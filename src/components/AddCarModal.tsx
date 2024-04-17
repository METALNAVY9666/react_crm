import { Modal, Form } from "react-bootstrap";
import { Dispatch, SetStateAction, useState } from "react";
import { apiUrl } from "./basics";
import "react-confirm-alert/src/react-confirm-alert.css";
import SearchBox from "./SearchBox";
import { brands, fuels } from "./consts";
import axios from "axios";
import { getBasicFormData } from "./Functions";
import { Plate } from "./Plate";
import { confirmAlert } from "react-confirm-alert";

interface Props {
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function AddCarModal({ setShow }: Props) {
  const [hidden, setHidden] = useState(false);

  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [price, setPrice] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState();

  const [models, setModels] = useState<Array<string>>([]);

  const addCar = () => {
    const car = [
      plate,
      owner,
      brand,
      model,
      year,
      fuel,
      price,
      kilometers,
      0, // dealership id
      description,
    ];

    const form = getBasicFormData();
    form.append("car", JSON.stringify(car));
    axios
      .post(apiUrl + "add_car", form)
      .then((response) => console.log(response.data));
  };

  return (
    <>
      <Modal
        show={true}
        backdrop={hidden ? false : "static"}
        keyboard={false}
        style={{ visibility: hidden ? "hidden" : "visible" }}
      >
        <Modal.Header>
          Ajouter un véhicule <Plate plate={plate}></Plate>
        </Modal.Header>

        <Modal.Body>
          <Form.Label>Plaque</Form.Label>
          <Form.Control
            onChange={(e) => {
              setPlate(e.target.value.toUpperCase());
            }}
          ></Form.Control>

          <Form.Label>Propriétaire</Form.Label>
          <Form.Control
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          ></Form.Control>

          <SearchBox
            title="Marque"
            ogArray={brands}
            parentUpdateMethod={(value: string) => {
              setBrand(value);
              const formData = getBasicFormData();
              formData.append("brand", value.toUpperCase());
              axios.post(apiUrl + "modeles", formData).then((response) => {
                setModels(response.data.data);
                console.log(response.data.data);
              });
              setBrand(value);
            }}
          ></SearchBox>

          {brand.length > 0 ? (
            <SearchBox
              title="Modèle"
              ogArray={models}
              parentUpdateMethod={(value: string) => {
                setModel(value);
              }}
            ></SearchBox>
          ) : null}

          <Form.Label>Année</Form.Label>
          <Form.Control
            onChange={(e) => setYear(e.target.value)}
          ></Form.Control>

          <SearchBox
            ogArray={fuels}
            title="Carburant"
            parentUpdateMethod={(value: string) => {
              setFuel(value);
            }}
          ></SearchBox>

          <Form.Label>Prix</Form.Label>
          <Form.Control
            onChange={(e) => setPrice(parseInt(e.target.value))}
          ></Form.Control>

          <Form.Label>Kilometrage</Form.Label>
          <Form.Control
            onChange={(e) => setKilometers(parseInt(e.target.value))}
          ></Form.Control>

          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>

          <Form.Group controlId="formFileMultiple" className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages((e.target as HTMLInputElement).files)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={addCar}>Ajouter</button>
          <button
            onClick={() => {
              setHidden(true);
              confirmAlert({
                title: "Annuler l'ajout du véhicule",
                message: "Êtes-vous sûr ?",
                closeOnEscape: false,
                closeOnClickOutside: false,
                buttons: [
                  {
                    label: "Oui",
                    onClick: () => {
                      setShow(false);
                    },
                  },
                  {
                    label: "Non",
                    onClick: () => {
                      setHidden(false);
                    },
                  },
                ],
              });
            }}
          >
            Annuler
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
