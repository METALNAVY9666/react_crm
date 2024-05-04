import { Dispatch, SetStateAction } from "react";
import Datetime from "react-datetime";
import moment from "moment";

interface Props {
  title: string;
  defaultValue: string;
  setState: Dispatch<SetStateAction<number>>;
  setChanges?: Dispatch<SetStateAction<boolean>>;
}

export default function YearPick({
  title,
  defaultValue,
  setState,
  setChanges = () => {},
}: Props) {
  return (
    <div className="m-3">
      {title}
      <Datetime
        initialValue={defaultValue}
        dateFormat="YYYY"
        timeFormat={false}
        onChange={(m) => {
          setState((m as moment.Moment).get("year"));
          setChanges(true);
        }}
        closeOnSelect={true}
      />
    </div>
  );
}
