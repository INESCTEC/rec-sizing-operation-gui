import { NumberInput} from "@carbon/react";

import styles from "./SizingViewContent.module.css";
import { useEffect, useState } from "react";
import { Stack } from "@carbon/react";

function SizingParamsMeter({ id, addMeter }) {
  const [meter, setMeter] = useState({
    meter_id: id,
    power_energy_ratio: 1,
    minimum_new_storage_capacity: 0,
    maximum_new_storage_capacity: 10,
    l_bic: 10,
    soc_min: 0,
    soc_max: 100,
    eff_bc: 100,
    eff_bd: 100,
    deg_cost: 0.01,
    minimum_new_pv_power: 0,
    maximum_new_pv_power: 10,
    l_gic: 10,
  });

  const descriptionA = {
    power_energy_ratio:
      "Power/energy [kW/kWh] ratio of the newly installed storage capacity.",
    minimum_new_storage_capacity:
      "Minimum newly installed storage capacity, in kWh.",
    maximum_new_storage_capacity:
      "Maximum newly installed storage capacity, in kWh.",
    l_bic: "Cost of installing new battery capacity, in €/kWh.",
    soc_min: "Minimum state-of-charge of the battery to be installed, in %.",
    soc_max: "Maximum state-of-charge of the battery to be installed, in %.",
    eff_bc: "Charging efficiency of the battery to be installed, in %.",
    eff_bd: "Discharging efficiency of the battery to be installed, in %.",
    deg_cost: "Degradation cost of the battery to be installed, in €/kWh.",
  };

  const descriptionB = {
    minimum_new_pv_power: "Minimum newly installed PV capacity, in kW.",
    maximum_new_pv_power: "Maximum newly installed PV capacity, in kW.",
    l_gic: "Cost of installing new PV, in €/kW.",
  };

  useEffect(() => addMeter(meter), [meter]);
  return (
    <>
      <Stack gap={7}>
        <div>
          <p className="bold margin-bot-0-8rem">Storage</p>
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {Object.entries(meter)
                .filter((m) => Object.keys(descriptionA).includes(m[0]))
                .map(([key, value]) => (
                  <NumberInput
                    label={descriptionA[key]}
                    id={key + id + "s"}
                    key={key + id + "s"}
                    className={styles.numberInput}
                    min={0}
                    value={value}
                    step={0.000000000000001}
                    hideSteppers={true}
                    onChange={(_, state) =>
                      setMeter((prev) => ({
                        ...prev,
                        [key]: state.value,
                      }))
                    }
                  />
                ))}
            </div>
          </div>
        </div>
        <div>
          <p className="bold margin-bot-0-8rem">PV</p>
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {Object.entries(meter)
                .filter((m) => Object.keys(descriptionB).includes(m[0]))
                .map(([key, value]) => (
                  <NumberInput
                    label={descriptionB[key]}
                    id={key + id + "s"}
                    key={key + id + "s"}
                    className={styles.numberInput}
                    min={0}
                    value={value}
                    step={0.000000000000001}
                    hideSteppers={true}
                    onChange={(_, state) =>
                      setMeter((prev) => ({
                        ...prev,
                        [key]: state.value,
                      }))
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

export default SizingParamsMeter;
