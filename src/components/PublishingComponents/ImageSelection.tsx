import axios from "axios";
import { apiUrl } from "../basics";
import { Dispatch, useEffect, useState } from "react";
import { frenchEnumerate, getBasicFormData } from "../Functions";
import { Modal } from "react-bootstrap";
import CarImage from "../CarImage";
import { confirmAlert } from "react-confirm-alert";
import { socials } from "../consts";
import PostFacebook from "./PublishingFunctions";
import { getCookie } from "typescript-cookie";

interface Props {
  ia: boolean;
  selectedPlates: Array<string>;
  selectedSocials: Array<string>;
  setShowImageSelection: Dispatch<boolean>;
}

export default function ImageSelection({
  ia,
  selectedPlates,
  selectedSocials,
  setShowImageSelection,
}: Props) {
  const [cars, setCars] = useState<Record<string, Array<string>>>({});
  const selectedDealership = parseInt(String(getCookie("selected_dealership")));
  const [selectedCars, setSelectedCars] = useState<
    Record<string, Array<string>>
  >({});

  const [hidden, setHidden] = useState<boolean>(false);

  const isFormValid = () => {
    for (const plate in selectedCars) {
      if (selectedCars[plate].length == 0) {
        return false;
      }
    }
    return true;
  };

  const keysOf = (object: Object) => {
    return Object.keys(object);
  };

  const handleCancel = () => setShowImageSelection(false);
  const handleConfirm = () => {
    if (selectedPlates.length > 0 && selectedSocials.length > 0) {
      setHidden(true);

      let message = "Êtes-vous sûr de vouloir publier ";

      if (selectedPlates.length > 1) {
        message += "les véhicules immatriculés ";
      } else {
        message += "le véhicule immatriculé ";
      }

      message +=
        frenchEnumerate(selectedPlates) +
        " sur " +
        frenchEnumerate(selectedSocials, true);

      if (ia) {
        message += " avec une description générée par Turbo";
      }

      message += " ?";

      confirmAlert({
        title: "Publication",
        message: message,
        closeOnEscape: false,
        closeOnClickOutside: false,
        buttons: [
          {
            label: "Oui",
            onClick: autoPost,
          },
          {
            label: "Non",
            onClick: () => {
              setHidden(false);
            },
          },
        ],
      });
    }
  };
  const autoPost = () => {
    console.log("socials:", selectedSocials);
    selectedPlates.forEach((plate) => {
      if (socials.includes("facebook"))
        PostFacebook(selectedDealership, plate, "/auto", selectedCars[plate]);
    });
    setHidden(false);
    setShowImageSelection(false);
  };

  const handleImageSelect = (plate: string, filename: string) => {
    let selectedCarsCopy = structuredClone(selectedCars);
    const filenameIndex = selectedCars[plate].indexOf(filename);
    if (filenameIndex == -1) {
      selectedCarsCopy[plate].push(filename);
    } else {
      selectedCarsCopy[plate] = selectedCarsCopy[plate].filter(
        (x) => filename != x
      );
    }
    console.log(selectedCarsCopy);
    setSelectedCars(selectedCarsCopy);
  };

  useEffect(() => {
    let localCars: Record<string, Array<string>> = {};

    selectedPlates.forEach((plate, index) => {
      const formData = getBasicFormData();
      formData.append("plate", plate);
      axios.post(apiUrl + "get_image_list", formData).then((response) => {
        localCars[plate] = response.data.images;
        if (index === selectedPlates.length - 1) {
          setCars(localCars);
          setSelectedCars(localCars);
        }
      });
    });
  }, []);

  return (
    <Modal
      show={true}
      backdrop={hidden ? false : "static"}
      keyboard={false}
      style={{ visibility: hidden ? "hidden" : "visible" }}
    >
      <Modal.Header>Images des plaques</Modal.Header>
      <Modal.Body>
        {Object.keys(cars).map((plate, plateIndex) => (
          <div key={plateIndex}>
            <h3>{plate}</h3>
            {cars[plate].map((filename, filenameIndex) => (
              <div key={filenameIndex}>
                <CarImage plate={plate} filename={filename} />
                <div className="text-center mt-2 mb-5">
                  <button
                    className={
                      selectedCars[plate].includes(filename)
                        ? "btn btn-dark center"
                        : "btn btn-light border"
                    }
                    onClick={() => handleImageSelect(plate, filename)}
                  >
                    {selectedCars[plate].includes(filename)
                      ? "Image sélectionnée N°" +
                        String(selectedCars[plate].indexOf(filename) + 1)
                      : "Image ignorée"}
                  </button>
                </div>
              </div>
            ))}
            <hr />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-dark" onClick={handleCancel}>
          Annuler
        </button>
        <button
          className={isFormValid() ? "btn btn-dark" : "btn btn-light border"}
          onClick={handleConfirm}
        >
          Multi-poster
        </button>
      </Modal.Footer>
    </Modal>
  );
}
