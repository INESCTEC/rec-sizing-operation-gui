import { useContext } from "react";

import { Checkbox } from "@carbon/react";
import { MeterContext } from "../Interface";

export default function MeterInput() {
  const { meters, setMeters, allMeters } = useContext(MeterContext);
  let updateSelected = (meter, checked) => {
    //console.log"State: " + meter + " " + checked);
    setMeters((prev) => {
      let newArr = prev;
      if (checked && !meters.includes(meter)) {
        newArr = prev.concat(meter);
        //console.log"Adding " + meter);
      } else if (!checked && meters.includes(meter)) {
        newArr = prev.filter((value) => meter !== value);
        //console.log"Removing " + meter);
      }
      return newArr;
    });
  };

  return (
    <>
      <div className="card-wrapper">
        <div className="card-header">
          <p>Meter Selection</p>
        </div>
        <div className="card-body">
          <div className="card-body">
            <div className="card-header"></div>
            <div className="row">
              {allMeters.map((value) => (
                <div
                  key={"Meter " + value}
                  className="row flex-just-center flex-align-end"
                  style={{
                    marginBottom: "0.5rem",
                    marginRight: "1.75rem",
                    marginLeft: "1.75rem",
                  }}
                >
                  <Checkbox
                    id={"select-" + value}
                    className="meter-input"
                    labelText={value}
                    checked={meters.includes(value)}
                    onChange={(_, { checked }) =>
                      updateSelected(value, checked)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
