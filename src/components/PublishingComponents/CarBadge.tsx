import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { apiUrl } from "../basics";
import { getBasicFormData } from "../Functions";
import axios from "axios";

interface Props {
  plate: string;
  className?: string;
  onDismiss?: () => void;
}

export default function CarBadge({
  plate,
  className = "",
  onDismiss = () => {},
}: Props) {
  const [car, setCar] = useState<Array<string | number>>([]);
  const [btnClassName, setBtnClassName] = useState<string>("btn-close");

  useEffect(() => {
    if (className.includes("bg-black") || className.includes("bg-dark")) {
      setBtnClassName(btnClassName + " btn-close-white");
    }
    axios
      .post(apiUrl + "get_cars", getBasicFormData())
      .then((response) =>
        setCar(
          response.data.cars.filter(
            (x: Array<string | number>) => String(x[0]) === plate
          )[0]
        )
      );
  }, []);

  return (
    <Badge className={className}>
      {car.length > 0 ? car[2] + " " + car[3] + " " + car[7] + " km" : null}
      <button
        type="button"
        className={btnClassName}
        onClick={onDismiss}
      ></button>
    </Badge>
  );
}
