import { Button, Accordion, AccordionItem } from "@carbon/react";

import PricingParamsMeter from "./PricingParamsMeter";
import { useState, useEffect, useContext } from "react";
import { MeterContext } from "../../Interface";

function PricingParams({ default_value, setUpdateForm, sharedMeters = false }) {
  const [newMeters, setMeters] = useState({});
  const [serialNumber, setSerialNumber] = useState(0);
  let curr_value = JSON.parse(JSON.stringify(default_value));

  const addMeter = (id) => {
    setMeters((prev) => {
      let newMeters = { ...prev };
      newMeters[id] = JSON.parse(JSON.stringify(curr_value));
      return newMeters;
    });
  };

  let title = "Meter Parameters";

  if (!sharedMeters) {
    const { meters } = useContext(MeterContext);
    useEffect(() => {
      let base_meters = {};
      for (let meter of meters) {
        base_meters[meter] = JSON.parse(JSON.stringify(curr_value));
      }
      setMeters(base_meters);
    }, [meters]);
  } else {
    title = "Shared " + title;
    curr_value = {
      ...JSON.parse(JSON.stringify(curr_value)),
      meter_id: "SharedMeter#" + serialNumber,
    };
  }

  useEffect(() => {
    setUpdateForm((prev) => {
      let form_obj = {};
      let shared_meter_ids = []
      for (let [key, value] of Object.entries(newMeters)) {
        // Para cada meter
        key = sharedMeters ? value["meter_id"]: key;
        shared_meter_ids.push(key)
        for (let [i_key, i_value] of Object.entries(value)) {
          // Para cada estrutura
          if (i_key !== "meter_id") {
            let form_key = sharedMeters ? "shared_" + i_key : i_key;
            if (form_obj[form_key] === undefined) {
              form_obj[form_key] = [];
            }
            let inner_obj = {};
            for (let [i_i_key, i_i_value] of Object.entries(i_value)) {
              if (i_i_value !== '') {
                inner_obj[i_i_key] = i_i_value;
              }
            }
            if (Object.keys(inner_obj).length > 0) {
              inner_obj["meter_id"] = key;
              form_obj[form_key].push(inner_obj);
            }
          }
        }
      }
      //console.log(form_obj)
      if (sharedMeters) form_obj["shared_meter_ids"] = shared_meter_ids;

      return { ...prev, ...form_obj };
    });
  }, [newMeters]);

  return (
    <>
      {Object.keys(newMeters).length > 0 ? (
        <div className="card-wrapper">
          <div className="card-header">
            <p>{title}</p>
          </div>
          <div className="card-body">
            <Accordion>
              {Object.keys(newMeters).map((currSerial) => (
                <AccordionItem
                  key={currSerial + "accordion"}
                  title={
                    sharedMeters ? "SharedMeter#" + currSerial : currSerial
                  }
                  open={true}
                >
                  <PricingParamsMeter
                    key={currSerial}
                    meter_id={currSerial}
                    meters={newMeters}
                    setMeters={setMeters}
                    sharedMeters={sharedMeters}
                  />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      ) : undefined}
      {sharedMeters ? (
        <Button
          className="primary-button mt-1"
          style={{
            justifyContent: "center",
            maxInlineSize: "100%",
          }}
          onClick={() => {
            addMeter(serialNumber);
            setSerialNumber((prev) => prev + 1);
          }}
        >
          Add Shared Meter
        </Button>
      ) : undefined}
    </>
  );
}

export default PricingParams;
