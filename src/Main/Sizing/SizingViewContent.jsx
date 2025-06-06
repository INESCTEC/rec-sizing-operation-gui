import styles from "./SizingViewContent.module.css";
import DownloadCSV from "../../Data/DownloadCSV";

import ChartPerMeterClustered from "../SharedModules/ChartPerMeterClustered";

import ChartPerMeter from "../SharedModules/ChartPerMeter";
import { Select, SelectItem } from "@carbon/react";
import BarChart from "../../Data/BarChart";
import SizingResultsTable from "./SizingResultsTable";

function SizingViewContent({ meterId, setMeterId, ids, data, clustered }) {
  const meter_inputs = data["meter_operation_inputs"];
  const lem_prices = data["lem_prices"];
  const meter_outputs = data["meter_operation_outputs"];
  const lem_transactions = data["lem_transactions"];

  const meter_investment_outputs = data["meter_investment_outputs"];
  const outputs_by_id = {};

  const member_costs = data["member_costs"];
  const member_costs_by_id = {};

  const keepers = [
    "installation_cost",
    "installation_cost_compensation",
    "pv_investment_cost",
    "storage_investment_cost",
    "contracted_power_cost",
    "retailer_exchange_costs",
    "sc_tariffs_costs",
  ];

  for (let keeper of keepers) {
    outputs_by_id[keeper] = [];
    for (let value of meter_investment_outputs) {
      if(value.meter_id === meterId)
        outputs_by_id[keeper].push(value[keeper]);
    }
  }

  for (let keeper of ["member_cost", "member_cost_compensation"]) {
    member_costs_by_id[keeper] = [];
    for (let value of member_costs) {
      if(value.meter_id === meterId)
        member_costs_by_id[keeper].push(value[keeper]);
    }
  }
  

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
      <div class="card-header"></div>
      <SizingResultsTable data={meter_investment_outputs.filter(meter => meter.meter_id == meterId)}></SizingResultsTable>
      {clustered ? (
        <ChartPerMeterClustered
          title="Operation Chart"
          meter_id_in={meterId}
          meter_inputs={meter_inputs}
          meter_outputs={meter_outputs}
          lem_prices={lem_prices}
          lem_transactions={lem_transactions}
        />
      ) : (
        <ChartPerMeter
          title="Operation Chart"
          meter_id_in={meterId}
          meter_inputs={meter_inputs}
          meter_outputs={meter_outputs}
          lem_prices={lem_prices}
          lem_transactions={lem_transactions}
        />
      )}
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <BarChart
            data={outputs_by_id}
            xAxis={meterId}
            chartId={"outptus"}
          ></BarChart>
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <BarChart
            data={member_costs_by_id}
            xAxis={meterId}
            chartId={"random"}
          ></BarChart>
        </div>
      </div>
      <DownloadCSV data={data} fileName={"data"} />
    </>
  );
}

export default SizingViewContent;
