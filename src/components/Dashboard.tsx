import { useEffect, useState } from "react";
import { getBasicFormData } from "./Functions";
import imakiImage from "../assets/imaki.png";
import { Col, Container, Row } from "react-bootstrap";
import { apiUrl } from "./basics";
import axios from "axios";
import MapSnippet from "./DashboardComponents/MapSnippet";
import { getCookie } from "typescript-cookie";
import Stats from "./DashboardComponents/Stats";

interface Props {
  name: string;
}

function RandomGreeting({ name }: Props) {
  const emojis: Array<number> = [128075, 128513, 128526, 128170, 128664];
  const messages: Array<string> = ["Salut", "Bienvenue"];
  const time = new Date().getHours();
  if (5 < time && time < 18) {
    messages.push("Bonjour");
  } else {
    messages.push("Bonsoir");
  }

  const emoji = String.fromCodePoint(
    emojis[Math.floor(Math.random() * emojis.length)]
  );
  const message = messages[Math.floor(Math.random() * messages.length)];

  return (
    <>
      {message}, {name} {emoji}
    </>
  );
}

export default function Dashboard() {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [dealershipName, setDealershipName] = useState<string>("");

  useEffect(() => {
    const dealership_id = String(getCookie("selected_dealership")).valueOf();

    axios
      .post(apiUrl + "name", getBasicFormData())
      .then((response) => setName(response.data.name.split(" ")[0]));

    axios
      .post(apiUrl + "get_dealerships", getBasicFormData())
      .then((response) => {
        const dealership = response.data.data[dealership_id];
        setAddress(dealership[7]);
        setDealershipName(dealership[2]);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img
              src={imakiImage}
              alt="adsl en big 2024"
              style={{ width: "50%" }}
            />
          </Col>
          <Col>
            <div className="mt-5">
              <h1>
                <RandomGreeting name={name} />
              </h1>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="mx-auto">
              Concession sélectionnée : {dealershipName}
            </h3>
            {address.length > 0 ? <MapSnippet address={address} /> : null}
          </Col>
          <Col>
            <Stats />
          </Col>
        </Row>
      </Container>
    </>
  );
}
