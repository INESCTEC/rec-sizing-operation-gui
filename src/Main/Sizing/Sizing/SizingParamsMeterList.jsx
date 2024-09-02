import { useEffect, useState, useContext } from "react";
import SizingParamsMeter from "./SizingParamsMeter";
import MeterInput from "../../SharedModules/MeterInput";

import { MeterContext } from "../../Interface";
import { Accordion, AccordionItem } from "@carbon/react";

export default function SizingParamsMeterList({ setMeterParams }) {
  const [meterList, setMeterList] = useState([]);

  const { meters, setMeters } = useContext(MeterContext);

  const addMeter = (meter) =>
    setMeterList((prev) => prev.concat({ id: meter.id, meter: meter }));

  useEffect(() => {
    setMeterParams(meterList.map((meter) => meter.meter));
  }, [meterList]);

  return (
    <>
      {meters.length > 0 ? (
        <div className="margin-bot-1rem">
          <Accordion>
            {meters.map((meter) => (
              <AccordionItem key={meter + "accordion"} title={"Meter " + meter} open={true}>
                <SizingParamsMeter key={meter} id={meter} addMeter={addMeter} />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ) : undefined}
    </>
  );
}
