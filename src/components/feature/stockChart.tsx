import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock";
import { Box } from "@mui/material";

type Props = {
  title?: string;
  data: any;
};

const StockChart: React.FC<Props> = ({ title = "Portfolio Amount", data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<Highcharts.Chart | null>(null);

  console.log("Data", data);

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = Highcharts.stockChart(chartRef.current, {
      chart: {
        height: 500,
        backgroundColor: "transparent",
      },
      accessibility: {
        typeDescription: "Stock chart showing portfolio growth over time.",
      },
      title: {
        text: title,
      },
      xAxis: {
        type: "datetime",
        overscroll: 2678400000, // 31 days
      },
      rangeSelector: {
        selected: 3,
        buttons: [
          { type: "month", count: 3, text: "3m", title: "View 3 months" },
          { type: "month", count: 6, text: "6m", title: "View 6 months" },
          { type: "ytd", text: "YTD", title: "View year to date" },
          { type: "year", count: 1, text: "1y", title: "View 1 year" },
          { type: "all", text: "All", title: "View all" },
        ],
      },
      series: [
        {
          type: "line",
          name: title,
          color: "#ffbf00",
          data: data,
          id: "portfolioSeries",
          tooltip: {
            valueDecimals: 2,
            valuePrefix: "₹",
          },
        },
      ],
      credits: {
        enabled: false,
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, title]); // rerun when data/title change

  return (
    <Box>
      <div
        ref={chartRef}
        id="stock-chart-container"
        style={{ width: "100%" }}
      />
    </Box>
  );
};

export default StockChart;
