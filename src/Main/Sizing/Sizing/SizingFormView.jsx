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
import { useState } from "react";

function SizingFormView({ onSubmit, formData, setFormData }) {
  const [hasSharedMeter, setHasSharedMeter] = useState(false);
  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        start_datetime: "2024-05-16 00:00:00", //dates[0]
        end_datetime: "2024-05-16 00:45:00", //dates[1]
      }));
    }
  };

  const setDay = (day) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      nr_representative_days: day,
    }));
  };

  const setMeterIds = (current) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      meter_ids: current,
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
      <div className="interface-title">Calculate Sizing</div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <div className={styles.formWrapper}>
            <Form
              aria-label="sample form"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(hasSharedMeter);
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
                <span style={{ width: "18rem" }}>
                  <NumberInput
                    label="Number of Representative Days"
                    placeholder="0"
                    id="number-input"
                    min={0}
                    onChange={(_, state) => setDay(state.value)}
                  ></NumberInput>
                </span>
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
                          meterList={formData.meter_ids}
                        />
                      </div>
                    </div>
                  </span>
                ) : undefined}
                <SizingParamsMeterList setMetersIds={setMeterIds} setMeterParams={setMeterParams} />
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

export default SizingFormView;
