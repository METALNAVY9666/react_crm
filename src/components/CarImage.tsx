import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { apiUrl } from "./basics";
import { getCookie } from "typescript-cookie";
import { getBasicFormData } from "./Functions";

interface Props {
  plate: string;
  filename?: string;
  className?: string;
  style?: React.CSSProperties;
  useEffectElement?: any;
}

const divStyles = { maxHeight: "30vh", maxWidth: "100%" };

export default function CarImage({
  plate,
  filename = "first",
  className = "d-block mx-auto",
  style = divStyles,
  useEffectElement = null,
}: Props) {
  const [src, setSrc] = useState<string>("src/assets/silhouette.png");

  const responseFormat: AxiosRequestConfig<FormData> = {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  useEffect(() => {
    switch (String(filename)) {
      case "first":
        const firstFormData = getBasicFormData();
        firstFormData.append("plate", plate);
        axios
          .post(apiUrl + "get_image_list", firstFormData)
          .then((firstResponse) => {
            if (firstResponse.data.images.length > 0) {
              firstFormData.append(
                "filename",
                "data/car_images/" + plate + "/" + firstResponse.data.images[0]
              );
              axios
                .post(apiUrl + "get_image", firstFormData, responseFormat)
                .then((secondResponse) => {
                  const reader = new FileReader();
                  reader.onload = () => setSrc(reader.result as string);
                  reader.readAsDataURL(secondResponse.data);
                });
            } else setSrc("src/assets/silhouette.png");
          });
        break;
      case "undefined":
        setSrc("src/assets/silhouette.png");
        break;
      default:
        const defaultFormData = getBasicFormData();
        defaultFormData.append("plate", plate);
        defaultFormData.append(
          "filename",
          "data/car_images/" + plate + "/" + filename
        );
        axios
          .post(apiUrl + "get_image", defaultFormData, responseFormat)
          .then((response) => {
            const reader = new FileReader();
            reader.onload = () => setSrc(reader.result as string);
            reader.readAsDataURL(response.data);
          });
    }
  }, [useEffectElement]);
  return (
    <>
      <img src={src} className={className} style={style} alt={plate}></img>
    </>
  );
}
