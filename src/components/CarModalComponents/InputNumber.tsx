import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

interface Props {
  title: string;
  defaultValue: number;
  setState: Dispatch<SetStateAction<number>>;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export default function InputNumber({
  title,
  defaultValue,
  setState,
  setChanges,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.currentTarget.value);
    if (isNaN(number) || number < 0) {
      return;
    }
    setState(number);
    setChanges(true);
  };
  return (
    <div className="m-3">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type="text"
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  );
}
