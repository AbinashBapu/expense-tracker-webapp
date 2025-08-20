import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";






type DonutChartProps = {
  title: string;
  subtitle?: string;
};

export default function DonutChartv2({ title, subtitle }: DonutChartProps) {
  // const colors = Highcharts.getOptions().colors || [];

  const categories = ["Chrome", "Safari", "Edge", "Firefox", "Other"];

  const data = [
    {
      y: 61.04,
      color: "red",
      drilldown: {
        name: "Chrome",
        categories: [
          "Chrome v97.0",
          "Chrome v96.0",
          "Chrome v95.0",
          "Chrome v94.0",
          "Chrome v93.0",
          "Chrome v92.0",
          "Chrome v91.0",
          "Chrome v90.0",
          "Chrome v89.0",
          "Chrome v88.0",
          "Chrome v87.0",
          "Chrome v86.0",
          "Chrome v85.0",
          "Chrome v84.0",
          "Chrome v83.0",
          "Chrome v81.0",
          "Chrome v89.0",
          "Chrome v79.0",
          "Chrome v78.0",
          "Chrome v76.0",
          "Chrome v75.0",
          "Chrome v72.0",
          "Chrome v70.0",
          "Chrome v69.0",
          "Chrome v56.0",
          "Chrome v49.0",
        ],
        data: [
          36.89, 18.16, 0.54, 0.7, 0.8, 0.41, 0.31, 0.13, 0.14, 0.1, 0.35, 0.17,
          0.18, 0.17, 0.21, 0.1, 0.16, 0.43, 0.11, 0.16, 0.15, 0.14, 0.11, 0.13,
          0.12,
        ],
      },
    },
    {
      y: 9.47,
      color: "green",
      drilldown: {
        name: "Safari",
        categories: [
          "Safari v15.3",
          "Safari v15.2",
          "Safari v15.1",
          "Safari v15.0",
          "Safari v14.1",
          "Safari v14.0",
          "Safari v13.1",
          "Safari v13.0",
          "Safari v12.1",
        ],
        data: [0.1, 2.01, 2.29, 0.49, 2.48, 0.64, 1.17, 0.13, 0.16],
      },
    },
    {
      y: 9.32,
      color: "blue",
      drilldown: {
        name: "Edge",
        categories: ["Edge v97", "Edge v96", "Edge v95"],
        data: [6.62, 2.55, 0.15],
      },
    },
    {
      y: 8.15,
      color: "yellow",
      drilldown: {
        name: "Firefox",
        categories: [
          "Firefox v96.0",
          "Firefox v95.0",
          "Firefox v94.0",
          "Firefox v91.0",
          "Firefox v78.0",
          "Firefox v52.0",
        ],
        data: [4.17, 3.33, 0.11, 0.23, 0.16, 0.15],
      },
    },
    {
      y: 11.02,
      color: "gray",
      drilldown: {
        name: "Other",
        categories: ["Other"],
        data: [11.02],
      },
    },
  ];

  // Prepare outer and inner donut series
  const browserData: Highcharts.PointOptionsObject[] = [];
  const versionsData: Highcharts.PointOptionsObject[] = [];

  data.forEach((browser, i) => {
    browserData.push({
      name: categories[i],
      y: browser.y,
      color: browser.color,
    });

    browser.drilldown.data.forEach((val, j) => {
      const brightness = 0.2 - j / browser.drilldown.data.length / 5;
      versionsData.push({
        name: browser.drilldown.categories[j],
        y: val,
        color: browser.color,
      });
    });
  });

  const options: Highcharts.Options = {
    chart: { type: "pie" },
    title: { text: title },
    subtitle: { text: subtitle },
    tooltip: { valueSuffix: "%" },
    plotOptions: {
      pie: {
        shadow: false,
        center: ["50%", "50%"],
      },
    },
    series: [
      {
        type: "pie",
        name: "Browsers",
        data: browserData,
        size: "45%",
        dataLabels: {
          color: "#fff",
          distance: -50,
        },
      },
      {
        type: "pie",
        name: "Versions",
        data: versionsData,
        size: "80%",
        innerSize: "60%",
        dataLabels: {
          format: "<b>{point.name}:</b> <span style='opacity:0.5'>{y}%</span>",
          filter: { property: "y", operator: ">", value: 1 },
          style: { fontWeight: "normal" },
        },
        id: "versions",
      },
    ],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 400 },
          chartOptions: {
            series: [
             
            ],
          },
        },
      ],
    },
  };

  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
