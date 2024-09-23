import axios from "axios";
import { apiUrl } from "./basics";
import { getBasicFormData } from "./Functions";

export async function updateDealership(data: Array<string>) {
  const formData = getBasicFormData();
  formData.append("dealership", JSON.stringify(data));
  axios.post(apiUrl + "update_dealership", formData);
}
