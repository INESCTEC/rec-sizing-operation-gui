import LeftNavBar from "./Navigation/LeftNavBar";
import { Routes, Route } from "react-router-dom";
import SizingView from "./InterfaceViews/SizingView";
import SearchMetersView from "./InterfaceViews/SearchMetersView";
import { useState } from "react";
import PricingView from "./InterfaceViews/PricingView";
import SizingViewTabbed from "./InterfaceViews/SizingView";

function Interface() {
  const [hidden, setHidden] = useState(false);
  const margin = hidden ? 'margin-left-3-5-rem':'margin-left-15-rem'
  return (
    <>
      <LeftNavBar hidden={hidden} setHidden={setHidden} />
      <div className={`interface-container ${margin}`}>
        <Routes>
          <Route path="/pricing" element={<PricingView/>} />
          <Route path="/meters" element={<SearchMetersView />} />
          <Route path="/sizing" element={<SizingViewTabbed />} />
        </Routes>
      </div>
    </>
  );
}

export default Interface;
