import {
  useState,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import axios from "axios";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { sha256 } from "js-sha256";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { apiUrl } from "../basics";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import {
  isFieldUsed,
  isValidEmail,
  isValidFrenchPhoneNumber,
  isValidFullName,
  isValidPassword,
  isValidUsername,
} from "../Functions";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

// https://react-bootstrap.netlify.app/docs/components/modal/
// https://www.npmjs.com/package/js-sha256

interface Props {
  setLogged: (value: boolean) => void;
  setScene: Dispatch<SetStateAction<string>>;
}

export default function LoginModal(props: Props) {
  const signupFields: Record<string, string> = {
    mail: "E-Mail",
    phone: "Numéro de téléphone",
    name: "Prénom Nom",
  };

  const [show, setShow] = useState(true);
  const [msg, setMsg] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [usernameHints, setUsernameHints] = useState<Array<string>>([]);
  const [passwordHints, setPasswordHints] = useState<Array<string>>([]);
  const [mailHints, setMailHints] = useState<Array<string>>([]);
  const [phoneHints, setPhoneHints] = useState<Array<string>>([]);
  const [nameHints, setNameHints] = useState<Array<string>>([]);

  const hints: Record<string, string[]> = {
    mail: mailHints,
    phone: phoneHints,
    name: nameHints,
    username: usernameHints,
    password: passwordHints,
  };

  const alreadyUsedHints: Record<string, string> = {
    mail: "E-Mail déjà utilisé",
    phone: "Numéro déjà utilisé",
    username: "Nom d'utilisateur déjà utilisé",
  };

  const [fieldsValid, setFieldsValid] = useState(false);

  const [signup, setSignup] = useState(false);

  const [renderPayment, setRenderPayment] = useState(false);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null>>(
    Promise.resolve(null)
  );
  const [checkoutSessionId, setCheckoutSessionId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>();
  const [sessionStatus, setSessionStatus] = useState<string>("");

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRenderPayment(false);
    setPassword(event.currentTarget.value);
  };

  const handleConfirmKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    console.log(event.key);
    if (event.key == "Enter") {
      handleLogin();
    }
    console.log(password);
  };

  function handleSignupElementChange(
    event: ChangeEvent<HTMLInputElement>,
    key: string
  ) {
    const text = event.currentTarget.value;

    setRenderPayment(false);
    switch (key) {
      case "mail":
        setMail(text);
        break;
      case "phone":
        setPhone(text);
        break;
      case "name":
        setName(text);
        break;
      case "username":
        setUsername(text);
    }
  }

  // gestion fermeture
  const handleClose = () => setShow(false);

  // gestion connexion
  const handleLogin = () => {
    setMsg("");
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", sha256.create().update(password).hex());
    axios.post(apiUrl + "login", formData).then((response) => {
      setMsg(response.data.message);
      if (response.data.message === "Authentification réussie") {
        removeCookie("selected_dealership");
        setCookie("cookie", response.data.cookie);
        setCookie("username", username);
        props.setLogged(true);
        props.setScene("dashboard");
      } else {
        props.setLogged(false);
      }
    });
  };

  // vérifie si les champs d'inscription sont valides
  const validateSignupFields = () => {
    setFieldsValid(true);
    const mailValidation = isValidEmail(mail);
    if (mailValidation.isValid) {
      isFieldUsed("mail", mail, (used: boolean) => {
        if (used) {
          setMailHints([alreadyUsedHints.mail]);
          setFieldsValid(false);
        } else setMailHints([]);
      });
    } else {
      setMailHints(mailValidation.reasons);
      setFieldsValid(false);
    }

    const phoneValidation = isValidFrenchPhoneNumber(phone);
    if (phoneValidation.isValid) {
      isFieldUsed("phone", phone, (used: boolean) => {
        if (used) {
          setPhoneHints([alreadyUsedHints.phone]);
          setFieldsValid(false);
        } else setPhoneHints([]);
      });
    } else {
      setPhoneHints(phoneValidation.reasons);
      setFieldsValid(false);
    }

    const nameValidation = isValidFullName(name);
    if (!nameValidation.isValid) {
      setNameHints(nameValidation.reasons);
      setFieldsValid(false);
    } else setNameHints([]);

    const usernameValidation = isValidUsername(username);
    console.log(username);
    console.log(usernameValidation);
    if (usernameValidation.isValid) {
      isFieldUsed("username", username, (used: boolean) => {
        if (used) {
          setUsernameHints([alreadyUsedHints.username]);
          setFieldsValid(false);
        } else setUsernameHints([]);
      });
    } else {
      setFieldsValid(false);
      setUsernameHints(usernameValidation.reasons);
    }

    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.isValid) {
      setPasswordHints(passwordValidation.reasons);
      setFieldsValid(false);
    } else setPasswordHints([]);
  };

  const initPayment = () => {
    setRenderPayment(true);
    setStripePromise(
      loadStripe(
        "pk_test_51POyu902ibOJzXZ45M1aRLvTAn7myVFHJu3DIkYdEPzJVJEnCR7zuLlqS6PY0u4HR2VUwKzivsuAqWlv11yje4Dj006G6vtQFj"
      )
    );
    axios.post(apiUrl + "create_checkout_session").then((response) => {
      setClientSecret(response.data.client_secret);
      setCheckoutSessionId(response.data.id);
    });
  };

  const handleSignup = () => {
    if (sessionStatus === "complete") {
      if (fieldsValid) {
        // le paiement est fait et les informations sont correctes
        finalSignup();
      } else {
        // le paiement est fait, mais les informations sont incorrectes
        setMsg("Certains champs ne sont pas corrects.");
      }
    } else {
      if (fieldsValid) {
        // les champs sont corrects, mais l'utilisateur n'a pas payé
        if (renderPayment) {
          // l'utilisateur n'a pas payé
          setMsg("Pour ouvrir un compte, veuillez vous abonner.");
        } else {
          // le paiement n'a pas été initialisé
          initPayment();
        }
      } else {
        // les champs sont incorrects, et l'utilisateur n'a pas payé
        setRenderPayment(false);
      }
    }
  };

  const finalSignup = () => {
    const formData = new FormData();
    [
      ["username", username],
      ["password", sha256.create().update(password).hex()],
      ["phone", phone],
      ["mail", mail],
      ["name", name],
      ["session_id", checkoutSessionId],
    ].forEach((x) => formData.append(x[0], x[1]));

    axios.post(apiUrl + "signup", formData).then((response) => {
      switch (response.data.message) {
        case "User signed in successfully":
          setMsg("Compte crée ! Veuillez vous connecter.");
          setRenderPayment(false);
          setSignup(false);
          break;
        default:
          setMsg("Une erreur s'est produite : " + response.data.message);
      }
    });
  };

  useEffect(validateSignupFields, [mail, phone, name, username, password]);
  useEffect(() => setUsername(getCookie("username") || ""), []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {signup
              ? "Pour vous abonner, remplissez les informations ci-dessous"
              : "Veuillez vous connecter"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {signup
            ? Object.keys(signupFields).map((x, key) => (
                <div key={key}>
                  <Form.Label htmlFor={x}>{signupFields[x]}</Form.Label>
                  <Form.Control
                    id={x}
                    disabled={renderPayment}
                    onChange={(event) => handleSignupElementChange(event, x)}
                  />
                  <div>
                    {hints[x].map((hint, key) => (
                      <div key={key}>
                        <small className="text-danger">{hint}</small>
                        <br />
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              ))
            : null}

          <Form.Label htmlFor="inputUsername">Nom d'utilistaeur</Form.Label>
          <Form.Control
            type="username"
            id="inputUsername"
            onChange={(event) => handleSignupElementChange(event, "username")}
            defaultValue={getCookie("username")}
            disabled={renderPayment}
          />
          {signup
            ? usernameHints.map((hint, key) => (
                <div key={key}>
                  <small className="text-danger">{hint}</small>
                  <br />
                </div>
              ))
            : null}

          <Form.Label htmlFor="inputPassword">Mot de passe</Form.Label>
          <Form.Control
            onKeyDown={handleConfirmKeyDown}
            type="password"
            id="inputPassword"
            onChange={handlePasswordChange}
            disabled={renderPayment}
          />

          {signup
            ? passwordHints.map((hint, key) => (
                <div key={key}>
                  <small className="text-danger">{hint}</small>
                  <br />
                </div>
              ))
            : null}

          <div id="passwordMessage" className="mt-3 text-danger">
            {msg}
          </div>
          {renderPayment ? (
            <div>
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  clientSecret,
                  onComplete: finalSignup,
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          ) : null}
        </Modal.Body>

        {!renderPayment ? (
          <Modal.Footer>
            {!signup ? (
              <button
                id="exit-btn"
                className="btn btn-ligth"
                onClick={handleClose}
              >
                Mot de passe oublié
              </button>
            ) : null}
            <button
              id="sign-up-btn"
              className="btn btn-light"
              onClick={() => {
                if (!signup) {
                  setMsg("");
                }
                setSignup(!signup);
                setRenderPayment(false);
              }}
            >
              {signup ? "Déjà un compte ?" : "Pas de compte ?"}
            </button>
            <button
              id="login-btn"
              className="btn btn-dark"
              onClick={signup ? handleSignup : handleLogin}
            >
              {signup ? "S'abonner" : "Se connecter"}
            </button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </>
  );
}
