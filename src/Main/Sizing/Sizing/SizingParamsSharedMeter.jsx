import {
  NumberInput,
  TextInput,
  Stack,
  Select,
  SelectItem,
} from "@carbon/react";

import styles from "./SizingViewContent.module.css";
import { useEffect, useState } from "react";

function SizingParamsSharedMeter({ meterList, selected, setFormData }) {
  const [meter, setMeter] = useState({
    meter_id: "",
    power_energy_ratio: 1,
    l_bic: 10,
    minimum_new_pv_power: 0,
    maximum_new_pv_power: 10,
    minimum_new_storage_capacity: 0,
    maximum_new_storage_capacity: 10,
    l_gic: 10,
    soc_min: 10,
    soc_max: 10,
    eff_bc: 10,
    eff_bd: 10,
    deg_cost: 10,
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

  const [error, setError] = useState(false);
  const [ownerships, setOwnerships] = useState(
    selected.map((v) => ({ meter_id: v, percentage: 0 }))
  );

  useEffect(
    () =>
      setFormData((prev) => ({
        ...prev,
        sizing_params_for_shared_meter: meter,
        ownerships: ownerships,
      })),
    []
  );

  useEffect(() => {
    if (ownerships.length < selected.length) {
      setOwnerships((prev) => {
        return prev.concat({
          meter_id: selected.filter(
            (m) => !prev.map((v) => v.meter_id).includes(m)
          )[0],
          percentage: 0,
        });
      });
    } else if (ownerships.length > selected.length) {
      setOwnerships((prev) => {
        return prev.filter((v) => selected.includes(v.meter_id));
      });
    }
  }, [selected]);

  const onOwnershipChange = (meter_id, value, index) => {
    let totalOwner = ownerships
      .map((obj) => obj.percentage)
      .reduce((prev, next) => prev + next);
    totalOwner -= ownerships[index].percentage;
    totalOwner += value;
    console.log(totalOwner);
    if (totalOwner <= 100) {
      setOwnerships((prev) => {
        const nOwnerships = [...prev];
        nOwnerships[index] = {
          meter_id: meter_id,
          percentage: value,
        };
        return nOwnerships;
      });
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Stack gap={7}>
        <div>
          <Select
            id={"meter_id" + "spsm"}
            key={"meter_id" + "spsm"}
            labelText={
              "The string that unequivocally identifies the meter ID of the REC."
            }
            onChange={(e) =>
              setMeter((prev) => ({
                ...prev,
                ["meter_id"]: e.target.value,
              }))
            }
          >
            {meterList.map((m) => (
              <SelectItem value={m} text={m} key={m + "si"} />
            ))}
          </Select>
        </div>
        <div>
          <p className="bold margin-bot-0-8rem">Storage</p>
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {Object.entries(meter)
                .filter((m) => Object.keys(descriptionA).includes(m[0]))
                .map(([key, value]) => (
                  <NumberInput
                    label={descriptionA[key]}
                    id={key + meter.id + "s"}
                    key={key + meter.id + "s"}
                    className={styles.numberInput}
                    min={0}
                    value={value}
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
          <p className="bold margin-bot-0-8rem">Battery</p>
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {Object.entries(meter)
                .filter((m) => Object.keys(descriptionB).includes(m[0]))
                .map(([key, value]) => (
                  <NumberInput
                    label={descriptionB[key]}
                    id={key + meter.id + "s"}
                    key={key + meter.id + "s"}
                    className={styles.numberInput}
                    min={0}
                    value={value}
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
          <p className="bold margin-bot-0-8rem">Ownerships</p>
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {ownerships.map((v, i) => (
                <NumberInput
                  label={"Ownership Percentage of " + v.meter_id}
                  id={v.meter_id + "own"}
                  key={v.meter_id + "own"}
                  className={styles.numberInput}
                  min={0}
                  max={100}
                  invalid={error}
                  invalidText="Total ownership should be 100%."
                  value={v.percentage}
                  onChange={(_, state) =>
                    onOwnershipChange(v.meter_id, state.value, i)
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

export default SizingParamsSharedMeter;
