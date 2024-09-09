import { useEffect, useState, useContext } from "react";
import SizingViewContent from "../Sizing/Sizing/SizingViewContent";
import SizingFormView from "../Sizing/Sizing/SizingFormView";
import SearchMetersView from "./SearchMetersView";

import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";

import { MeterContext } from "../Interface";
import { useNotification } from "../../Notification/NotificationProvider";
import { API_URL } from "../Interface";

function SizingViewTabbed() {
  const { allMeters, _ } = useContext(MeterContext);
  return allMeters.length > 0 ? (
    <>
      <div className="card-wrapper">
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab className={styles.tab}>Sizing</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SizingView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  ) : (
    <SearchMetersView></SearchMetersView>
  );
}

function SizingView() {
  const notification = useNotification();
  const { meters, dataset } = useContext(MeterContext);
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    //dataset_origin: dataset,
    nr_representative_days: 1,
    meter_ids: meters,
    sizing_params_by_meter: null,
  });


  //TODO Update here to the commented code to use non-testing data
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      //meter_ids: meters
      meter_ids: ["Meter#1", "Meter#2"],
    }));
  }, [meters]);

  useEffect(
    () => getOrderData(orderId, setFetchData, notification, 3),
    [orderId]
  );
  return fetchData ? (
    <SizingViewContent
      data={fetchData}
      meterId={meterId}
      setMeterId={setMeterId}
      ids={formData.meter_ids}
    />
  ) : (
    <SizingFormView
      onSubmit={(hasAssets) => {
        getOrder(setOrderId, hasAssets, setMeterId, formData, notification);
      }}
      setFormData={setFormData}
      formData={formData}
    />
  );
}

function getOrder(setOrderId, hasAssets, setMeterId, formData, notification) {
  const path = hasAssets
    ? "sizing_with_shared_assets"
    : "sizing_without_shared_assets";
  console.log(formData);
  if (
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(API_URL["SIZING"] + `/${path}`, {
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
        setMeterId(Array.from(formData.meter_ids)[0]);
      })
      .catch((error) => {
        document.body.style.cursor = "default";
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError.detail);
              notification.setNotification(jsonError.detail.message);
            })
            .catch((_) => {
              console.log("Generic error from API");
              console.log(error.statusText);
            });
        } else {
          console.log("Fetch error");
          console.log(error);
        }
      });
  } else {
    notification.setNotification(
      "Please fill all required fields before submitting."
    );
  }
}

function getOrderData(orderId, setFetchData, notification, retrys) {
  if (orderId !== null && retrys > 0) {
    fetch(API_URL["SIZING"] + `/get_sizing/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        if (data.milp_status !== "Optimal") {
          notification.setNotification(
            "Something went wrong. Please try again."
          );
          return;
        }
        setFetchData(data);
      })
      .catch((error) => {
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError);
              notification.setNotification(jsonError.message);
              if (error.status > 200 && error.status < 300)
                return new Promise(() => {
                  setTimeout(
                    () =>
                      getOrderData(
                        orderId,
                        setFetchData,
                        notification,
                        retrys - 1
                      ),
                    5000
                  );
                });
            })
            .catch((_) => {
              console.log("Generic error from API");
              console.log(error);
              notification.setNotification(error.statusText);
            });
        } else {
          console.log("Fetch error");
          console.log(error);
        }
      });
  }

  document.body.style.cursor = "default";
}

export default SizingViewTabbed;
