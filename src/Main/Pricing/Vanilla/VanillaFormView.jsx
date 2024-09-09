import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Select,
  SelectItem,
  Button,
  TextInput,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import { useState } from "react";
import MeterInput from "../../SharedModules/MeterInput";

function VanillaFormView({ onSubmit, setFormData }) {
  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        //start_datetime: dates[0],
        //end_datetime: dates[1],
        "start_datetime": "2024-05-16T00:00:00Z",
        "end_datetime": "2024-05-16T00:45:00Z",
      }));
    }
  };

  const [select, setSelect] = useState("default");
  const options = ["crossing_value", "mmr", "sdr"];

  return (
    <>
      <div className={styles.formWrapper}>
        <Form
          aria-label="sample form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(select);
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
                  onClose={(dates) => setDates(dates)}
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
                <Select
                  id="select-1"
                  className={styles.select}
                  defaultValue={select}
                  onChange={(e) => setSelect(e.target.value)}
                  labelText="Pricing Mechanism"
                >
                  <SelectItem
                    disabled
                    hidden
                    value="default"
                    text="Choose pricing mechanism"
                  />
                  {options.map((option) => (
                    <SelectItem key={option} value={option} text={option} />
                  ))}
                </Select>
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

export default VanillaFormView;
