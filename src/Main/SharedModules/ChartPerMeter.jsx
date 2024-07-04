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
  const tableData = {};

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
        datetime: new Date(datetime).toUTCString(),
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
    tableData[datetime]["shadow_price"] = value;
  }

  for (let key in meter_outputs) {
    const {
      meter_id,
      datetime,
      energy_surplus,
      energy_supplied,
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
      tableData[datetime]["battery"] = bess_energy_content;
      tableData[datetime]["supplied"] = energy_supplied;
      tableData[datetime]["surplus"] = energy_surplus;
      tableData[datetime]["net_load"] = net_load;
    }
  }

  for (let key in lem_transactions) {
    const { meter_id, datetime, energy_purchased_lem, energy_sold_lem } =
      lem_transactions[key];
    if (meter_id === meter_id_in) {
      sold_position_l.push([datetime, energy_sold_lem - energy_purchased_lem]);
      tableData[datetime]["sold_position"] =
        energy_sold_lem - energy_purchased_lem;
    }
  }

  series.push({
    name: "buy price",
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
  series.push({
    name: "sell price",
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
  series.push({
    name: "shadow price",
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
  series.push({
    name: "Supply",
    type: "line",
    yAxisIndex: 0,
    data: energy_supplied_l,
    tooltip: {
      valueFormatter: function (value) {
        return value + " KWh";
      },
    },
  });
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
  series.push({
    name: "PV",
    type: "bar",
    yAxisIndex: 0,
    data: pv_l,
    tooltip: {
      valueFormatter: function (value) {
        return value + " KWh";
      },
    },
  });
  series.push({
    name: "sold_position",
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
  });

  const energ_expend_option = {
    title: {
      text: title,
    },
    grid: {
      top: "25%",
      left: "10%",
      right: "15%",
    },
    legend: {
      orient: "vertical",
      height: "20%",
      right: "10%",
      data: [
        {
          name: "Battery",
        },
        {
          name: "Supply",
        },
        {
          name: "Surplus",
        },
        {
          name: "Load",
        },
        {
          name: "PV",
        },
        {
          name: "sold_position",
        },
        {
          name: "buy price",
        },
        {
          name: "sell price",
        },
        {
          name: "shadow price",
        },
        { name: "net_load" },
      ],
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
    series: series,
  };

  return (
    <div className={styles.chartContainer}>
      <Chart chartOption={energ_expend_option} chartId={chartId} />
      <TablePerMeter data={tableData}></TablePerMeter>
    </div>
  );
}

export default ChartPerMeter;