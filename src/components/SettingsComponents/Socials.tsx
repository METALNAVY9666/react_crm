import { useEffect, useState } from "react";
import FacebookLogin from "../PublishingComponents/Socials/FacebookLogin";
import axios from "axios";
import { apiUrl } from "../basics";
import { getBasicFormData } from "../Functions";
import { getCookie } from "typescript-cookie";

export default function Socials() {
  const [pagesList, setPagesList] = useState<Array<Array<string>>>([]);

  useEffect(() => {
    const form = getBasicFormData();
    form.append("dealership_id", String(getCookie("selected_dealership")));
    axios
      .post(apiUrl + "get_facebook_pages_list", form)
      .then((response) => setPagesList(response.data.pages_list));
  }, []);

  return (
    <>
      <FacebookLogin setLoginSuccessful={() => {}} />
      <br />
    </>
  );
}
