import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box } from "@mui/material";

type DonutChartProps = {
  chartData: { name: string; y: number }[];
  title: string;
  subtitle?: string;
};

export default function DonutChart({
  chartData,
  title,
  subtitle,
}: DonutChartProps) {
  const total = chartData.reduce((acc, cur) => acc + cur.y, 0);

  const options: Highcharts.Options = {
    chart: {
      type: "pie",
      // Add custom field for label handling (not standard, so use a type cast)
      custom: {} as { label?: Highcharts.SVGElement },
      events: {
        render(this: Highcharts.Chart) {
          const chart = this;
          const series = chart.series[0] as Highcharts.SeriesPie;
          const center = series.center;

          if (!center) return;

          let customLabel = chart.options.chart?.custom?.label;

          const labelText = `Total<br/><strong>${total.toLocaleString()}</strong>`;

          if (!customLabel) {
            customLabel = chart.options.chart!.custom!.label = chart.renderer
              .label(labelText)
              .css({
                color: "var(--highcharts-neutral-color-100, #000)",
                textAnchor: "middle",
              })
              .add();
          } else {
            // Update label text if already exists
            customLabel.attr({ text: labelText });
          }

          const [centerX, centerY, diameter] = center;
          const x = centerX + chart.plotLeft;
          const y = centerY + chart.plotTop - customLabel.attr("height") / 2;

          customLabel.attr({ x, y });
          customLabel.css({ fontSize: `${diameter / 12}px` });
        },
      },
    },
    title: { text: title },
    subtitle: subtitle ? { text: subtitle } : undefined,
    accessibility: {
      point: { valueSuffix: "%" },
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.0f}%</b>",
    },
    legend: { enabled: false },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        borderRadius: 8,
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            format: "{point.name}",
          },
          {
            enabled: true,
            distance: -15,
            format: "{point.percentage:.0f}%",
            style: { fontSize: "0.9em" },
          },
        ],
        showInLegend: true,
      },
    },
    series: [
      {
        type: "pie",
        name: "Registrations",
        colorByPoint: true,
        innerSize: "75%",
        data: chartData,
      },
    ],
  };

  return (
    <Box width="100%" height="100%">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
