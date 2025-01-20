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
  const { setMeters, setAllMeters, setDataset } = useContext(MeterContext);
  const [fetchData, setFetchData] = useState(null);
  const [formData, setFormData] = useState({
    rec_location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
    dataset_origin: "default",
  });

  const setData = (data, dataset_origin) => {
    setMeters(data.meter_ids);
    setFetchData(data.meter_ids);
    setDataset(dataset_origin);
    setAllMeters(ALL_METERS[dataset_origin]);
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
  fetch(API_URL["SIZING"] + `/search_meters_in_area`, {
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
      setFetchData(data, formData.dataset_origin);
    })
    .catch((error) => {
      document.body.style.cursor = "default";
      if (typeof error.json === "function") {
        error
          .json()
          .then((jsonError) => {
            //console.log"Json error from API");
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

  document.body.style.cursor = "default";
}

const ALL_METERS = {
  SEL: [
    "00e61ee19628",
    "05a92c8c62aa",
    "0c7886733863",
    "170f37bdf13f",
    "1a9defc4ff40",
    "1bb05aef72da",
    "2e7aa1e3f706",
    "39bfae7af603",
    "3eab161b76b4",
    "493ad0182e0c",
    "4cbe01cb9cfd",
    "4f1c99c0c199",
    "6164e03bd2a7",
    "61fc5293fd52",
    "63aee2538cdc",
    "704b6f864760",
    "78c602cc58bb",
    "7ae273adbe80",
    "8861e8af7053",
    "8cc637b3bb53",
    "92eac9402957",
    "94f356c4717c",
    "a76698a2563f",
    "aa0ed5960c57",
    "ad1fdca09bb0",
    "b27a89d8336c",
    "bcb843d5c0c6",
    "d1cbe72edcb6",
    "d1e49ca67e63",
    "dead79656d17",
    "f3c07b9293f7",
    "f4a53aae164a",
    "f4f44dd669e8",
    "fbe599917f4d"
  ],
  INDATA: [
    "0cb815fd4dec",
    "0cb815fd32d4",
    "0cb815fd4bcc",
    "0cb815fc5350",
    "0cb815fd5af8",
    "0cb815fcc358",
    "34987a685128",
    "0cb815fd1dc0",
    "0cb815fcc31c",
    "0cb815fcf5b4",
    "0cb815fd15bc",
    "0cb815fd4b30",
    "0cb815fc72bc",
    "0cb815fd3608",
    "34987a675924",
    "0cb815fcc220",
    "0cb815fc6178",
    "0cb815fd1d38",
    "0cb815fd5654",
    "0cb815fd534c",
    "0cb815fcd0b4",
    "34987a676138",
    "34987a675060",
    "0cb815fd49c4",
    "34987a674af0",
  ],
};

export default SearchMetersView;
