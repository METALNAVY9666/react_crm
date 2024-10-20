import "./Plate.css";
import { alphabet, numbers } from "./consts";
import empty_plate from "../assets/empty_plate.png";

function isPlateValid(plate: string) {
  plate = plate.toLowerCase();

  const inSub = (char: string, sub: Array<String>) => {
    for (let j = 0; j < sub.length; j++) {
      if (sub[j] == char) {
        return true;
      }
    }
    return false;
  };

  if (plate.length != 7) {
    return false;
  }
  for (let i = 0; i < 7; i++) {
    if (i < 2 || i > 4) {
      if (!inSub(plate[i], alphabet)) {
        return false;
      }
    } else {
      if (!inSub(plate[i], numbers)) {
        return false;
      }
    }
  }
  return true;
}

interface Props {
  plate: string;
  percent: string;
}

function Plate({ plate, percent }: Props) {
  let newPlate = "";
  for (let i = 0; i < 7; i++) {
    newPlate = newPlate + plate.charAt(i);
    if (i == 1 || i == 4) {
      newPlate = newPlate + "-";
    }
  }

  return (
    <>
      <div className="overlay-container">
        <img src={empty_plate} style={{ width: "100%" }}></img>
        <div
          className="centered"
          style={{ whiteSpace: "nowrap", fontSize: percent }}
        >
          {newPlate.toUpperCase()}
        </div>
      </div>
    </>
  );
}

export { Plate, isPlateValid };
