import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Button,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import { useState } from "react";
import MeterInput from "../../SharedModules/MeterInput";

function DualFormView({ onSubmit, setFormData }) {
  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        start_datetime: dates[0],
        end_datetime: dates[1],
      }));
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <Form
          aria-label="sample form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="card-wrapper">
            <div className="card-header">
              <p>Dates</p>
            </div>
            <div className="card-body">
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
              </Stack>
            </div>
          </div>
          <MeterInput></MeterInput>

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

export default DualFormView;
