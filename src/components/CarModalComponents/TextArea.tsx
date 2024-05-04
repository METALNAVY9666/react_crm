import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";

interface Props {
  title: string;
  defaultValue: string;
  setState: Dispatch<SetStateAction<string>>;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export default function TextArea({
  title,
  defaultValue,
  setState,
  setChanges,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.currentTarget.value);
    setChanges(true);
  };

  return (
    <div className="m-3">
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  );
}
