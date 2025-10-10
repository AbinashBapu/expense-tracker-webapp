import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts/highstock"; // ✅ Correct import
import { Box } from "@mui/material";

const StockChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDataAndRenderChart = async () => {
      const data = await fetch(
        "https://cdn.jsdelivr.net/gh/highcharts/highcharts@f56a420/samples/data/btc-historical.json"
      ).then((response) => response.json());

      if (chartRef.current) {
        Highcharts.stockChart(chartRef.current, {
          accessibility: {
            typeDescription: `Stock chart with a line series and a flags series indicating key events.`,
          },
          title: {
            text: "Bitcoin Historical Price and Halvings",
          },
          xAxis: {
            overscroll: 2678400000,
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
              type: "line", // ✅ Required
              name: "Bitcoin Price",
              color: "#ffbf00",
              data: data,
              id: "dataseries",
              tooltip: {
                valueDecimals: 2,
                valuePrefix: "$",
              },
            },
            {
              type: "flags",
              color: "#fb922c",
              onSeries: "dataseries",
              shape: "squarepin",
              showInNavigator: true,
              accessibility: {
                exposeAsGroupOnly: true,
                description: "Bitcoin Halving Events",
              },
              data: [
                {
                  x: Date.parse("2016-07-09"),
                  title: "2nd Halving",
                  text: "Reward down: 25 BTC to 12.5 BTC per block",
                },
                {
                  x: Date.parse("2020-05-11"),
                  title: "3rd Halving",
                  text: "Reward down: 12.5 BTC to 6.25 BTC per block",
                },
              ],
            },
            {
              type: "flags",
              color: "#fb922c",
              shape: "squarepin",
              showInNavigator: true,
              accessibility: {
                exposeAsGroupOnly: true,
                description: "Bitcoin Halving Events",
              },
              data: [
                {
                  x: Date.parse("2024-04-19"),
                  title: "4th Halving",
                  text: "Reward down: 6.25 BTC to 3.125 BTC per block",
                },
              ],
            },
          ],
        });
      }
    };

    fetchDataAndRenderChart();
  }, []);

  return (
    <Box>
      <div ref={chartRef} id="stock-chart-container" />
    </Box>
  );
};

export default StockChart;
