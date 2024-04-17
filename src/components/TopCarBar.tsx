import { button } from "react-bootstrap";
import { Dispatch, SetStateAction } from "react";

interface Props {
  reloadCars: () => void;
  addCarModal: Dispatch<SetStateAction<boolean>>;
}

export default function TopCarBar({ reloadCars, addCarModal }: Props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse">
            <div className="navbar-nav">
              <div>
                <button onClick={() => addCarModal(true)}>Add Car</button>
              </div>
              <div>
                <button onClick={reloadCars}>Reload Car</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
