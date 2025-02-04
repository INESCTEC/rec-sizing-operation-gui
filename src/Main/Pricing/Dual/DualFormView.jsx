import {
  DatePicker,
  DatePickerInput,
  Form,
  Stack,
  Button,
} from "@carbon/react";
import styles from "../../InterfaceContent.module.css";
import { useState, useEffect, useContext } from "react";
import MeterInput from "../../SharedModules/MeterInput";
import { useNotification } from "../../../Notification/NotificationProvider";
import { MeterContext } from "../../Interface";
import PricingParams from "../PricingParams/PricingParams";
import { API_URL } from "../../Interface";

function DualFormView({ setOrderId, setMeters }) {
  const notification = useNotification();
  const default_value = {
    meter_installed_pv_capacities: { installed_pv_capacity: -1 },
    meter_contracted_power: {
      contracted_power: -1,
    },
    meter_storage: {
      deg_cost: -1,
      e_bn: -1,
      eff_bc: -1,
      eff_bd: -1,
      p_max: -1,
      soc_max: -1,
      soc_min: -1,
    },
  };
  const { meters, dataset } = useContext(MeterContext);
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: meters,
    dataset_origin: dataset,
  });

  const setDates = (dates) => {
    if (dates.length > 1) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        start_datetime: dates[0],
        end_datetime: dates[1],
      }));
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      meter_ids: meters
    }));
  }, [meters]);

  const getOrder = () => {
    if (
      formData.start_datetime !== null &&
      formData.end_datetime !== null &&
      formData.meter_ids.length !== 0
    ) {
      document.body.style.cursor = "wait";
      fetch(API_URL['PRICING'] + `/dual/`, {
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
          setMeters([...formData.meter_ids, ...formData.shared_meter_ids])
        })
        .catch((error) => {
          if (typeof error.json === "function") {
            error
              .json()
              .then((jsonError) => {
                //console.log"Json error from API");
                //console.logjsonError.detail);
                notification.setNotification(jsonError.detail.message);
              })
              .catch((_) => {
                //console.log"Generic error from API");
                notification.setNotification(error.statusText);
  
                //console.logerror.statusText);
              });
          } else {
            //console.log"Fetch error");
            //console.logerror);
          }
        });
    } else {
      notification.setNotification("Please fill all required fields before submitting.");
    }
  }

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
