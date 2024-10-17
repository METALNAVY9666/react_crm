import { useEffect, useState } from "react";
import { socials, socialImages } from "../consts";
import { apiUrl } from "../basics";
import { capitalize, getBasicFormData, notification } from "../Functions";
import axios from "axios";
import { Container, Row, Col, Stack } from "react-bootstrap";
import CarImage from "../CarImage";
import CarBadge from "./CarBadge";
import ImageSelection from "./ImageSelection";
import { getCookie } from "typescript-cookie";
import FacebookSetupModal from "../SettingsComponents/FacebookSetupModal";

export default function Publish() {
  const [showFacebookConfigModal, setShowFacebookConfigModal] =
    useState<boolean>(getCookie("facebookConfigured") !== "true");

  const [showImageSelection, setShowImageSelection] = useState<boolean>(false);
  const [carSearch, setCarSearch] = useState<string>("");
  const [cars, setCars] = useState<Array<Array<any>>>([]);
  useEffect(() => {
    axios.post(apiUrl + "get_cars", getBasicFormData()).then((response) => {
      setCars(response.data.cars);
    });
  }, []);

  const [ia, setIa] = useState<boolean>(false);

  const [selectedPlates, setSelectedPlates] = useState<Array<string>>([]);

  const handleCar = (plate: string) => {
    const plateIndex = selectedPlates.indexOf(plate);
    if (plateIndex == -1) {
      setSelectedPlates([...selectedPlates, plate]);
      return;
    }
    setSelectedPlates(
      selectedPlates.filter((x, index) => index !== plateIndex)
    );
  };

  const [selectedSocials, setSelectedSocials] = useState<Array<string>>([]);
  const handleSocial = (social: string) => {
    const socialIndex = selectedSocials.indexOf(social);
    if (socialIndex == -1) {
      switch (social) {
        case "facebook":
          if (getCookie("facebookConfigured") !== "true") {
            notification("Configuration Facebook", "Facebook KO !", "danger");
            setShowFacebookConfigModal(true);
            return;
          }
      }
      setSelectedSocials([...selectedSocials, social]);
      return;
    }
    setSelectedSocials(
      selectedSocials.filter((x, index) => index !== socialIndex)
    );
  };

  const handleCarSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCarSearch(e.currentTarget.value);
  };
  return (
    <>
      {showFacebookConfigModal ? (
        <FacebookSetupModal setShowModal={setShowFacebookConfigModal} />
      ) : null}
      {showImageSelection ? (
        <ImageSelection
          ia={ia}
          selectedPlates={selectedPlates}
          selectedSocials={selectedSocials}
          setShowImageSelection={setShowImageSelection}
        />
      ) : null}
      <div
        className="m-5"
        style={{ maxHeight: "33%", overflowY: "auto" }}
        id="socials"
      >
        <h3>Réseaux</h3>
        {socials.map((x, index) => (
          <Container
            key={index}
            className={
              selectedSocials.includes(x)
                ? "rounded bg-dark btn mt-1 text-white border"
                : "rounded bg-light btn mt-1 border"
            }
            onClick={() => handleSocial(x)}
          >
            <Row>
              <Col>
                <h4>{capitalize(x)}</h4>
              </Col>
              <Col>
                <img
                  src={socialImages[x]}
                  className="rounded"
                  width="32px"
                  height="32px"
                />
              </Col>
            </Row>
          </Container>
        ))}
      </div>

      <hr />

      <h3>Véhicules sélectionnés : </h3>
      <Stack direction="horizontal" gap={2} className="my-2">
        {selectedPlates.map((x, index) => (
          <CarBadge
            key={index}
            plate={x}
            className="bg-dark text-white"
            onDismiss={() => {
              setSelectedPlates(selectedPlates.filter((y) => y !== x));
            }}
          />
        ))}
      </Stack>
      <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">
          Chercher un véhicule
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          onChange={handleCarSearch}
        />
      </div>
      <div
        className="m-5"
        style={{ maxHeight: "33%", overflowY: "auto" }}
        id="cars"
      >
        {cars
          .filter((x) =>
            x
              .toLocaleString()
              .toLocaleLowerCase()
              .includes(carSearch.toLocaleLowerCase())
          )
          .map((y, index) => (
            <Container
              className={
                selectedPlates.includes(y[0])
                  ? "bg-dark border btn mt-1 text-white"
                  : "bg-light border btn mt-1"
              }
              onClick={() => {
                handleCar(y[0]);
              }}
              key={index}
            >
              <h4>
                <CarImage
                  plate={y[0]}
                  filename="first"
                  className="w-25 h-25 me-5"
                  useEffectElement={carSearch}
                />
                {y[2]} {y[3]} {y[4]} {y[7]}km
              </h4>
            </Container>
          ))}
      </div>

      <hr />

      <Container id="post" className="m-5">
        <h3>Poster</h3>
        <button
          onClick={() => setIa(!ia)}
          className={
            ia ? "btn btn-dark text-white border" : "btn btn-light border"
          }
        >
          Description intelligentes
        </button>

        <br />

        <button
          className={
            selectedPlates.length > 0 && selectedSocials.length > 0
              ? "btn btn-dark text-white mt-3 border"
              : "btn btn-light mt-3 border"
          }
          onClick={() =>
            selectedPlates.length > 0 && selectedSocials.length > 0
              ? setShowImageSelection(true)
              : null
          }
        >
          <h3>{selectedSocials.length > 1 ? "Multi-publier" : "Publier"}</h3>
        </button>
      </Container>
    </>
  );
}
