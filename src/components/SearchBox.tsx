import { useState } from "react";
import { Form } from "react-bootstrap";

interface Props {
  ogArray: Array<string>;
  title: string;
  parentUpdateMethod: (text: string) => void;
  restrictive?: boolean;
}

export default function SearchBox({
  ogArray,
  title,
  parentUpdateMethod,
  restrictive = false,
}: Props) {
  const [text, setText] = useState("Changer la valeur");
  const [array, setArray] = useState<string[]>(ogArray);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newArray: string[];
    newArray = [];
    for (let i = 0; i < ogArray.length; i++) {
      console.log(typeof ogArray[i]);
      if (ogArray[i].toLowerCase().includes(e.target.value.toLowerCase())) {
        newArray.push(ogArray[i]);
      }
    }
    setArray(newArray);
    if (!restrictive) {
      parentUpdateMethod(e.target.value);
    }
  };

  return (
    <>
      <Form.Label>{title}</Form.Label>
      <br />
      {!confirmed ? (
        <Form.Control
          onChange={handleChange}
          placeholder="Chercher ici"
        ></Form.Control>
      ) : null}
      {confirmed ? (
        <button
          onClick={() => {
            setConfirmed(false);
          }}
        >
          {text}
        </button>
      ) : null}
      <br />
      <div>
        {!confirmed
          ? array.map((x, index) => (
              <button
                key={index}
                className="btn m-1"
                onClick={() => {
                  setConfirmed(true);
                  setText(x);
                  parentUpdateMethod(x);
                }}
              >
                {x}
              </button>
            ))
          : null}
      </div>
      {!confirmed ? <br /> : null}
    </>
  );
}
