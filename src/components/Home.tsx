import { apiUrl } from "./basics";
import axios from "axios";
import { CarThumbnail } from "./CarThumbnail";
import { getBasicFormData, getDealershipList } from "./Functions";
import { useEffect, useState } from "react";
import TopCarBar from "./TopCarBar";
import AddCarModal from "./AddCarModal";
import { Spinner } from "react-bootstrap";
import { getCookie } from "typescript-cookie";
import SelectDealershipModal from "./DealershipComponents/SelectDealershipModal";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [carsEmpty, setCarsEmpty] = useState(false);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showSelectDealership, setShowSelectDealership] = useState(false);

  const refreshCars = () => {
    setCars([]);
    axios.post(apiUrl + "get_cars", getBasicFormData()).then((response) => {
      setCars(response.data.cars);
      if (response.data.cars.length == 0) setCarsEmpty(true);
      else setCarsEmpty(false);
    });
  };
  useEffect(() => {
    refreshCars();
    getDealershipList().then((dealerships) => {
      if (
        dealerships.length > 0 &&
        typeof getCookie("selected_dealership") === "undefined"
      )
        setShowSelectDealership(true);
    });
  }, []);
  return (
    <>
      {showAddCarModal ? (
        <AddCarModal setShow={setShowAddCarModal} refreshCars={refreshCars} />
      ) : null}
      {showSelectDealership ? (
        <SelectDealershipModal setShow={setShowSelectDealership} />
      ) : null}

      <TopCarBar
        addCarModal={setShowAddCarModal}
        reloadCars={refreshCars}
      ></TopCarBar>
      <div className="container">
        <div className="row">
          {cars.length == 0 && !carsEmpty ? (
            <div>
              <Spinner />
              Chargement des véhicules
            </div>
          ) : null}
          {carsEmpty ? "Pas de véhicule enregistré pour le moment" : null}
          {cars.map((car) => (
            <CarThumbnail key={car[0]} data={car} />
          ))}
        </div>
      </div>
    </>
  );
}
