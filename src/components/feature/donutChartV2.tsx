import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

type DonutChartProps = {
  title: string;
  subtitle?: string;
  categories: string[];
  chartData: any[];
};

export default function DonutChartv2({
  title,
  subtitle,
  categories,
  chartData,
}: DonutChartProps) {
  // Prepare outer and inner donut series
  const browserData: Highcharts.PointOptionsObject[] = [];
  const versionsData: Highcharts.PointOptionsObject[] = [];

  chartData.forEach((browser, i) => {
    browserData.push({
      name: categories[i],
      y: browser.y,
      color: browser.color,
    });

    browser.drilldown.data.forEach((val: any, j: any) => {
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
        name: "Total",
        data: browserData,
        size: "45%",
        dataLabels: {
          color: "#fff",
          distance: -50,
        },
      },
      {
        type: "pie",
        name: "Total",
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
            series: [],
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
