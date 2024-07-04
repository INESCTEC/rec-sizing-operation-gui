import Chart from "./Chart";

export default function BarChart({ xAxis, data, chartId }) {
  const series = [];

  for (let value in data) {
    series.push({
      name: value,
      type: "bar",
      barGap: 0,
      emphasis: {
        focus: "series",
      },
      data: data[value],
    });
  }

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: series.map((s) => s.name),
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        mark: { show: true },
        magicType: { show: true, type: ["line", "bar"] },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: xAxis,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: series,
  };
  return <Chart chartOption={option} chartId={chartId}></Chart>;
}
