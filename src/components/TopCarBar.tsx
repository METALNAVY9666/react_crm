import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SelectDealershipModal from "./DealershipComponents/SelectDealershipModal";
import { apiUrl } from "./basics";
import { getBasicFormData } from "./Functions";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import { DealershipArrayResponse } from "../types";

interface Props {
  reloadCars: () => void;
  addCarModal: Dispatch<SetStateAction<boolean>>;
}

export default function TopCarBar({ reloadCars, addCarModal }: Props) {
  const [title, setTitle] = useState("");
  const [showSelectDealershipModal, setShowSelectDealershipModal] =
    useState(false);

  const dealershipCookie = () => getCookie("selected_dealership");

  const updateDealership = () => {
    axios
      .post<DealershipArrayResponse>(
        apiUrl + "get_dealerships",
        getBasicFormData()
      )
      .then((result) => {
        setTitle(
          result.data.data.filter(
            (x) => String(x[0]) == dealershipCookie()
          )[0][2]
        );
      });
  };

  const handleDealershipButton = () => {
    setShowSelectDealershipModal(true);
  };
  useEffect(updateDealership, [showSelectDealershipModal]);

  const updateTitleAfterDealershipSelection = () => {
    axios
      .post<DealershipArrayResponse>(
        apiUrl + "get_dealerships",
        getBasicFormData()
      )
      .then((result) => {
        setTitle(
          result.data.data.filter(
            (x) => String(x[0]) == getCookie("selected_dealership")
          )[0][2]
        );
      });
  };

  return (
    <>
      {showSelectDealershipModal ? (
        <SelectDealershipModal
          setShow={setShowSelectDealershipModal}
          updateParent={updateTitleAfterDealershipSelection}
        />
      ) : null}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <div>
                <button className="mx-3" onClick={handleDealershipButton}>
                  <small>Concession sélectionée : {title}</small>
                </button>
              </div>

              <div>
                <button className="mx-3" onClick={() => addCarModal(true)}>
                  Ajouter un véhicule
                </button>
              </div>
              <div>
                <button className="mx-3" onClick={reloadCars}>
                  Rafraîchir la page
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
