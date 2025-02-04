import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Select,
  SelectItem,
  Button,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import { useState, useContext, useEffect } from "react";
import MeterInput from "../../SharedModules/MeterInput";
import PricingParams from "../PricingParams/PricingParams";
import { useNotification } from "../../../Notification/NotificationProvider";
import { MeterContext } from "../../Interface";
import { API_URL } from "../../Interface";

function VanillaFormView({ setOrderId }) {
  const notification = useNotification();
  const default_value = { meter_installed_pv_capacities : {installed_pv_capacity: ''} };
  const { meters, dataset } = useContext(MeterContext);

  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: meters,
    dataset_origin: dataset,
    sdr_compensation: 0,
    mmr_divisor: 2,
  });
  const [select, setSelect] = useState("default");
  const options = ["crossing_value", "mmr", "sdr"];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      meter_ids: meters
    }));
  }, [meters]);

  const getOrder = () => {
    if (
      select !== "default" &&
      formData.start_datetime !== null &&
      formData.end_datetime !== null &&
      formData.meter_ids.length !== 0
    ) {
      document.body.style.cursor = "wait";
      fetch(API_URL["PRICING"] + `/vanilla/${select}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (!res.ok) return Promise.reject(res);
          return res.json();
        })
        .then((data) => {
          setOrderId(data.order_id);
        })
        .catch((error) => {
          document.body.style.cursor = "default";
          if (typeof error.json === "function") {
            error
              .json()
              .then((jsonError) => {
                //console.log"Json error from API");
                notification.setNotification(jsonError.detail[0].msg);
                //console.logjsonError.detail);
              })
              .catch((_) => {
                //console.log"Generic error from API");
                //console.logerror.statusText);
              });
          } else {
            //console.log"Fetch error");
            //console.logerror);
          }
        });
    } else {
      notification.setNotification(
        "Please fill all required fields before submitting."
      );
    }
  };
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
            getOrder();
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
          <PricingParams
            default_value={default_value}
            setUpdateForm={setFormData}
            sharedMeters={false}
          ></PricingParams>
          <PricingParams
            default_value={default_value}
            setUpdateForm={setFormData}
            sharedMeters={true}
          ></PricingParams>
          <div className="row flex-end">
            <Button className="primary-button mt-1" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default VanillaFormView;
