import { useEffect, useState } from "react";
import { getBasicFormData, isLogged } from "./Functions";
import imakiImage from "../assets/imaki.png";
import { Col, Container, Row } from "react-bootstrap";
import { apiUrl } from "./basics";
import axios from "axios";
import MapSnippet from "./DashboardComponents/MapSnippet";

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
      {message} {name} {emoji}
    </>
  );
}

export default function Dashboard() {
  const [logged, setLogged] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [dealership, setDealership] = useState<Array<string>>();
  const [showCars, setShowCars] = useState<Array<Array<any>>>();

  useEffect(() => {
    isLogged().then((result) => {
      setLogged(result);
      if (result) {
        axios
          .post(apiUrl + "name", getBasicFormData())
          .then((response) => setName(response.data.name.split(" ")[0]));

        axios
          .post(apiUrl + "get_dealership", getBasicFormData())
          .then((response) => console.log(response.data.data));
      }
    });
  }, []);

  if (!logged) {
    return (
      <>
        <img src={imakiImage} width={"25%"} />
      </>
    );
  }
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
      </Container>
    </>
  );
}
