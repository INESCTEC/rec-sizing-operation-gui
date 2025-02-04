import { useEffect, useState, useContext } from "react";
import DualViewContent from "../../Pricing/Dual/DualViewContent";
import DualFormView from "../../Pricing/Dual/DualFormView";

import { useNotification } from "../../../Notification/NotificationProvider";
import { API_URL } from "../../Interface";
import WaitingPage from "../../Navigation/WaitingPage";

function DualView() {
  const notification = useNotification();
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [meterId, setMeterId] = useState("default");
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    getOrderData(orderId, setFetchData, notification), setMeterId(meters[0]);
  }, [orderId]);

  return orderId ? (
    fetchData ? (
      <DualViewContent
        meterId={meterId}
        setMeterId={setMeterId}
        ids={meters}
        data={fetchData}
      />
    ) : (
      <WaitingPage />
    )
  ) : (
    <DualFormView setOrderId={setOrderId} setMeters={setMeters} />
  );
}

function getOrderData(orderId, setFetchData, notification) {
  if (orderId !== null) {
    fetch(API_URL["PRICING"] + `/dual/${orderId}`)
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
              //console.log"Json error from API");
              //console.logjsonError.message);
              if (error.status > 200 && error.status < 300)
                return new Promise(() => {
                  setTimeout(
                    () => getOrderData(orderId, setFetchData, notification),
                    5000
                  );
                });

              notification.setNotification(jsonError.message);
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
  }
  document.body.style.cursor = "default";
}

export default DualView;
