import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Button,
  NumberInput,
  Checkbox,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import SizingParamsMeterList from "./SizingParamsMeterList";
import SizingParamsSharedMeter from "./SizingParamsSharedMeter";
import { useState, useContext } from "react";
import MeterInput from "../../SharedModules/MeterInput";
import { MeterContext } from "../../Interface";

function SizingFormView({ onSubmit, setFormData }) {
  const { meters, allMeters } = useContext(MeterContext);
  const [hasSharedMeter, setHasSharedMeter] = useState(false);
  const [numDays, setNumDays] = useState(1);
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

  const removeSharedMeter = () => {
    setFormData((prevFormData) => {
      const form = { ...prevFormData };
      delete form.sizing_params_for_shared_meter;
      delete form.ownerships;
      return form;
    });
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <Form
          aria-label="sample form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(hasSharedMeter);
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
                <span style={{ width: "100%", gap: "10px", alignItems:"flex-end" }} className="row">
                  <span>
                  <NumberInput
                    label="Number of Representative Days"
                    placeholder="1"
                    id="number-input"
                    min={1}
                    value={numDays}
                    max={numDays}
                    onChange={(_, state) => setDay(state.value)}
                  ></NumberInput>
                  </span>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      paddingBottom: "12px"
                    }}
                  >
                    Maximum days: {numDays}
                  </div>
                </span>
              </Stack>
            </div>
          </div>

          <MeterInput></MeterInput>
          <div className="card-wrapper">
            <div className="card-header">
              <p>Meters Parameters</p>
            </div>
            <div className="card-body">

              <SizingParamsMeterList setMeterParams={setMeterParams} />
              <Checkbox
                labelText="With Shared Resources"
                id="checkbox-0"
                checked={hasSharedMeter}
                onChange={(_, { checked }) => {
                  setHasSharedMeter(checked);
                  if (!checked) removeSharedMeter();
                }}
              />

              {hasSharedMeter ? (
                <span>
                  <div className="card-wrapper">
                    <div className="card-header">
                      <p>Shared Meter</p>
                    </div>
                    <div className="card-body">
                      <SizingParamsSharedMeter
                        setFormData={setFormData}
                        selected={meters}
                      />
                    </div>
                  </div>
                </span>
              ) : undefined}
            </div>
          </div>
          <div className="row flex-just-end">
            <Button className="primary-button" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default SizingFormView;
