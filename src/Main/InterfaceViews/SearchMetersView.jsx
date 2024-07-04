import { useState } from "react";
import SearchMetersViewContent from "../Sizing/SearchMeters/SearchMetersViewContent";
import SearchMetersFormView from "../Sizing/SearchMeters/SearchMetersFormView";

function SearchMetersView() {
  const [fetchData, setFetchData] = useState(null);
  const [formData, setFormData] = useState({
    rec_location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 0,
  });

  return (
    <>
      <div className="interface-title">Search Meters</div>
      {fetchData ? (
        <SearchMetersViewContent data={fetchData} />
      ) : (
        <SearchMetersFormView
          onSubmit={() => getData(setFetchData, formData)}
          setFormData={setFormData}
        />
      )}
    </>
  );
}

function getData(setFetchData, formData) {
  document.body.style.cursor = "wait";
  fetch(`http://localhost:8001/search_meters_in_area`, {
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
      document.body.style.cursor = "default";
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

export default SearchMetersView;
