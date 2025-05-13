import { useEffect, useState, useContext } from "react";
import LoopViewContent from "../../Pricing/Loop/LoopViewContent";
import LoopFormView from "../../Pricing/Loop/LoopFormView";

import { useNotification } from "../../../Notification/NotificationProvider";
import { API_URL } from "../../Interface";
import { MeterContext } from "../../Interface";
import WaitingPage from "../../Navigation/WaitingPage";

function LoopView() {
  const notification = useNotification();
  const [meterId, setMeterId] = useState("default");
  const [fetchData, setFetchData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [lemOrganization, setLemOrganization] = useState("default");
  const [meters, setMeters] = useState([]);

  useEffect(
    () => {
      getOrderData(orderId, lemOrganization, setFetchData, notification),
      setMeterId(meters[0])
    },
    [orderId]
  );

  return  orderId ? (fetchData ? (
    <LoopViewContent
      meterId={meterId}
      setMeterId={setMeterId}
      ids={meters}
      data={fetchData}
    />
  ): <WaitingPage/>) : (
    <LoopFormView
      setLemOrganization={setLemOrganization}
      lemOrganization={lemOrganization}
      setOrderId={setOrderId}
      setMeters={setMeters}
    />
  );
}

function getOrderData(orderId, lemOrganization, setFetchData, notification) {
  if (orderId !== null) {
    fetch(API_URL["PRICING"] + `loop/${lemOrganization}/${orderId}`)
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
              //console.logjsonError);
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
        }
      });
  }
  document.body.style.cursor = "default";
}

export default LoopView;
