// https://www.npmjs.com/package/cookies-ts?activeTab=readme
// https://www.npmjs.com/package/local-ipv4-address
import axios from "axios";
import { getCookie } from "typescript-cookie";
import { apiUrl } from "./basics";
import { Store } from "react-notifications-component";

export async function isLogged() {
  let result = false;
  const cookie = getCookie("cookie");
  if (typeof cookie === "string") {
    const formData = new FormData();
    formData.append("cookie", cookie);
    try {
      const response = await axios.post(apiUrl + "check_cookie", formData);
      if (response.data.cookie.result) {
        result = true;
      }
    } catch (error) {
      console.error("Error checking cookie:", error);
    }
  }
  return result;
}

export function isDealershipCookieInitialized() {
  const cookie = getCookie("dealership");
  return cookie != undefined && cookie != "";
}

export async function getDealershipList() {
  const formData = getBasicFormData();
  const response = await axios.post(apiUrl + "get_dealerships", formData);
  return response.data.data;
}

export function capitalize(text: string) {
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1);
}

export function frenchEnumerate(list: Array<string>, capital: boolean = false) {
  if (list.length < 1) {
    return "";
  }

  let newList: Array<string> = [];
  list.forEach((x) => {
    if (capital) {
      newList.push(capitalize(x));
    } else {
      newList.push(x);
    }
  });

  switch (list.length) {
    case 2:
      return newList[0] + " et " + newList[1];

    case 1:
      return newList[0];

    default:
      let result = "";

      const lastElement = newList.pop();
      const beforeLastElement = newList.pop();

      newList.forEach((x) => (result += x + ", "));
      result += beforeLastElement + " ";
      result += "et " + lastElement;

      return result;
  }
}

export function getBasicFormData() {
  // renvoie un form avec le cookie et le nom d'utilisateur
  const formData = new FormData();
  formData.append("cookie", String(getCookie("cookie")));
  formData.append("username", String(getCookie("username")));
  return formData;
}

interface ValidationResult {
  isValid: boolean;
  reasons: string[];
}

export function isValidEmail(email: string): ValidationResult {
  const reasons: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    reasons.push("Le format de l'email est invalide.");
  }

  return {
    isValid: reasons.length === 0,
    reasons: reasons,
  };
}

export function isValidFullName(fullName: string): ValidationResult {
  const reasons: string[] = [];
  const names = fullName.trim().split(/\s+/);

  if (names.length < 2) {
    reasons.push(
      "Le nom complet doit contenir au moins un prénom et un nom de famille."
    );
  }

  for (const name of names) {
    const nameResult = isValidName(name);
    if (!nameResult.isValid) {
      reasons.push(...nameResult.reasons);
    }
  }

  return {
    isValid: reasons.length === 0,
    reasons: reasons,
  };
}

export function isValidName(name: string): ValidationResult {
  const reasons: string[] = [];
  const nameRegex = /^[a-zA-Z'-]+$/;
  const minLength = 1;
  const maxLength = 50;

  if (!nameRegex.test(name)) {
    reasons.push(
      "Le nom ne doit contenir que des lettres, des traits d'union et des apostrophes."
    );
  }
  if (name.length < minLength || name.length > maxLength) {
    reasons.push(
      `Le nom doit contenir entre ${minLength} et ${maxLength} caractères.`
    );
  }

  return {
    isValid: reasons.length === 0,
    reasons: reasons,
  };
}

export function isValidFrenchPhoneNumber(
  phoneNumber: string
): ValidationResult {
  const reasons: string[] = [];
  const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");
  const frenchPhoneNumberRegex = /^0[1-9]([-. ]?[0-9]{2}){4}$/;

  if (!frenchPhoneNumberRegex.test(cleanedPhoneNumber)) {
    reasons.push(
      "Le numéro de téléphone français doit contenir 10 chiffres et commencer par 0."
    );
  }

  return {
    isValid: reasons.length === 0,
    reasons: reasons,
  };
}

export function isValidPassword(password: string): ValidationResult {
  const reasons: string[] = [];
  const minLength = 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (password.length < minLength) {
    reasons.push(
      `Le mot de passe doit contenir au moins ${minLength} caractères.`
    );
  }
  if (!hasUppercase) {
    reasons.push(
      "Le mot de passe doit contenir au moins une lettre majuscule."
    );
  }
  if (!hasLowercase) {
    reasons.push(
      "Le mot de passe doit contenir au moins une lettre minuscule."
    );
  }
  if (!hasDigit) {
    reasons.push("Le mot de passe doit contenir au moins un chiffre.");
  }

  return {
    isValid: reasons.length === 0,
    reasons: reasons,
  };
}

export function isValidUsername(username: string): ValidationResult {
  const reasons: Array<string> = [];

  if (username.length < 8) {
    reasons.push("Le nom d'utilisateur doit être d'au moins 8 charactères.");
  }

  return {
    isValid: reasons.length == 0,
    reasons: reasons,
  };
}

export function notification(
  title: string,
  message: string,
  type: "success" | "danger" | "info" | "default" | "warning"
) {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
    },
  });
}

export function isFieldUsed(
  field: string,
  value: string,
  nextFunction: (used: boolean) => void
) {
  axios
    .get(apiUrl + "field_used/" + field + "/" + encodeURI(value))
    .then((response) => nextFunction(response.data.result));
}

export function getDealershipId() {
  const cookie = getCookie("selected_dealership");
  if (typeof cookie === "undefined") return 0;
  return parseInt(cookie);
}
