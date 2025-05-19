import { useEffect, useState, useContext } from "react";
import SizingViewContent from "../Sizing/SizingViewContent";
import SizingFormView from "../Sizing/SizingFormView";
import WaitingPage from "../Navigation/WaitingPage";

import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";

import { MeterContext } from "../Interface";
import { useNotification } from "../../Notification/NotificationProvider";
import { API_URL } from "../Interface";
import { Redirect } from "../Navigation/Redirect";

function SizingViewTabbed() {
  const { allMeters, _ } = useContext(MeterContext);

  if (allMeters.length == 0) {
    return <Redirect></Redirect>;
  }

  return (
    <>
      <div>
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
  );
}

function SizingView() {
  const notification = useNotification();
  const { meters, sharedMetersL, dataset } = useContext(MeterContext);
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [cluster, setCluster] = useState(false);
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    dataset_origin: dataset,
    nr_representative_days: 0,
    meter_ids: meters,
    sizing_params_by_meter: null,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      meter_ids: meters,
    }));
  }, [meters]);

  useEffect(
    () => getOrderData(orderId, cluster, setFetchData, notification),
    [orderId]
  );
  return orderId ? (
    fetchData ? (
      <SizingViewContent
        data={fetchData}
        meterId={meterId}
        setMeterId={setMeterId}
        ids={formData.meter_ids.concat(sharedMetersL)}
        clustered={cluster}
      />
    ) : (
      <WaitingPage />
    )
  ) : (
    <SizingFormView
      onSubmit={(hasAssets) => {
        getOrder(
          setOrderId,
          setCluster,
          hasAssets,
          setMeterId,
          formData,
          notification
        );
      }}
      setFormData={setFormData}
      formData={formData}
    />
  );
}

function getOrder(
  setOrderId,
  setCluster,
  hasAssets,
  setMeterId,
  formData,
  notification
) {
  const path = hasAssets
    ? "sizing_with_shared_assets"
    : "sizing_without_shared_assets";
  //console.logformData);
  if (
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(API_URL["SIZING"] + `${path}`, {
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
        setCluster(formData.nr_representative_days > 0);
        setMeterId(Array.from(formData.meter_ids)[0]);
      })
      .catch((error) => {
        document.body.style.cursor = "default";
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
}

function getOrderData(orderId, cluster, setFetchData, notification) {
  if (orderId !== null) {
    let link = cluster
      ? API_URL["SIZING"] + `get_clustered_sizing/${orderId}`
      : API_URL["SIZING"] + `get_sizing/${orderId}`;
    fetch(link)
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
              //console.log"Json error from API");
              //console.logjsonError);
              notification.setNotification(jsonError.message);
              if (error.status > 200 && error.status < 300)
                return new Promise(() => {
                  setTimeout(
                    () =>
                      getOrderData(
                        orderId,
                        cluster,
                        setFetchData,
                        notification
                      ),
                    5000
                  );
                });
            })
            .catch((_) => {
              //console.log"Generic error from API");
              //console.logerror);
              notification.setNotification(error.statusText);
            });
        } else {
          //console.log"Fetch error");
          //console.logerror);
        }
      });
  }

  document.body.style.cursor = "default";
}

export default SizingViewTabbed;
