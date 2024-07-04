import { NumberInput, TextInput, Stack } from "@carbon/react";

import styles from "./SizingViewContent.module.css";
import { useEffect, useState } from "react";

function SizingParamsSharedMeter({ meterList, setFormData }) {
  const [meter, setMeter] = useState({
    meter_id: "Meter#1",
    power_energy_ratio: 1,
    minimum_new_pv_power: 0,
    maximum_new_pv_power: 10,
    minimum_new_storage_capacity: 0,
    maximum_new_storage_capacity: 10,
    l_gic: 10,
    l_bic: 10,
    soc_min: 10,
    soc_max: 10,
    eff_bc: 10,
    eff_bd: 10,
    deg_cost: 10,
  });

  const description = {
    power_energy_ratio:
      "Power/energy [kW/kWh] ratio of the newly installed storage capacity.",
    minimum_new_pv_power: "Minimum newly installed PV capacity, in kW.",
    maximum_new_pv_power: "Maximum newly installed PV capacity, in kW.",
    minimum_new_storage_capacity:
      "Minimum newly installed storage capacity, in kWh.",
    maximum_new_storage_capacity:
      "Maximum newly installed storage capacity, in kWh.",
    l_gic: "Cost of installing new PV, in €/kW.",
    l_bic: "Cost of installing new battery capacity, in €/kWh.",
    soc_min: "Minimum state-of-charge of the battery to be installed, in %.",
    soc_max: "Maximum state-of-charge of the battery to be installed, in %.",
    eff_bc: "Charging efficiency of the battery to be installed, in %.",
    eff_bd: "Discharging efficiency of the battery to be installed, in %.",
    deg_cost: "Degradation cost of the battery to be installed, in %.",
    meter_id:
      "The string that unequivocally identifies the meter ID of the REC.",
  };

  const [ownerships, setOwnerships] = useState(
    meterList.map((v) => ({ meter_id: v, percentage: 0 }))
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
    if (ownerships.length < meterList.length) {
      setOwnerships((prev) => {
        return prev.concat({
          meter_id: meterList.filter(
            (m) => !prev.map((v) => v.meter_id).includes(m)
          )[0],
          percentage: 0,
        });
      });
    } else if (ownerships.length > meterList.length) {
      setOwnerships((prev) => {
        return prev.filter((v) => meterList.includes(v.meter_id));
      });
    }
  }, [meterList]);

  const onOwnershipChange = (meter_id, value, index) => {
    const totalOwner = ownerships
      .map((obj) => {
        if (obj.meter_id == meter_id) {
          return value;
        }
        return obj.percentage;
      })
      .reduce((prev, next) => prev + next);
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
    } else {
      console.error("Invalid percentage.");
    }
  };

  return (
    <>
      <Stack gap={7}>
        <div className={styles.sizingParamsWrapper}>
          <div className={styles.sizingParams}>
            {Object.entries(meter).map(([key, value]) =>
              key !== "meter_id" ? (
                <NumberInput
                  label={description[key]}
                  id={key}
                  key={key}
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
              ) : (
                <TextInput
                  labelText={description[key]}
                  id={key}
                  key={key}
                  className={styles.numberInput}
                  min={0}
                  placeholder="Meter#ID"
                  value={value}
                  onChange={(e) =>
                    setMeter((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                />
              )
            )}
          </div>
        </div>

        {ownerships.map((v, i) => (
          <NumberInput
            label={"Ownership Percentage of " + v.meter_id}
            id={v.meter_id}
            key={v.meter_id}
            className={styles.numberInput}
            min={0}
            max={100}
            value={v.percentage}
            onChange={(_, state) =>
              onOwnershipChange(v.meter_id, state.value, i)
            }
          />
        ))}
      </Stack>
    </>
  );
}

export default SizingParamsSharedMeter;
