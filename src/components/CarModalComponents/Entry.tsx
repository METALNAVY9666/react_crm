import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  title: string;
  defaultValue: string;
  updateValue: Dispatch<SetStateAction<string>>;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export default function Entry({
  title,
  defaultValue,
  updateValue,
  setChanges,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e.currentTarget.value);
    setChanges(true);
  };

  return (
    <div className="m-3">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        defaultValue={defaultValue}
        onChange={handleChange}
      ></Form.Control>
    </div>
  );
}
