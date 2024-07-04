import DualView from "./DualView";
import VanillaView from "./VanillaView";
import LoopView from "./LoopView";
import styles from "../InterfaceContent.module.css";

import { Tabs, TabList, Tab, TabPanel, TabPanels } from "@carbon/react";

function PricingView() {
  return (
    <>
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
    </>
  );
}

export default PricingView;
