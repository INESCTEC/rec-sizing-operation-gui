import { useEffect, useState, useContext } from "react";
import SizingParamsMeter from "./SizingParamsMeter";

import { MeterContext } from "../Interface";
import { Accordion, AccordionItem } from "@carbon/react";

export default function SizingParamsMeterList({ setMeterParams }) {
  const [meterList, setMeterList] = useState([]);

  const { meters } = useContext(MeterContext);

  const addMeter = (meter) =>
    setMeterList((prev) => {
      let idx = prev.map(currMeter => currMeter.meter_id).indexOf(meter.meter_id);
      if (idx == -1){
        return prev.concat(meter);
      } else{
        let newArr = prev.slice();
        newArr[idx] = meter;
        return newArr;
      }
    });

  useEffect(() => {
    setMeterParams(meterList);
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
