"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

const BarChart: React.FC = () => {
  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "Last 6 Months Report",
    },
    xAxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: {
      min: 0,
      title: {
        text: "Total Amount",
      },
    },
    series: [
      {
        name: "Income",
        data: [5, 3, 4, 2, 4, 5],
      },
      {
        name: "Savings",
        data: [2, 2, 3, 8, 7, 9],
      },
      {
        name: "Expense",
        data: [3, 4, 4, 6, 4, 5],
      },
    ],
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default BarChart;
