import { useEffect, useState } from "react";
import EditCustomerModal from "./EditCustomerModal";

interface Props {
  customer: Array<string>;
  reloadFunction: () => void;
}

export default function CustomerListElement({ customer, reloadFunction }: Props) {
  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);

  return (
    <>
      {showEditCustomerModal ? (
        <EditCustomerModal
          customer={customer}
          setShow={setShowEditCustomerModal}
          reloadFunction={reloadFunction}
        />
      ) : null}
      <tr>
        <th scope="row">{customer[1]}</th>
        {customer.slice(2, 4).map((x) => (
          <td>{x}</td>
        ))}
        <td><button
          className="bg-dark text-white"
          onClick={() => setShowEditCustomerModal(true)}
        >
          <i className="bi bi-sliders"></i>
        </button></td>
      </tr>
    </>
  );
}
