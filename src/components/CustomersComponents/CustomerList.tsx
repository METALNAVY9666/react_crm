import { useState, useEffect } from "react";
import { getBasicFormData } from "../Functions";
import { getCookie } from "typescript-cookie";
import axios from "axios";
import { apiUrl } from "../basics";
import CustomerListElement from "./CustomerListElement";
import AddCustomerModal from "./AddCustomerModal";
import { Spinner } from "react-bootstrap";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);
  const get_customers = () => {
    const dealership_id = getCookie("selected_dealership");
    const formData = getBasicFormData();

    if (typeof dealership_id !== "string") {
      console.log("dealership_cookie not defined");
      return;
    }
    setCustomers([]);
    setShowLoadingIcon(true);
    formData.append("dealership_id", dealership_id);
    axios
      .post(apiUrl + "customers", formData)
      .then((response) =>
        response.data.message === "success"
          ? setCustomers(response.data.customers)
          : console.log("error in fetching customers")
      )
      .then(() => setShowLoadingIcon(false));
  };

  useEffect(get_customers, []);

  return (
    <div className="w-100">
      {showAddCustomerModal ? (
        <AddCustomerModal setShow={setShowAddCustomerModal} />
      ) : null}
      <h1 className="mb-2">{showLoadingIcon ? <Spinner /> : "Clients"}</h1>
      <button className="mx-5" onClick={get_customers}>
        Rafraichir
      </button>
      <button className="mb-3" onClick={() => setShowAddCustomerModal(true)}>
        Ajouter
      </button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col m-5">Nom Complet</th>
            <th scope="col m-5">Numero</th>
            <th scope="col m-5">Adresse</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <CustomerListElement
              customer={customer}
              reloadFunction={get_customers}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
