import axios from "axios";
import { getBasicFormData } from "./Functions";
import { apiUrl } from "./basics";

export function editDealership(data: Array<string>) {
  const formData = getBasicFormData();
  formData.append("dealership", JSON.stringify(data));
  return axios.post(apiUrl + "update_dealership");
}
