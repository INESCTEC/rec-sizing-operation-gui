import Chart from "../../Data/Chart";
import styles from "./ChartPerMeter.module.css";
import TablePerMeter from "./TablePerMeter";

function ChartPerMeter({
  title,
  chartId,
  meter_id_in,
  meter_inputs,
  lem_prices,
  meter_outputs,
  lem_transactions,
}) {
  const series = [];
  const buy = [];
  const sell = [];
  const prices = [];
  const pv_l = [];
  const sold_position_l = [];
  const load_l = [];
  const battery_l = [];
  const energy_surplus_l = [];
  const energy_supplied_l = [];
  const net_load_l = [];
  const energy_purchased_l = [];
  const energy_sold_l = [];
  const tableData = {};
  let option_data = [];

  for (let key in meter_inputs) {
    const {
      meter_id,
      datetime,
      energy_generated,
      energy_consumed,
      buy_tariff,
      sell_tariff,
    } = meter_inputs[key];
    if (meter_id === meter_id_in) {
      buy.push([datetime, buy_tariff]);
      sell.push([datetime, sell_tariff]);
      pv_l.push([datetime, energy_generated]);
      load_l.push([datetime, energy_consumed]);
      tableData[datetime] = {
        meter_id: meter_id_in,
        datetime: new Date(datetime).toLocaleTimeString([], {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        load: energy_consumed,
        PV: energy_generated,
        buy_price: buy_tariff,
        sell_price: sell_tariff,
      };
    }
  }

  for (let key in lem_prices) {
    const { datetime, value } = lem_prices[key];
    prices.push([datetime, value]);
    if (tableData[datetime] === undefined)
      tableData[datetime] = { transactions_price: value };
    else tableData[datetime]["transactions_price"] = value;
  }

  for (let key in meter_outputs) {
    const {
      meter_id,
      datetime,
      energy_surplus,
      energy_supplied,
      energy_sold_lem,
      energy_purchased_lem,
      net_load,
      bess_energy_charged,
      bess_energy_discharged,
      bess_energy_content,
    } = meter_outputs[key];
    if (meter_id === meter_id_in) {
      battery_l.push([datetime, bess_energy_content]);
      energy_supplied_l.push([datetime, energy_supplied]);
      energy_surplus_l.push([datetime, energy_surplus]);
      net_load_l.push([datetime, net_load]);
      if (tableData[datetime] === undefined)
        tableData[datetime] = {
          battery: bess_energy_content,
          supplied: energy_supplied,
          surplus: energy_surplus,
          net_load: net_load,
        };
      else tableData[datetime]["battery"] = bess_energy_content;
      tableData[datetime]["supplied"] = energy_supplied;
      tableData[datetime]["surplus"] = energy_surplus;
      tableData[datetime]["net_load"] = net_load;
      //Só para sizing
      if(energy_sold_lem != null && energy_purchased_lem != null){
        energy_purchased_l.push([datetime, energy_purchased_lem])
        tableData[datetime]["energy_purchased"] = energy_purchased_lem;

        energy_sold_l.push([datetime, energy_sold_lem]);
        tableData[datetime]["energy_sold"] = energy_sold_lem;
      }
    }
  }

  //if (pricing)
  for (let key in lem_transactions) {
    const { meter_id, datetime, sold_position } = lem_transactions[key];
    if (meter_id === meter_id_in) {
      sold_position_l.push([datetime, sold_position]);
      tableData[datetime]["sold_position"] = sold_position;
    }
  }

  if (buy.length > 0) {
    series.push({
      name: "Buy Price",
      type: "line",
      symbol: "line",
      symbolSize: 0,
      yAxisIndex: 1,
      data: buy,
      tooltip: {
        valueFormatter: function (value) {
          return value + " €/KWh";
        },
      },
    });
    option_data.push({
      name: "Buy Price",
    });
  }

  if (sell.length > 0) {
    series.push({
      name: "Sell Price",
      type: "line",
      symbol: "line",
      symbolSize: 0,
      yAxisIndex: 1,
      data: sell,
      tooltip: {
        valueFormatter: function (value) {
          return value + " €/KWh";
        },
      },
    });
    option_data.push({
      name: "Sell Price",
    });
  }

  if (prices.length > 0) {
    series.push({
      name: "Transactions Price",
      type: "line",
      symbol: "line",
      symbolSize: 0,
      data: prices,
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
    });
    option_data.push({
      name: "Transactions Price",
    });
  }

  if (battery_l.length > 0) {
    series.push({
      name: "Battery",
      type: "line",
      symbol: "line",
      symbolSize: 0,
      yAxisIndex: 0,
      data: battery_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Battery",
    });
  }

  if (energy_supplied_l.length > 0) {
    series.push({
      name: "Supplied",
      type: "line",
      yAxisIndex: 0,
      data: energy_supplied_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Supplied",
    });
  }
  if (energy_surplus_l.length > 0) {
    series.push({
      name: "Surplus",
      type: "line",
      yAxisIndex: 0,
      data: energy_surplus_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Surplus",
    });
  }

  if (load_l.length > 0) {
    series.push({
      name: "Load",
      type: "scatter",
      symbol: "triangle",
      symbolSize: 14,
      yAxisIndex: 0,
      data: load_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Load",
    });
  }

  if (pv_l.length > 0) {
    series.push({
      name: "Generation",
      type: "bar",
      yAxisIndex: 0,
      data: pv_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Generation",
    });
  }

  if (sold_position_l.length > 0) {
    series.push({
      name: "Sold Position",
      type: "line",
      symbol: "circle",
      symbolSize: 14,
      yAxisIndex: 0,
      data: sold_position_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "Sold Position",
    });
  }
  
  if (energy_sold_l.length > 0) {
    series.push({
      name: "LEM Sold",
      type: "line",
      symbol: "circle",
      symbolSize: 14,
      yAxisIndex: 0,
      data: energy_sold_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "LEM Sold",
    });
  }

  if (energy_purchased_l.length > 0) {
    series.push({
      name: "LEM Purchased",
      type: "line",
      symbol: "circle",
      symbolSize: 14,
      yAxisIndex: 0,
      data: energy_purchased_l,
      tooltip: {
        valueFormatter: function (value) {
          return value + " KWh";
        },
      },
    });
    option_data.push({
      name: "LEM Purchased",
    });
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

  let end = (Object.keys(tableData).length / 96) * 100;
  const energ_expend_option = {
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
      data: option_data,
    },
    tooltip: {
      trigger: "axis",
    },
    calculable: true,
    xAxis: [
      {
        type: "time",
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
        end: end,
      },
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 0,
        end: end,
      },
    ],
    series: series,
  };

  return (
    <div className="card-wrapper">
      <div className="card-header"></div>
      <div className="card-body">
        <div className={styles.chartContainer}>
          <Chart chartOption={energ_expend_option} chartId={chartId} />
          <div style={{ marginBottom: "25px" }}></div>
          <TablePerMeter data={tableData}></TablePerMeter>
        </div>
      </div>
    </div>
  );
}

export default ChartPerMeter;
