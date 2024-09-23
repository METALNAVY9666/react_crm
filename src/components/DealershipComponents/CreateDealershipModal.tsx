import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { apiUrl } from "../basics";
import { getBasicFormData, notification } from "../Functions";
import { confirmAlert } from "react-confirm-alert";
import AddressAutocomplete from "./AddressAutocomplete";

interface Props {
  setDealershipInitialized: Dispatch<SetStateAction<boolean>>;
  setScene: Dispatch<SetStateAction<string>>;
}

const isPhoneNumberValid = (phone: string): boolean => {
  // Regular expression to validate French phone numbers
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
  return phoneRegex.test(phone.replaceAll(" ", ""));
};

const isTitleValid = (title: string): boolean => {
  return title.length > 3;
};

const isEmailValid = (email: string): boolean => {
  // Regular expression to validate email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function CreateDealershipModal({
  setDealershipInitialized,
  setScene
}: Props) {
  const [hidden, setHidden] = useState(false);

  const [title, setTitle] = useState("");
  const [siren, setSiren] = useState("");
  const [phone, setPhone] = useState("");
  const [web, setWeb] = useState("");
  const [mail, setMail] = useState("");
  const [gps, setGps] = useState("");

  type FamilyElement = [
    string,
    string,
    Dispatch<SetStateAction<string>>,
    string
  ];

  const family: FamilyElement[] = [
    ["title", title, setTitle, "Titre"],
    ["siren", siren, setSiren, "Numéro SIREN"],
    ["phone", phone, setPhone, "N° de Téléphone"],
    ["web", web, setWeb, "Page Web (ou Facebook)"],
    ["mail", mail, setMail, "E-Mail"],
    ["gps", gps, setGps, "Coordonnées GPS"],
  ];

  const addDealership = () => {
    const formData = getBasicFormData();
    family.forEach((couple) => formData.append(couple[0], couple[1]));
    axios.post(apiUrl + "add_dealership", formData).then((response) => {
      const message = response.data.message;
      const success = response.data.success;
      console.log(message);
      if (success) {
        notification(
          "Ajout de la concession",
          "La concession a été ajoutée avec succès",
          "success"
        );
        setDealershipInitialized(true);
        setScene("home")
      } else {
        alert("bruh");
      }
    });
  };

  const handleConfirmButton = () => {
    if (!isTitleValid(title)) {
      notification(
        "Erreur",
        "Le titre doit contenir plus de 3 caractères",
        "danger"
      );
      return;
    }
    if (!isPhoneNumberValid(phone)) {
      notification("Erreur", "Le numéro de téléphone est invalide", "danger");
      return;
    }
    if (!isEmailValid(mail)) {
      notification("Erreur", "L'adresse e-mail est invalide", "danger");
      return;
    }
    if (gps.trim() === "") {
      notification("Erreur", "L'adresse ne peut pas être vide", "danger");
      return;
    }

    setHidden(true);
    confirmAlert({
      title: "Ajout de la concession",
      message: "Êtes-vous sûr de vouloir ajouter cette concession ?",
      closeOnEscape: false,
      closeOnClickOutside: false,
      buttons: [
        {
          label: "Oui",
          onClick: addDealership,
        },
        {
          label: "Non",
          onClick: () => {
            setHidden(false);
          },
        },
      ],
    });
  };

  const handleFormChange = (
    newText: string,
    setter: Dispatch<SetStateAction<string>>
  ) => {
    setter(newText);
  };

  return (
    <Modal
      show={true}
      backdrop={hidden ? false : "static"}
      keyboard={false}
      style={{ visibility: hidden ? "hidden" : "visible" }}
    >
      <Modal.Header>
        Veuillez renseigner votre concession automobile
      </Modal.Header>
      <Modal.Body>
        {family
          .filter((x) => x[0] !== "gps")
          .map((y, key) => (
            <div key={key}>
              <h6 className="mt-3">{y[3]}</h6>
              {["siren", "web"].includes(y[0]) ? (
                <div>
                  <small className="text-secondary">Optionel</small>
                </div>
              ) : null}
              <Form.Control
                onChange={(e) => {
                  handleFormChange(e.target.value, y[2]);
                }}
                value={y[1]} // To ensure the input is controlled
              ></Form.Control>
            </div>
          ))}
        <h6 className="mt-3">Adresse</h6>
        <AddressAutocomplete setResult={setGps} />
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-dark" onClick={handleConfirmButton}>
          Enregistrer
        </button>
      </Modal.Footer>
    </Modal>
  );
}
