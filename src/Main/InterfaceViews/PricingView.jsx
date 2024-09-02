import DualView from "./DualView";
import VanillaView from "./VanillaView";
import LoopView from "./LoopView";
import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";
import SearchMetersView from "./SearchMetersView";
import { useEffect, useState, useContext } from "react";
import { MeterContext } from "../Interface";

function PricingView() {
  const { allMeters, _ } = useContext(MeterContext);

  return allMeters.length > 0 ? (
    <>
      <div className="card-wrapper">
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab className={styles.tab}>
              Vanilla
            </Tab>
            <Tab className={styles.tab}>
              Dual
            </Tab>
            <Tab className={styles.tab}>
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
