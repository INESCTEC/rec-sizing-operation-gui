import { useEffect, useState, useContext } from "react";
import VanillaViewContent from "../Pricing/Vanilla/VanillaViewContent";
import VanillaFormView from "../Pricing/Vanilla/VanillaFormView";
import { MeterContext } from "../Interface";
import { useNotification } from "../../Notification/NotificationProvider";
import { API_URL } from "../Interface";

function VanillaView() {
  const notification = useNotification();
  const { meters, dataset } = useContext(MeterContext);
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
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

  useEffect(() => getOrderData(orderId, setFetchData, notification), [orderId]);

  return (
    <>
      {fetchData ? (
        <VanillaViewContent data={fetchData} />
      ) : (
        <VanillaFormView
          onSubmit={(pricing_mechanism) => {
            getOrder(setOrderId, pricing_mechanism, formData, notification);
          }}
          setFormData={setFormData}
          selectedMeters={meters}
        />
      )}
    </>
  );
}

function getOrder(setOrderId, pricing_mechanism, formData, notification) {
  if (
    pricing_mechanism !== "default" &&
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(API_URL["PRICING"] + `/vanilla/${pricing_mechanism}`, {
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
}

function getOrderData(orderId, setFetchData, notification) {
  if (orderId !== null) {
    fetch(API_URL["PRICING"] + `/vanilla/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
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
                    () => getOrderData(orderId, setFetchData, notification),
                    5000
                  );
                });
            })
            .catch((_) => {
              //console.log"Generic error from API");
              //console.logerror.statusText);
              notification.setNotification(error.statusText);
            });
        } else {
          //console.log"Fetch error");
          //console.logerror);
          notification.setNotification("Failed to fetch.");
        }
      });
  }

  document.body.style.cursor = "default";
}

export default VanillaView;
