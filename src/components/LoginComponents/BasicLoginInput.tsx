import { Form } from "react-bootstrap";

interface Props {}

export default function BasicLoginInput() {
  return (
    <>
      <Form.Label htmlFor="inputUsername">Nom d'utilistaeur</Form.Label>
      <Form.Control
        type="username"
        id="inputUsername"
        onChange={handleUsernameChange}
        defaultValue={getCookie("username")}
        disabled={renderPayment}
      />
    </>
  );
}
