import { useEffect, useState } from "react";
import VanillaViewContent from "../Pricing/Vanilla/VanillaViewContent";
import VanillaFormView from "../Pricing/Vanilla/VanillaFormView";

function VanillaView() {
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: ["Meter#1", "Meter#2"],
    sdr_compensation: 0,
    mmr_divisor: 2,
  });

  useEffect(() => getOrderData(orderId, setFetchData), [orderId]);

  return (
    <>
      <div className="interface-title">Vanilla</div>
      {fetchData ? (
        <VanillaViewContent data={fetchData} />
      ) : (
        <VanillaFormView
          onSubmit={(pricing_mechanism) =>
            getOrder(setOrderId, pricing_mechanism, formData)
          }
          setFormData={setFormData}
        />
      )}
    </>
  );
}

function getOrder(setOrderId, pricing_mechanism, formData) {
  if (
    pricing_mechanism !== "default" &&
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(`http://localhost:8001/vanilla/${pricing_mechanism}`, {
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
  }
}

function getOrderData(orderId, setFetchData) {
  if (orderId !== null) {
    fetch(`http://localhost:8001/vanilla/${orderId}`)
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

export default VanillaView;
