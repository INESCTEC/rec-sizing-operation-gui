import { useEffect, useState, useContext } from "react";
import VanillaViewContent from "../../Pricing/Vanilla/VanillaViewContent";
import VanillaFormView from "../../Pricing/Vanilla/VanillaFormView";
import { useNotification } from "../../../Notification/NotificationProvider";
import { API_URL } from "../../Interface";
import WaitingPage from "../../Navigation/WaitingPage";

function VanillaView() {
  const notification = useNotification();
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => getOrderData(orderId, setFetchData, notification), [orderId]);

  return orderId ? (
    fetchData ? (
      <VanillaViewContent data={fetchData} />
    ) : (
      <WaitingPage />
    )
  ) : (
    <VanillaFormView setOrderId={setOrderId} />
  );
}

function getOrderData(orderId, setFetchData, notification) {
  if (orderId !== null) {
    fetch(API_URL["PRICING"] + `vanilla/${orderId}`)
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
