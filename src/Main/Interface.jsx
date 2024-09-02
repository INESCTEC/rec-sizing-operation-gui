import LeftNavBar from "./Navigation/LeftNavBar";
import { Routes, Route } from "react-router-dom";
import SearchMetersView from "./InterfaceViews/SearchMetersView";
import { createContext, useState } from "react";
import PricingView from "./InterfaceViews/PricingView";
import SizingViewTabbed from "./InterfaceViews/SizingView";

export const API_URL = {
  SIZING : 'http://localhost:8000',
  PRICING : 'http://localhost:8001'
}


export const MeterContext = createContext(null);
function Interface() {
  const [meters, setMeters] = useState(["Meter#1", "Meter#2"]);
  const allMeters = [
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
    "fbe599917f4d",
  ];

  return (
    <>
      <LeftNavBar />
      <MeterContext.Provider
        value={{ meters: meters, setMeters: setMeters, allMeters: allMeters }}
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
