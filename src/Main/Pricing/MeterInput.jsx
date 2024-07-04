import { useState } from "react";

import { Button, TextInput } from "@carbon/react";

import { TrashCan } from "@carbon/icons-react";

export default function MeterInput({ meters, setMeter }) {
  const [id, setId] = useState(0);
  return (
    <>
      {meters.length > 0 ? (
        <div className="card-wrapper">
          <div className="card-header"><p>Meters</p></div>
          <div className="card-body">
            {meters.map((value) => (
              <div 
                key={"Meter " + value.id}
                className="row flex-just-center flex-align-end"
                style={{ marginBottom: "1rem" }}
              >
                <TextInput
                  labelText={"Meter Id"}
                  style={{ marginRight: "1rem" }}
                  id={"" + value.id}
                  placeholder="Meter#ID"
                  value={value.meter}
                  onChange={(e) =>
                    setMeter((prev) => {
                      const newArr = prev.filter(
                        (meter) => meter.id !== value.id
                      );
                      newArr.push({ id: value.id, meter: e.target.value });
                      return newArr.sort((v1,v2) => v1.id-v2.id);
                    })
                  }
                />
                <button
                  className="primary-button normal-text"
                  style={{height: "2.5rem", cursor: "pointer"}}
                  onClick={() => {
                    setMeter((prev) =>
                      prev.filter((meter) => meter.id !== value.id)
                    );
                  }}
                >
                  <TrashCan style={{height: '16px', width: '16px'}}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : undefined}
      <Button
        className="primary-button"
        onClick={() => {
          setMeter((prev) => {
            const metersNew = prev.concat({ id: id + 1, meter: "Meter#" + (id+1) });
            return metersNew;
          });
          setId((prev) => prev + 1);
        }}
      >
        Add Meter
      </Button>
    </>
  );
}
