import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import { apiUrl } from "./basics";
import { getBasicFormData } from "./Functions";
import { Modal } from "react-bootstrap";
import CarImage from "./CarImage";
import { AddImageModal } from "./AddImageModal";

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
  const [plate, setPlate] = useState(data[0]);
  const [owner, setOwner] = useState(data[1]);
  const [brand, setBrand] = useState(data[2]);
  const [model, setModel] = useState(data[3]);
  const [year, setYear] = useState(data[4]);
  const [fuel, setFuel] = useState(data[5]);
  const [price, setPrice] = useState(data[6]);
  const [kilometers, setKilometers] = useState(data[7]);
  const [dealership, setDealership] = useState(data[8]);
  const [description, setDescription] = useState(data[9]);
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

  const handleConfirm = () => {
    if (changes) {
      // mettre à jour les changements
    }
    setShow(false);
  };

  if (changes) {
    console.log("changements reçus par le modal");
    setChanges(false);
    setUpdateParentImage(true);
    const formData = getBasicFormData();
    formData.append("plate", plate);
    axios.post(apiUrl + "get_image_list", formData).then((response) => {
      setFilenames(response.data.images);
    });
  }

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
        </Modal.Header>

        <Modal.Body>
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
              <div className="col" key={x}>
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
