// https://www.npmjs.com/package/cookies-ts?activeTab=readme
// https://www.npmjs.com/package/local-ipv4-address
import axios from "axios";
import { getCookie } from "typescript-cookie";
import { apiUrl } from "./basics";

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
export function getBasicFormData() {
  const formData = new FormData();
  formData.append("cookie", String(getCookie("cookie")));
  formData.append("username", String(getCookie("username")));
  return formData;
}
