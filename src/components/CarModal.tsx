import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import CarImage from "./CarImage";
import AddImageModal from "./AddImageModal";

interface Props {
  data: any[];
  files: string[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export default function CarModal({ data, files, show, setShow }: Props) {
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
  const [images, setImages] = useState(files);

  // prend un compte si des changements ont été effectués
  const [changes, setChanges] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(false);
  const [showAddImageModal, setShowAddImageModal] = useState(false);

  return (
    <>
      {showAddImageModal ? (
        <AddImageModal setShow={setShowAddImageModal} />
      ) : null}
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header>
          {brand.toUpperCase()} {model}
        </Modal.Header>

        <Modal.Body>
          {images.length > 0 ? (
            <button
              className="btn btn-primary"
              style={{ margin: "0 auto" }}
              onClick={() => {
                setShowImages(!showImages);
              }}
            >
              {showImages ? "Cacher" : "Afficher"} les images
            </button>
          ) : null}
          <div className={showImages ? "row" : "d-none"}>
            {images.map((x) => (
              <div className="col" key={x}>
                <CarImage
                  plate={plate}
                  filename={x}
                  style={{ maxHeight: "20vh" }}
                />
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setShowAddImageModal(true);
            }}
          >
            Ajouter une image
          </button>
        </Modal.Body>

        <Modal.Footer>
          <button
            onClick={() => {
              if (changes) {
                // mettre à jour les changements
              }
              setShow(false);
            }}
          >
            Fermer {changes ? "et enregistrer" : null}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
