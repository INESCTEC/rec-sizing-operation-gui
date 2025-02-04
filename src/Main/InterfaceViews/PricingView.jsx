import DualView from "./PricingSubViews/DualView";
import VanillaView from "./PricingSubViews/VanillaView";
import LoopView from "./PricingSubViews/LoopView";
import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";
import { useContext } from "react";
import { MeterContext } from "../Interface";
import { Redirect } from "../Navigation/Redirect";

function PricingView() {
  const { allMeters, _ } = useContext(MeterContext);

  if (allMeters.length == 0) {
    return <Redirect></Redirect>
  }

  return (
    <>
      <div>
        <Tabs>
          <TabList aria-label="List of tabs">
            <Tab className={styles.tab}>Vanilla</Tab>
            <Tab className={styles.tab}>Dual</Tab>
            <Tab className={styles.tab}>Loop</Tab>
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
  );
}

export default PricingView;
