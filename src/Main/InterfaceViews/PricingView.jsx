import DualView from "./DualView";
import VanillaView from "./VanillaView";
import LoopView from "./LoopView";
import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";
import SearchMetersView from "./SearchMetersView";
import { useEffect, useState, useContext } from "react";
import { MeterContext } from "../Interface";

function PricingView() {
  const [state, setState] = useState("Vanilla");
  const { meters, _ } = useContext(MeterContext);

  return meters.length > 0 ? (
    <>
      <div className="card-wrapper">
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab onClick={() => setState("Vanilla")} className={styles.tab}>
              Vanilla
            </Tab>
            <Tab onClick={() => setState("Dual")} className={styles.tab}>
              Dual
            </Tab>
            <Tab onClick={() => setState("Loop")} className={styles.tab}>
              Loop
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VanillaView />
            </TabPanel>
            <TabPanel>
              <DualView />
            </TabPanel>
            <TabPanel>
              <LoopView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </>
  ) : (
    <SearchMetersView></SearchMetersView>
  );
}

export default PricingView;
