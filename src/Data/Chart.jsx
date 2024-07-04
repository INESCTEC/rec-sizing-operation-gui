import { useEffect, useRef } from "react";
import styles from "./Chart.module.css";
import * as echarts from "echarts";

function Chart({ chartOption, chartId }) {
  const elementRef = useRef(null);
  useEffect(() => {
    const chart = echarts.init(document.getElementById("chart" + chartId));
    // Display the chart using the configuration items and data just specified.
    chart.setOption(chartOption);

    const resizeObserver = new ResizeObserver(() => {
      chart.resize();
    });
    resizeObserver.observe(elementRef.current);
    return () => {
      resizeObserver.disconnect();
      chart.dispose();
    };
  }, [chartOption]);

  return (
    <>
      <div ref={elementRef} id={"chart" + chartId} className={styles.chart} />
    </>
  );
}

export default Chart;
