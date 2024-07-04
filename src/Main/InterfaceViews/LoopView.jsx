import { useEffect, useState } from "react";
import LoopViewContent from "../Pricing/Loop/LoopViewContent";
import LoopFormView from "../Pricing/Loop/LoopFormView";

function LoopView() {
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [lemOrganization, setLemOrganization] = useState("default");
  const [meterId, setMeterId] = useState("default");
  const [formData, setFormData] = useState({
    start_datetime: null,
    end_datetime: null,
    meter_ids: ["Meter#1", "Meter#2"],
    sdr_compensation: 0,
    mmr_divisor: 2,
  });

  useEffect(
    () => getOrderData(orderId, lemOrganization, setFetchData),
    [orderId]
  );

  return (fetchData ? (
        <LoopViewContent
          meterId={meterId}
          setMeterId={setMeterId}
          ids={formData.meter_ids}
          data={fetchData}
        />
      ) : (
        <LoopFormView
          onSubmit={(pricing_mechanism) =>
            getOrder(
              setOrderId,
              setMeterId,
              pricing_mechanism,
              lemOrganization,
              formData
            )
          }
          setFormData={setFormData}
          setLemOrganization={setLemOrganization}
        />
      )
  );
}

function getOrder(
  setOrderId,
  setMeterId,
  pricing_mechanism,
  lemOrganization,
  formData
) {
  if (
    pricing_mechanism !== "default" &&
    formData.start_datetime !== null &&
    formData.end_datetime !== null &&
    formData.meter_ids.length !== 0
  ) {
    document.body.style.cursor = "wait";
    fetch(
      `http://localhost:8001/loop/${lemOrganization}/${pricing_mechanism}`,
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

function getOrderData(orderId, lemOrganization, setFetchData) {
  if (orderId !== null) {
    fetch(`http://localhost:8001/loop/${lemOrganization}/${orderId}`)
      .then((res) => {
        if (res.status !== 200) {
          return Promise.reject(res);
        }
        return res.json();
      })
      .then((data) => {
        //TODO ask user to rerun
        document.body.style.cursor = "default";
        if (data.milp_status !== "Optimal") throw Error("Rerun");
        setFetchData(data);
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
                  setTimeout(
                    () => getOrderData(orderId, lemOrganization, setFetchData),
                    1000
                  );
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

export default LoopView;
