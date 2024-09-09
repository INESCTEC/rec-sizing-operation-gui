import { useEffect, useState, useContext } from "react";
import LoopViewContent from "../Pricing/Loop/LoopViewContent";
import LoopFormView from "../Pricing/Loop/LoopFormView";

import { MeterContext } from "../Interface";
import { useNotification } from "../../Notification/NotificationProvider";
import { API_URL } from "../Interface";

function LoopView() {
  const { meters, dataset } = useContext(MeterContext);

  const notification = useNotification();

  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [lemOrganization, setLemOrganization] = useState("default");
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: meters,
    dataset_origin: dataset,
    sdr_compensation: 0,
    mmr_divisor: 2,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      meter_ids: meters
    }));
  }, [meters]);
  useEffect(
    () => getOrderData(orderId, lemOrganization, setFetchData, notification),
    [orderId]
  );

  return fetchData ? (
    <LoopViewContent
      meterId={meterId}
      setMeterId={setMeterId}
      ids={formData.meter_ids}
      data={fetchData}
    />
  ) : (
    <LoopFormView
      onSubmit={(pricing_mechanism) => {
        getOrder(
          setOrderId,
          setMeterId,
          pricing_mechanism,
          lemOrganization,
          formData,
          notification
        );
      }}
      setFormData={setFormData}
      setLemOrganization={setLemOrganization}
      selectedMeters={meters}
    />
  );
}

function getOrder(
  setOrderId,
  setMeterId,
  pricing_mechanism,
  lemOrganization,
  formData,
  notification
) {
  if (
    pricing_mechanism !== "default" &&
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(
      API_URL["PRICING"] + `/loop/${lemOrganization}/${pricing_mechanism}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(formData),
      }
    )
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
              notification.setNotification(error.detail.message);
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
  } else {
    notification.setNotification(
      "Please fill all required fields before submitting."
    );
  }
}

function getOrderData(orderId, lemOrganization, setFetchData, notification) {
  if (orderId !== null) {
    fetch(API_URL["PRICING"] + `/loop/${lemOrganization}/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        //TODO ask user to rerun
        if (data.milp_status !== "Optimal") {
          notification.setNotification(
            "Something went wrong. Please try again."
          );
          return;
        }
        setFetchData(data);
      })
      .catch((error) => {
        document.body.style.cursor = "default";
        if (typeof error.json === "function") {
          error
            .json()
            .then((jsonError) => {
              console.log("Json error from API");
              console.log(jsonError);
              notification.setNotification(jsonError.message);
              if (error.status > 200 && error.status < 300) {
                return new Promise(() => {
                  setTimeout(
                    () =>
                      getOrderData(
                        orderId,
                        lemOrganization,
                        setFetchData,
                        notification
                      ),
                    5000
                  );
                });
              }
            })
            .catch((_) => {
              console.log("Generic error from API");
              console.log(error.statusText);
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

export default LoopView;
