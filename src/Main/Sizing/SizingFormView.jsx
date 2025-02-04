import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Button,
  NumberInput,
  Accordion,
  AccordionItem,
} from "@carbon/react";
import styles from "../InterfaceContent.module.css";
import SizingParamsMeterList from "./SizingParamsMeterList";
import SizingParamsSharedMeter from "./SizingParamsSharedMeter";
import { useState, useContext, useEffect } from "react";
import MeterInput from "../SharedModules/MeterInput";
import { MeterContext } from "../Interface";

function SizingFormView({ onSubmit, setFormData }) {
  const { meters, setSharedMetersL } = useContext(MeterContext);
  const [numDays, setNumDays] = useState(0);
  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        start_datetime: dates[0],
        end_datetime: dates[1],
      }));
      let days = Math.round(
        (dates[1].getTime() - dates[0].getTime()) / (1000 * 3600 * 24)
      );
      setNumDays(days);
      setDay(days);
    }
  };

  const setDay = (day) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nr_representative_days: day,
    }));
  };

  const setMeterParams = (current) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      sizing_params_by_meter: current,
    }));
  };

  /*
  const removeSharedMeter = () => {
    setFormData((prevFormData) => {
      const form = { ...prevFormData };
      delete form.sizing_params_for_shared_meter;
      delete form.ownerships;
      return form;
    });
  };
*/

  const [serialNumber, setSerialNumber] = useState(0);
  const [sharedMeters, setSharedMeter] = useState({});

  const addSharedMeter = (id, meter) =>
    setSharedMeter((prev) => {
      let newSharedMeters = { ...prev };
      newSharedMeters[id] = meter;
      return newSharedMeters;
    });

  const updateSharedMeter = (id, key, value) => {
    setSharedMeter((prev) => {
      let newSharedMeters = { ...prev };
      newSharedMeters[id].sizing_params_for_shared_meter[key] = value;
      return newSharedMeters;
    });
  };

  const updateOwnerships = (id, value) => {
    setSharedMeter((prev) => {
      let newSharedMeters = { ...prev };
      newSharedMeters[id].ownerships = value;
      return newSharedMeters;
    });
  };

  const removeSharedMeter = (id) =>
    setSharedMeter((prev) => {
      let newSharedMeters = { ...prev };
      delete newSharedMeters[id];
      return newSharedMeters;
    });

  useEffect(() => setSharedForm(), [sharedMeters]);

  const setSharedForm = () => {
    setFormData((prev) => ({
      ...prev,
      shared_meter_ids: Object.values(sharedMeters).map(
        (obj) => obj.sizing_params_for_shared_meter.meter_id
      ),
      ownerships: Object.values(sharedMeters)
        .map((obj) =>
          obj.ownerships.map((own) => ({
            ...own,
            shared_meter_id: obj.sizing_params_for_shared_meter.meter_id,
          }))
        )
        .flat(),
      sizing_params_for_shared_meter: Object.values(sharedMeters).map(
        (obj) => obj.sizing_params_for_shared_meter
      ),
    }));
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <Form
          aria-label="sample form"
          onSubmit={(e) => {
            e.preventDefault();
            setSharedForm();
            setSharedMetersL(Object.values(sharedMeters).map(
              (obj) => obj.sizing_params_for_shared_meter.meter_id
            ))
            onSubmit(Object.keys(sharedMeters).length > 0);
          }}
        >
          <div className="card-wrapper">
            <div className="card-header">
              <p>Dates</p>
            </div>
            <div className="card-body">
              <Stack className="form-stack" gap={7}>
                <DatePicker
                  datePickerType="range"
                  dateFormat="d/m/Y"
                  onChange={(dates) => setDates(dates)}
                >
                  <DatePickerInput
                    id="date-picker-input-id-start"
                    placeholder="dd/mm/yyyy"
                    labelText="Start date"
                    size="md"
                    autoComplete="off"
                  />
                  <DatePickerInput
                    id="date-picker-input-id-finish"
                    placeholder="dd/mm/yyyy"
                    labelText="End date"
                    size="md"
                    autoComplete="off"
                  />
                </DatePicker>
                <span
                  style={{ width: "100%", gap: "10px", alignItems: "flex-end" }}
                  className="row"
                >
                  <span>
                    <NumberInput
                      label="Number of Representative Days"
                      placeholder="0"
                      id="number-input"
                      min={0}
                      value={numDays}
                      max={numDays}
                      onChange={(_, state) => setDay(state.value)}
                    ></NumberInput>
                  </span>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      paddingBottom: "12px",
                    }}
                  >
                    Maximum days: {numDays}
                  </div>
                </span>
              </Stack>
            </div>
          </div>

          <MeterInput></MeterInput>
          {meters.length > 0 ? (
            <div className="card-wrapper">
              <div className="card-header">
                <p>Meters Parameters</p>
              </div>
              <div className="card-body">
                <SizingParamsMeterList setMeterParams={setMeterParams} />
              </div>
            </div>
          ) : undefined}
          {Object.keys(sharedMeters).length > 0 ? (
            <div className="card-wrapper">
              <div className="card-header">
                <p>Shared Meters</p>
              </div>
              <div className="card-body">
                <Accordion>
                  {Object.keys(sharedMeters).map((currSerial) => (
                    <AccordionItem
                      key={currSerial + "accordion"}
                      title={"Shared Meter"}
                      open={true}
                    >
                      <SizingParamsSharedMeter
                        updateSharedMeter={updateSharedMeter}
                        updateOwnerships={updateOwnerships}
                        removeSharedMeter={removeSharedMeter}
                        serialNumber={currSerial}
                        meterParams={
                          sharedMeters[currSerial].sizing_params_for_shared_meter
                        }
                        selected={meters}
                      />
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          ) : undefined}
          <div className="row flex-space-between">
            <Button
              className="primary-button mt-1"
              style={{
                justifyContent: "center",
                maxInlineSize: "100%",
              }}
              onClick={() => {
                addSharedMeter(serialNumber, {
                  sizing_params_for_shared_meter: {
                    meter_id: serialNumber,
                    power_energy_ratio: 1,
                    l_bic: 10,
                    minimum_new_pv_power: 0,
                    maximum_new_pv_power: 10,
                    minimum_new_storage_capacity: 0,
                    maximum_new_storage_capacity: 10,
                    l_gic: 10,
                    soc_min: 10,
                    soc_max: 10,
                    eff_bc: 10,
                    eff_bd: 10,
                    deg_cost: 10,
                  },
                  ownerships: meters.map((v) => ({
                    meter_id: v,
                    percentage: 0,
                  })),
                });
                setSerialNumber((prev) => prev + 1);
              }}
            >
              Add Shared Meter
            </Button>
            <Button className="primary-button mt-1" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SizingFormView;
