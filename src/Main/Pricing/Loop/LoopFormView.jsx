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
import MeterInput from "../MeterInput";
import { useState } from "react";

function LoopFormView({ onSubmit, setFormData, setLemOrganization }) {
  return (
    <>
      <div className="interface-title">Loop</div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <FormWrapper
            onSubmit={onSubmit}
            setFormData={setFormData}
            setLemOrganization={setLemOrganization}
          />
        </div>
      </div>
    </>
  );
}

export default LoopFormView;

function FormWrapper({ onSubmit, setFormData, setLemOrganization }) {
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

  const [select, setSelect] = useState("default");
  const options = ["crossing_value", "mmr", "sdr"];

  const options_lem = ["pool", "bilateral"];
  return (
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
          onSubmit(select);
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
          <Select
            id="select-1"
            className={styles.select}
            defaultValue={"default"}
            onChange={(e) => setLemOrganization(e.target.value)}
          >
            <SelectItem
              disabled
              hidden
              value="default"
              text="Choose an option"
            />
            {options_lem.map((option) => (
              <SelectItem key={option} value={option} text={option} />
            ))}
          </Select>
          <Select
            id="select-2"
            className={styles.select}
            defaultValue={select}
            onChange={(e) => setSelect(e.target.value)}
          >
            <SelectItem
              disabled
              hidden
              value="default"
              text="Choose an option"
            />
            {options.map((option) => (
              <SelectItem key={option} value={option} text={option} />
            ))}
          </Select>

          <MeterInput meters={meters} setMeter={setMeters}></MeterInput>
          <Button className="primary-button" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </div>
  );
}
