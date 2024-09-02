import { useState, useContext } from "react";
import SearchMetersViewContent from "../Sizing/SearchMeters/SearchMetersViewContent";
import SearchMetersFormView from "../Sizing/SearchMeters/SearchMetersFormView";
import { MeterContext } from "../Interface";
import { Tabs, Tab, TabList, TabPanel, TabPanels } from "@carbon/react";

import styles from "../InterfaceContent.module.css";
import { API_URL } from "../Interface";

function SearchMetersView() {
  return (
    <>
      <div className="card-wrapper">
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab className={styles.tab}>Search Meters</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SearchMetersViewB />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  );
}

function SearchMetersViewB() {
  const { setMeters } = useContext(MeterContext);
  const [fetchData, setFetchData] = useState(null);
  const [formData, setFormData] = useState({
    rec_location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    dataset_origin: "default",
  });

  const setData = (data) => {
    setMeters(data);
    setFetchData(data);
  };

  return (
    <>
      {fetchData ? (
        <SearchMetersViewContent data={fetchData} />
      ) : (
        <SearchMetersFormView
          onSubmit={() => getData(setData, formData)}
          setFormData={setFormData}
        />
      )}
    </>
  );
}

function getData(setFetchData, formData) {
  document.body.style.cursor = "wait";
  fetch(API_URL['SIZING'] + `/search_meters_in_area`, {
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
      setFetchData(data);
    })
    .catch((error) => {
      document.body.style.cursor = "default";
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

  document.body.style.cursor = "default";
}

export default SearchMetersView;
