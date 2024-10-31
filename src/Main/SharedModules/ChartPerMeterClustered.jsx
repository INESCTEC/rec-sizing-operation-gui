import Chart from "../../Data/Chart";
import styles from "./ChartPerMeter.module.css";
import TablePerMeter from "./TablePerMeterClustered";

function ChartPerMeterClustered({
  title,
  chartId,
  meter_id_in,
  meter_inputs,
  lem_prices,
  meter_outputs,
  lem_transactions,
}) {
  const series_cluster = {};
  const buy_cluster = {};
  const sell_cluster = {};
  const prices_cluster = {};
  const pv_cluster = {};
  const sold_position_cluster = {};
  const load_cluster = {};
  const battery_cluster = {};
  const energy_surplus_cluster = {};
  const energy_supplied_cluster = {};
  const net_load_cluster = {};
  const tableData = {};
  let option_data_cluster = {};
  //console.logmeter_inputs);
  for (let key in meter_inputs) {
    const {
      meter_id,
      cluster_nr,
      time,
      energy_generated,
      energy_consumed,
      buy_tariff,
      sell_tariff,
    } = meter_inputs[key];
    if (meter_id === meter_id_in) {
      buy_cluster[cluster_nr]
        ? buy_cluster[cluster_nr].push([time, buy_tariff])
        : (buy_cluster[cluster_nr] = [[time, buy_tariff]]);
      sell_cluster[cluster_nr]
        ? sell_cluster[cluster_nr].push([time, sell_tariff])
        : (sell_cluster[cluster_nr] = [[time, sell_tariff]]);
      pv_cluster[cluster_nr]
        ? pv_cluster[cluster_nr].push([time, energy_generated])
        : (pv_cluster[cluster_nr] = [[time, energy_generated]]);
      load_cluster[cluster_nr]
        ? load_cluster[cluster_nr].push([time, energy_consumed])
        : (load_cluster[cluster_nr] = [[time, energy_consumed]]);
      let obj = {
        meter_id: meter_id_in,
        time: time,
        cluster_nr: cluster_nr,
        load: energy_consumed,
        PV: energy_generated,
        buy_price: buy_tariff,
        sell_price: sell_tariff,
      };
      let time_obj = {};
      time_obj[time] = obj;
      if (tableData[cluster_nr] !== undefined)
        if (tableData[cluster_nr][time] !== undefined) {
          tableData[cluster_nr][time]["meter_id"] = meter_id_in;
        } else tableData[cluster_nr][time] = obj;
      else tableData[cluster_nr] = time_obj;
    }
  }

  for (let key in lem_prices) {
    const { cluster_nr, time, value } = lem_prices[key];
    prices_cluster[cluster_nr]
      ? prices_cluster[cluster_nr].push([time, value])
      : (prices_cluster[cluster_nr] = [[time, value]]);
    let obj = { transactions_price: value };
    let time_obj = {};
    time_obj[time] = obj;
    if (tableData[cluster_nr] !== undefined) {
      if (tableData[cluster_nr][time] !== undefined) {
        tableData[cluster_nr][time]["transactions_price"] = value;
      } else tableData[cluster_nr][time] = obj;
    } else tableData[cluster_nr] = time_obj;
  }

  for (let key in meter_outputs) {
    const {
      meter_id,
      cluster_nr,
      time,
      energy_surplus,
      energy_supplied,
      net_load,
      bess_energy_charged,
      bess_energy_discharged,
      bess_energy_content,
    } = meter_outputs[key];
    if (meter_id === meter_id_in) {
      battery_cluster[cluster_nr]
        ? battery_cluster[cluster_nr].push([time, bess_energy_content])
        : (battery_cluster[cluster_nr] = [[time, bess_energy_content]]);
      energy_supplied_cluster[cluster_nr]
        ? energy_supplied_cluster[cluster_nr].push([time, energy_supplied])
        : (energy_supplied_cluster[cluster_nr] = [[time, energy_supplied]]);
      energy_surplus_cluster[cluster_nr]
        ? energy_surplus_cluster[cluster_nr].push([time, energy_surplus])
        : (energy_surplus_cluster[cluster_nr] = [[time, energy_surplus]]);
      net_load_cluster[cluster_nr]
        ? net_load_cluster[cluster_nr].push([time, energy_surplus])
        : (net_load_cluster[cluster_nr] = [[time, energy_surplus]]);

      let obj = {
        battery: bess_energy_content,
        supplied: energy_supplied,
        surplus: energy_surplus,
        net_load: net_load,
      };
      let time_obj = {};
      time_obj[time] = obj;
      if (tableData[cluster_nr] !== undefined)
        if (tableData[cluster_nr][time] !== undefined) {
          tableData[cluster_nr][time]["battery"] = bess_energy_content;
          tableData[cluster_nr][time]["supplied"] = energy_supplied;
          tableData[cluster_nr][time]["surplus"] = energy_surplus;
          tableData[cluster_nr][time]["net_load"] = net_load;
        } else tableData[cluster_nr][time] = obj;
      else tableData[cluster_nr] = time_obj;
    }
  }

  for (let key in lem_transactions) {
    const { meter_id, cluster_nr, time, sold_position } = lem_transactions[key];
    if (meter_id === meter_id_in) {
      sold_position_cluster[cluster_nr]
        ? sold_position_cluster[cluster_nr].push([time, sold_position])
        : (sold_position_cluster[cluster_nr] = [[time, sold_position]]);
      let obj = {
        sold_position: sold_position,
      };
      let time_obj = {};
      time_obj[time] = obj;
      if (tableData[cluster_nr] !== undefined)
        if (tableData[cluster_nr][time] !== undefined)
          tableData[cluster_nr][time]["sold_position"] = sold_position;
        else tableData[cluster_nr][time] = obj;
      else tableData[cluster_nr] = time_obj;
    }
  }

  for (let cluster_nr of Object.keys(tableData)) {
    series_cluster[cluster_nr] = [
      {
        name: "Buy Price",
        type: "line",
        symbol: "line",
        symbolSize: 0,
        yAxisIndex: 1,
        data: buy_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " €/KWh";
          },
        },
      },
      {
        name: "Sell Price",
        type: "line",
        symbol: "line",
        symbolSize: 0,
        yAxisIndex: 1,
        data: sell_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " €/KWh";
          },
        },
      },
      {
        name: "Transactions Price",
        type: "line",
        symbol: "line",
        symbolSize: 0,
        data: prices_cluster[cluster_nr],
        yAxisIndex: 1,
        lineStyle: {
          width: 4,
          type: "dashed",
        },
        tooltip: {
          valueFormatter: function (value) {
            return value + " €/KWh";
          },
        },
      },
      {
        name: "Battery",
        type: "line",
        symbol: "line",
        symbolSize: 0,
        yAxisIndex: 0,
        data: battery_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
      {
        name: "Supplied",
        type: "line",
        yAxisIndex: 0,
        data: energy_supplied_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
      {
        name: "Surplus",
        type: "line",
        yAxisIndex: 0,
        data: energy_surplus_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
      {
        name: "Load",
        type: "scatter",
        symbol: "triangle",
        symbolSize: 14,
        yAxisIndex: 0,
        data: load_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
      {
        name: "Generation",
        type: "bar",
        yAxisIndex: 0,
        data: pv_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
      {
        name: "Sold Position",
        type: "line",
        symbol: "circle",
        symbolSize: 14,
        yAxisIndex: 0,
        data: sold_position_cluster[cluster_nr],
        tooltip: {
          valueFormatter: function (value) {
            return value + " KWh";
          },
        },
      },
    ];
    option_data_cluster[cluster_nr] = [
      {
        name: "Buy Price",
      },
      {
        name: "Sell Price",
      },
      {
        name: "Transactions Price",
      },
      {
        name: "Battery",
      },
      {
        name: "Supplied",
      },
      {
        name: "Surplus",
      },
      {
        name: "Load",
      },
      {
        name: "Generation",
      },
      {
        name: "Sold Position",
      },
    ];
  }
  /*
  series.push({
    name: "net_load",
    type: "line",
    symbol: "circle",
    symbolSize: 14,
    yAxisIndex: 0,
    data: net_load_l,
    tooltip: {
      valueFormatter: function (value) {
        return value + " KWh";
      },
    },
  });*/

  const energ_expend_option = {};
  for (let cluster_nr of Object.keys(tableData)) {
    energ_expend_option[cluster_nr] = {
      title: {
        text: title,
      },
      grid: {
        top: "22%",
        left: "48px",
        right: "55px",
      },
      legend: {
        orient: "vertical",
        height: "70px",
        right: "10%",
        top: "5%",
        data: option_data_cluster[cluster_nr],
      },
      tooltip: {
        trigger: "axis",
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          axisLabel: {
            hideOverlap: true,
          },
        },
      ],
      yAxis: [
        {
          name: "Energy (kWh)",
          nameLocation: "center",
          nameTextStyle: {
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            padding: [0, 0, 20, 0],
          },
          type: "value",
          axisLabel: {
            formatter: "{value}",
            hideOverlap: true,
          },
        },
        {
          name: "Buy/Sell prices (€/kWh)",
          nameLocation: "center",
          nameTextStyle: {
            /**
             * the top padding will shift the name down so that it does not overlap with the axis-labels
             * t-l-b-r
             */
            padding: [30, 0, 0, 0],
          },
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
      ],
      dataZoom: [
        {
          type: "slider",
          show: true,
          xAxisIndex: [0, 1],
          start: 0,
          end: 100,
        },
        {
          type: "inside",
          xAxisIndex: [0, 1],
          start: 0,
          end: 100,
        },
      ],
      series: series_cluster[cluster_nr],
    };
  }

  //console.logtableData);
  return (
    <div>
      {Object.keys(tableData).map((key) => {
        return (
          <div className="card-wrapper" key={key} >
            <div className="card-header"><p>Cluster Number: {key}</p></div>
            <div className="card-body">
              <div className={styles.chartContainer}>
                <Chart
                  chartOption={energ_expend_option[key]}
                  chartId={chartId + key}
                />
                <div style={{ marginBottom: "25px" }}></div>
                <TablePerMeter data={tableData[key]}></TablePerMeter>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChartPerMeterClustered;
