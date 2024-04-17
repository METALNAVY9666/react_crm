import { useState } from "react";
import axios from "axios";
import { apiUrl } from "./basics";
import { getCookie } from "typescript-cookie";

interface Props {
  plate: string;
  filename: string;
  className?: string;
  style?: React.CSSProperties;
}

const divStyles = { maxHeight: "30vh", maxWidth: "100%" };

export default function CarImage({
  plate,
  filename,
  className = "d-block mx-auto",
  style = divStyles,
}: Props) {
  const [src, setSrc] = useState<string>("src/assets/silhouette.png");
  const [called, setCalled] = useState<boolean>(false);
  if (typeof filename != "undefined" && !called) {
    setCalled(true);
    console.log(plate + " mounted");
    axios
      .post(
        apiUrl + "get_image",
        {
          username: getCookie("username"),
          cookie: getCookie("cookie"),
          filename: "data/car_images/" + plate + "/" + filename,
        },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        const reader = new FileReader();
        reader.onload = () => {
          setSrc(reader.result as string);
        };
        reader.readAsDataURL(response.data);
      });
  }
  return (
    <>
      <img src={src} className={className} style={style}></img>
    </>
  );
}
