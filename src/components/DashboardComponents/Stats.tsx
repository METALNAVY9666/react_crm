import { useEffect, useState } from "react";
import { getBasicFormData } from "../Functions";
import axios from "axios";
import { apiUrl } from "../basics";
import { Container, Row, Col } from "react-bootstrap";
import { getCookie } from "typescript-cookie";

export default function Stats() {
  const [cars, setCars] = useState<Array<Array<any>>>([]);
  const [customers, setCustomers] = useState<Array<Array<any>>>([]);

  useEffect(() => {
    const dealership_id: string | undefined = getCookie("selected_dealership");

    if (typeof dealership_id !== "undefined") {
      let formData = getBasicFormData();
      formData.append("dealership_id", String(dealership_id));
      axios
        .post(apiUrl + "get_cars", formData)
        .then((response) => setCars(response.data.cars));
      axios
        .post(apiUrl + "customers", formData)
        .then((response) => setCustomers(response.data.customers));
    }
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4>
            {cars.length} véhicules <br /> {customers.length} clients
          </h4>
        </Col>
      </Row>
    </Container>
  );
}
