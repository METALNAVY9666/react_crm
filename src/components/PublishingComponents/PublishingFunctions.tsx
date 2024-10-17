import axios from "axios";
import { getBasicFormData, notification } from "../Functions";
import { apiUrl } from "../basics";

export default function PostFacebook(
  dealership_id: number,
  plate: string,
  description: string,
  images: string[]
) {
  notification("Publication", "Publication en cours ...", "info");
  const form = getBasicFormData();
  form.append("dealership_id", String(dealership_id));
  form.append("plate", plate);
  form.append("description", description);
  form.append("images", JSON.stringify(images));
  axios.post(apiUrl + "post_social/facebook", form).then((response) => {
    if (response.data.result)
      notification("Publication", response.data.message, "success");
    else notification("Publication", response.data.message, "danger");
  });
}
