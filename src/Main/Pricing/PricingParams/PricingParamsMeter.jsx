import { NumberInput, TextInput, Stack, Button } from "@carbon/react";

import styles from "./PricingParamsMeter.module.css";

function PricingParamsMeter({ meter_id, meters, setMeters, sharedMeters }) {
  const descriptions = {
    power_energy_ratio:
      "Power/energy [kW/kWh] ratio of the newly installed storage capacity.",
    minimum_new_storage_capacity:
      "Minimum newly installed storage capacity, in kWh.",
    maximum_new_storage_capacity:
      "Maximum newly installed storage capacity, in kWh.",
    l_bic: "Cost of installing new battery capacity, in €/kWh.",
    soc_min: "Minimum state-of-charge to consider for the storage asset, in %.",
    soc_max: "Maximum state-of-charge to consider for the storage asset, in %.",
    eff_bc: "Charging efficiency of the storage asset, in %.",
    eff_bd: "Discharging efficiency of the storage asset, in %.",
    minimum_new_pv_power: "Minimum newly installed PV capacity, in kW.",
    maximum_new_pv_power: "Maximum newly installed PV capacity, in kW.",
    l_gic: "Cost of installing new PV, in €/kW.",
    installed_pv_capacity:
      "Installed PV capacity that will overrule the original PV capacity of the meter, in kVA.",
    e_bn: "Storage's energy capacity, in kWh.",
    p_max: "Storage's maximum power rate (for charge and discharge), in kW.",
    deg_cost: "Degradation cost of the storage asset, in %.",
    contracted_power: "Contracted power at the meter, in kVA.",
  };

  const updateMeter = (id, key, i_key, value) =>
    setMeters((prev) => {
      let newMeters = { ...prev };
      //console.log(newMeters)
      newMeters[id][key][i_key] = value;
      return newMeters;
    });

  const removeMeter = (id) =>
    setMeters((prev) => {
      let newMeters = { ...prev };
      delete newMeters[id];
      return newMeters;
    });

  const updateMeterId = (id, new_id) => {
    setMeters((prev) => {
      let newMeters = { ...prev };
      let meter = newMeters[id];
      newMeters[id] = { ...meter, meter_id: new_id };
      return newMeters;
    });
  };

  return (
    <>
      <Stack gap={7}>
        {sharedMeters ? (
          <div style={{ display: "flex", alignItems: "end" }}>
            <>
              <TextInput
                id={"meter_idpsm" + meter_id}
                key={"meter_idpsm" + meter_id}
                placeholder={"Shared Meter" + meters[meter_id].meter_id}
                labelText={
                  "The string that unequivocally identifies the shared meter."
                }
                onChange={(e) => {
                  updateMeterId(meter_id, e.target.value);
                }}
                value={meters[meter_id].meter_id}
              ></TextInput>

              <Button
                className="primary-button mr-1 ml-1"
                style={{
                  justifyContent: "center",
                  maxInlineSize: "100%",
                  height: "1rem",
                }}
                onClick={() => {
                  removeMeter(meter_id);
                }}
              >
                Remove Meter
              </Button>
            </>
          </div>
        ) : undefined}
        <div>
          <p className="bold margin-bot-0-8rem">Parameters</p>
          Default values will be considered for all unchanged parameters.
          <div className={styles.sizingParamsWrapper}>
            <div className={styles.sizingParams} key={"spsm"}>
              {Object.entries(meters[meter_id]).map(([key, value]) =>
                key !== "meter_id"
                  ? Object.entries(value).map(([i_key, i_value]) => (
                      <NumberInput
                        label={descriptions[i_key]}
                        id={i_key + meter_id + "s"}
                        key={i_key + meter_id + "s"}
                        className={styles.numberInput}
                        min={-1}
                        value={i_value}
                        onChange={(_, state) => {
                          //console.log(meter_id);
                          updateMeter(meter_id, key, i_key, state.value);
                        }}
                      ></NumberInput>
                    ))
                  : undefined
              )}
            </div>
          </div>
        </div>
      </Stack>
    </>
  );
}

export default PricingParamsMeter;
