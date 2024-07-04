import styles from "../../InterfaceContent.module.css";

import ChartPerMeter from "../../SharedModules/ChartPerMeter";
import OperationKPI from "../OperationKPI";
import { Select, SelectItem } from "@carbon/react";
import DownloadCSV from "../../../Data/DownloadCSV";

export default function DualViewData({ meterId, setMeterId, ids, data }) {

  const meter_inputs = data["meter_inputs"];
  const lem_prices = data["lem_prices"];
  const meter_outputs = data["meter_outputs"];
  const lem_transactions = data["lem_transactions"];
  console.log(lem_transactions);
  return (
    <>
      <div className="row flex-center flex-space-between padding-1rem">
        <p className="interface-title">{meterId}</p>
        <div className={styles.formWrapper}>
          <Select
            className={styles.select}
            id="select-dual"
            noLabel={true}
            defaultValue={meterId}
            onChange={(e) => setMeterId(e.target.value)}
          >
            <SelectItem
              disabled
              hidden
              value="default"
              text="Choose an option"
            />
            {ids.map((option) => (
              <SelectItem key={option} value={option} text={option} />
            ))}
          </Select>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <ChartPerMeter
            title="Operation Chart"
            chartId="dual_chart"
            meter_id_in={meterId}
            meter_inputs={meter_inputs}
            meter_outputs={meter_outputs}
            lem_prices={lem_prices}
            lem_transactions={lem_transactions}
          />
        </div>
      </div>

      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <OperationKPI meter_id={meterId} data={data}></OperationKPI>
        </div>
      </div>
      <DownloadCSV data={data.lem_prices} fileName={"lem_prices"} />
    </>
  );
}
