import { useEffect, useState } from "react";
import SizingViewContent from "../Sizing/Sizing/SizingViewContent";
import SizingFormView from "../Sizing/Sizing/SizingFormView";

import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";

function SizingViewTabbed() {
  return (
    <>
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
    </>
  );
}

function SizingView() {
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    nr_representative_days: 0,
    meter_ids: [],
    sizing_params_by_meter: null,
  });
  useEffect(() => getOrderData(orderId, setFetchData), [orderId]);
  return fetchData ? (
    <SizingViewContent
      data={fetchData}
      meterId={meterId}
      setMeterId={setMeterId}
      ids={formData.meter_ids}
    />
  ) : (
    <SizingFormView
      onSubmit={(hasAssets) => getOrder(setOrderId, hasAssets, setMeterId, formData)}
      setFormData={setFormData}
      formData={formData}
    />
  );
}

function getOrder(setOrderId, hasAssets, setMeterId, formData) {
  const path = hasAssets
    ? "sizing_with_shared_assets"
    : "sizing_without_shared_assets";
  console.log(formData);
  if (
    formData.start_date !== null &&
    formData.end_date !== null &&
    formData.meter_ids.length !== 0
  ) {
    console.log(formData);
    document.body.style.cursor = "wait";
    fetch(`http://localhost:8000/${path}`, {
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
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError.detail);
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

    setMeterId(Array.from(formData.meter_ids)[0]);
  }
}

function getOrderData(orderId, setFetchData) {
  if (orderId !== null) {
    fetch(`http://localhost:8000/get_sizing/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        setFetchData(data);
        document.body.style.cursor = "default";
      })
      .catch((error) => {
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError);
              if (error.status > 200 && error.status < 300)
                return new Promise(() => {
                  setTimeout(() => getOrderData(orderId, setFetchData), 1000);
                });
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
  }
}

export default SizingViewTabbed;
