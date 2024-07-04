import Chart from "../../Data/Chart";

function LEMChart({lem_prices}){
  const prices = [];
  const series = [];

  for (let key in lem_prices) {
    const { datetime, value } = lem_prices[key];
    prices.push([datetime, value]);
  }

  series.push({
    name: "LEM price",
    type: "line",
    symbol: "line",
    symbolSize: 0,
    data: prices,
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

  const energ_expend_option = {
    title: {
      text: "LEM Prices",
    },
    grid: {
      top: "20%",
      left: "15%",
      right: "15%",
    },
    legend: {
      orient: "vertical",
      height: "15%",
      right: "0",
      data: [
        {
          name: "LEM price",
        },
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
        name: "Buy/Sell prices (€/kWh)",
        nameLocation: "center",
        nameTextStyle: {
          /**
           * the top padding will shift the name down so that it does not overlap with the axis-labels
           * t-l-b-r
           */
          padding: [0, 0, 30, 0],
        },
        type: "value",
        axisLabel: {
          formatter: "{value}",
        },
      },
    ],
    series: series,
  };
  return <Chart chartOption={energ_expend_option} chartId="energ_expend" />;
    
}

export default LEMChart;