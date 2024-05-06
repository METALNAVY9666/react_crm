import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { apiUrl } from "./basics";
import { getBasicFormData } from "./Functions";
import { Modal } from "react-bootstrap";
import CarImage from "./CarImage";
import { AddImageModal } from "./AddImageModal";
import Entry from "./CarModalComponents/Entry";
import SearchBox from "./SearchBox";
import { brands, fuels } from "./consts";
import YearPick from "./CarModalComponents/YearPick";
import InputNumber from "./CarModalComponents/InputNumber";
import TextArea from "./CarModalComponents/TextArea";
import { Plate } from "./Plate";

interface Props {
  data: any[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setUpdateParentImage: Dispatch<SetStateAction<boolean>>;
}

export default function CarModal({
  data,
  show,
  setShow,
  setUpdateParentImage,
}: Props) {
  useEffect(() => {
    console.log(data);
  }, []);

  //constantes
  const plate: string = data[0];
  const [models, setModels] = useState<Array<string>>([]);

  // variables
  const [owner, setOwner] = useState<string>(data[1]);
  const [brand, setBrand] = useState<string>(data[2]);
  const [model, setModel] = useState<string>(data[3]);
  const [year, setYear] = useState<number>(data[4]);
  const [fuel, setFuel] = useState<string>(data[5]);
  const [price, setPrice] = useState<number>(data[6]);
  const [kilometers, setKilometers] = useState<number>(data[7]);
  const [dealership, setDealership] = useState<string>(data[8]);
  const [description, setDescription] = useState<string>(data[9]);
  const [filenames, setFilenames] = useState<Array<string>>([]);

  // prend un compte si des changements ont été effectués
  const [changes, setChanges] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  useEffect(() => {
    const formData = getBasicFormData();
    formData.append("plate", plate);
    axios.post(apiUrl + "get_image_list", formData).then((response) => {
      setFilenames(response.data.images);
    });
  }, []);

  const handleBrandChange = (b: string) => {
    setChanges(true);
    const formData = getBasicFormData();
    formData.append("brand", b);
    axios.post(apiUrl + "modeles", formData).then((response) => {
      if (response.data.message !== "success") {
        return;
      }
      setModels(response.data.data);
    });
    setBrand(b);
  };

  const handleModelChange = (m: string) => {
    setChanges(true);
    setModel(m);
  };

  const handleFuelChange = (f: string) => {
    setChanges(true);
    setFuel(f);
  };

  const handleConfirm = () => {
    if (changes) {
      // mettre à jour les changements
      let formData: FormData;
      formData = getBasicFormData();
      formData.append(
        "car",
        JSON.stringify([
          plate,
          owner,
          brand,
          model,
          year,
          fuel,
          price,
          kilometers,
          dealership,
          description,
        ])
      );
      console.log(formData);
      axios.post(apiUrl + "update_car", formData);

      // update le Thumbnail de la liste des véhicules
      setChanges(false);
      setUpdateParentImage(true);
      formData = getBasicFormData();
      formData.append("plate", plate);
      axios.post(apiUrl + "get_image_list", formData).then((response) => {
        setFilenames(response.data.images);
      });
    }
    setShow(false);
  };

  return (
    <>
      {showAddImageModal ? (
        <AddImageModal
          plate={plate}
          setShow={setShowAddImageModal}
          setChanges={setChanges}
        />
      ) : null}
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          {brand.toUpperCase()} {model}
          <Plate plate={plate} percent="200%" />
        </Modal.Header>

        <Modal.Body>
          <Entry
            title="Propriétaire"
            defaultValue={owner}
            updateValue={setOwner}
            setChanges={setChanges}
          />

          <SearchBox
            ogArray={brands}
            title="Marque"
            parentUpdateMethod={handleBrandChange}
            defaultValue={brand}
          />

          <SearchBox
            ogArray={models}
            title="Modèle"
            parentUpdateMethod={handleModelChange}
            defaultValue={model}
          />

          <YearPick
            title="Année"
            defaultValue={String(year)}
            setState={setYear}
            setChanges={setChanges}
          />

          <SearchBox
            ogArray={fuels}
            title="Carburants"
            parentUpdateMethod={handleFuelChange}
            defaultValue={fuel}
          />

          <InputNumber
            title="Prix"
            defaultValue={price}
            setState={setPrice}
            setChanges={setChanges}
          />

          <InputNumber
            title="Kilométrage"
            defaultValue={kilometers}
            setState={setKilometers}
            setChanges={setChanges}
          />

          <TextArea
            title="Description"
            defaultValue={description}
            setState={setDescription}
            setChanges={setChanges}
          />

          {filenames.length > 0 ? (
            <button
              style={{ margin: "0 auto" }}
              onClick={() => {
                setShowImages(!showImages);
              }}
            >
              {showImages ? "Cacher" : "Afficher"} les images
            </button>
          ) : null}
          <div className={showImages ? "row" : "d-none"}>
            {filenames.map((x) => (
              <div className="col m-3" key={x}>
                <CarImage
                  plate={plate}
                  filename={x}
                  style={{ maxHeight: "40vh" }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setShowAddImageModal(true);
            }}
          >
            Ajouter une image
          </button>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleConfirm}>
            Fermer {changes ? "et enregistrer" : null}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
