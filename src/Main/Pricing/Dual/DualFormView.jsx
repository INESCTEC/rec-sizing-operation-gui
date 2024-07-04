import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Button,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import { useState } from "react";
import MeterInput from "../MeterInput";

function DualFormView({ onSubmit, setFormData }) {
  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        start_datetime: "2024-05-16T00:00:00Z", //dates[0]
        end_datetime: "2024-05-16T00:45:00Z", //dates[1]
      }));
    }
  };

  const [meters, setMeters] = useState([]);

  return (
    <>
      <div className="interface-title">Dual</div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <div className={styles.formWrapper}>
            <Form
              aria-label="sample form"
              onSubmit={(e) => {
                e.preventDefault();
                const meter_ids = meters.map((v) => v.meter);
                setFormData((prev) => ({
                  ...prev,
                  meter_ids: meter_ids,
                }));
                onSubmit();
              }}
            >
              <Stack gap={7}>
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

                <MeterInput meters={meters} setMeter={setMeters}></MeterInput>
                <Button className="primary-button" type="submit">
                  Submit
                </Button>
              </Stack>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default DualFormView;
