import { useEffect, useState } from "react";
import DualViewContent from "../Pricing/Dual/DualViewContent";
import DualFormView from "../Pricing/Dual/DualFormView";

function DualView() {
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: ["Meter#1", "Meter#2"],
    sdr_compensation: 0,
    mmr_divisor: 2,
  });

  useEffect(() => getOrderData(orderId, setFetchData), [orderId]);

  
  return (
      fetchData ? (
        <DualViewContent
          meterId={meterId}
          setMeterId={setMeterId}
          ids={formData.meter_ids}
          data={fetchData}
        />
      ) : (
        <DualFormView
          onSubmit={() => getOrder(setOrderId, setMeterId, formData)}
          setFormData={setFormData}
        />
      )
  );
}

function getOrder(setOrderId, setMeterId, formData) {
  if (
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(`http://localhost:8001/dual/`, {
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
    fetch(`http://localhost:8001/dual/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        //TODO ask user to rerun
        if (data.milp_status !== "Optimal") throw Error("Rerun");
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
        document.body.style.cursor = "default";
      });
  }
}

export default DualView;
