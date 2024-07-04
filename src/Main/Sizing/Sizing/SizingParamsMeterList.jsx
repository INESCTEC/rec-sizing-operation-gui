import { useEffect, useState } from "react";
import SizingParamsMeter from "./SizingParamsMeter";
import { Button } from "@carbon/react";
import { TrashCan } from "@carbon/icons-react";

export default function SizingParamsMeterList({
  setMetersIds,
  setMeterParams,
}) {
  const [meterList, setMeterList] = useState([]);
  const [id, setId] = useState(1);
  const component = (id) => (
    <>
      <SizingParamsMeter key={id} id={id} addMeter={addMeter} />
      <div className="row flex-just-center margin-top-1rem">
        <button
          className="primary-button normal-text margin-top-1rem"
          style={{ height: "2.5rem", cursor: "pointer" }}
          onClick={() => {
            setComponentList((prev) => prev.filter((comp) => comp.id !== id));
            setMeterList((prev) => prev.filter((meter) => meter.id !== id));
          }}
        >
          <TrashCan style={{ height: "16px", width: "16px" }} />
        </button>
      </div>
    </>
  );

  const addMeter = (meter) =>
    setMeterList((prev) => prev.concat({ id: id, meter: meter }));

  const [componentList, setComponentList] = useState([
  ]);

  useEffect(() => {
    setMeterParams(meterList.map((meter) => meter.meter));
    setMetersIds(meterList.map((meter) => meter.meter.meter_id));
  }, [meterList]);

  const onClick = () => {
    setComponentList((prev) =>
      prev.concat({
        id: id,
        component: component(id),
      })
    );
    setId((prev) => prev + 1);
  };

  return (
    <>
      {componentList.length > 0 ? (
        <span>
          {componentList.map((meter) => (
            <div className="card-wrapper" key={meter.id}>
              <div className="card-header">
                <p>Meters</p>
              </div>
              <div className="card-body">{meter.component}</div>
            </div>
          ))}
        </span>
      ) : undefined}
      <Button className="primary-button" onClick={onClick}>
        Add Meter
      </Button>
    </>
  );
}
