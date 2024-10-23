"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

const PieChart: React.FC = () => {
  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Transaction on Category",
    },
    tooltip: {
      valueSuffix: "%",
    },
    subtitle: {
      text: 'Source:<a href="https://www.mdpi.com/2072-6643/11/3/684/htm" target="_default">MDPI</a>',
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: [
          {
            enabled: true,
            distance: 20,
          },
          {
            enabled: true,
            distance: -40,
            format: "{point.percentage:.1f}%",
            style: {
              fontSize: "1.2em",
              textOutline: "none",
              opacity: 0.7,
            },
            filter: {
              operator: ">",
              property: "percentage",
              value: 10,
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Percentage",
        colorByPoint: true,
        data: [
          {
            name: "Water",
            y: 55.02,
          },
          {
            name: "Fat",
            sliced: true,
            selected: true,
            y: 26.71,
          },
          {
            name: "Carbohydrates",
            y: 1.09,
          },
          {
            name: "Protein",
            y: 15.5,
          },
          {
            name: "Ash",
            y: 1.68,
          },
        ],
      },
    ],
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};

export default PieChart;
