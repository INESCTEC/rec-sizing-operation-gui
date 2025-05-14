import LeftNavBar from "./Navigation/LeftNavBar";
import { Routes, Route } from "react-router-dom";
import SearchMetersView from "./InterfaceViews/SearchMetersView";
import { createContext, useState } from "react";
import PricingView from "./InterfaceViews/PricingView";
import SizingViewTabbed from "./InterfaceViews/SizingView";
import { Redirect } from "./Navigation/Redirect";

// export const API_URL = {
//   PRICING : 'https://rec-sizing.haslab-dataspace.pt/api/pricing' // missing '/',
//   ,SIZING : 'https://rec-sizing.haslab-dataspace.pt/api/sizing' // missing '/'
// }
export const API_URL = {
  PRICING : 'http://127.0.0.1:8000/',
  SIZING : 'http://127.0.0.1:8001/'
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
              element={<Redirect/>}
            />
          </Routes>
        </div>
      </MeterContext.Provider>
    </>
  );
}

export default Interface;
