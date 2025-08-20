"use client";

import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

export default function SplineChart({
  categories,
  chartData,
  title,
  yaxisTitle
}: {
  categories: string[];
  chartData: any[];
  title: string;
  yaxisTitle: string;
}) {
  const options = {
    chart: {
      type: "spline",
    },
    title: {
      text: title,
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: categories,
      accessibility: {
        description: "Months of the year",
      },
    },
    yAxis: {
      title: {
        text: yaxisTitle,
      },
      labels: {
        format: "{value}",
      },
    },
    tooltip: {
      crosshairs: true,
      shared: true,
    },
    plotOptions: {
      spline: {
        marker: {
          radius: 4,
          lineColor: "#666666",
          lineWidth: 1,
        },
      },
    },
    series: [...chartData],
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
