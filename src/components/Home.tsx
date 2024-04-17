import { apiUrl } from "./basics";
import axios from "axios";
import { CarThumbnail } from "./Cars";
import { getBasicFormData, isLogged } from "./Functions";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import TopCarBar from "./TopCarBar";
import AddCarModal from "./AddCarModal";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const refreshCars = () => {
    if (!isLogged()) {
      return;
    }
    axios
      .post(apiUrl + "get_cars", getBasicFormData())
      .then((response) => setCars(response.data.cars));
  };
  useEffect(() => {
    refreshCars();
  }, []);
  return (
    <>
      {showAddCarModal ? <AddCarModal setShow={setShowAddCarModal} /> : null}
      <SideBar>
        <TopCarBar
          addCarModal={setShowAddCarModal}
          reloadCars={refreshCars}
        ></TopCarBar>
        <div className="container">
          <div className="row">
            {cars.map((car) => (
              <CarThumbnail key={car[0]} data={car} />
            ))}
          </div>
        </div>
      </SideBar>
    </>
  );
}
