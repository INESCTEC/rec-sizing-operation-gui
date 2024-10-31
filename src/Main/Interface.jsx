import LeftNavBar from "./Navigation/LeftNavBar";
import { Routes, Route } from "react-router-dom";
import SearchMetersView from "./InterfaceViews/SearchMetersView";
import { createContext, useState } from "react";
import PricingView from "./InterfaceViews/PricingView";
import SizingViewTabbed from "./InterfaceViews/SizingView";

export const API_URL = {
  PRICING : 'http://10.61.12.61:8000',
  SIZING : 'http://localhost:8001'
}


export const MeterContext = createContext(null);
function Interface() {
  const [meters, setMeters] = useState([]);
  const [allMeters, setAllMeters] = useState([]);
  const [sharedMeters, setSharedMeters] = useState([]);
  const [dataset, setDataset] = useState(null);

  return (
    <>
      <LeftNavBar />
      <MeterContext.Provider
        value={{ meters: meters, setMeters: setMeters, allMeters: allMeters, setAllMeters: setAllMeters, dataset: dataset, setDataset: setDataset , sharedMetersL: sharedMeters, setSharedMetersL: setSharedMeters}}
      >
        <div className={`interface-container`}>
          <Routes>
            <Route path="pricing" element={<PricingView />} />
            <Route path="meters" element={<SearchMetersView />} />
            <Route path="sizing" element={<SizingViewTabbed />} />
            <Route
              path=""
              element={
                <>
                  <div
                    style={{
                      backgroundColor: "white",
                      width: "100vw",
                      height: "100vh",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      zIndex: "-1",
                    }}
                  ></div>
                  <h1 style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>
                    Empty Home Page
                  </h1>
                </>
              }
            />
          </Routes>
        </div>
      </MeterContext.Provider>
    </>
  );
}

export default Interface;
