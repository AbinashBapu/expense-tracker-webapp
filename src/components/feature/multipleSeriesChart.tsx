"use client";

import React, { useEffect, useState } from "react";
import Highcharts from "highcharts/highstock"; // use highstock for stock charts
import HighchartsReact from "highcharts-react-official";
import { Box, Skeleton } from "@mui/material";

export default function StockComparisonChart({
  title = "Stock Comparison",
  data,
}: {
  title?: string;
  data: any[];
}) {
  const [options, setOptions] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      console.log("UseEffect Data", data);
      const series: any[] = data;

      setOptions({
        rangeSelector: {
          selected: 4,
        },
        title: {
          text: title,
        },
        yAxis: {
          labels: {
            formatter: function (
              this: Highcharts.AxisLabelsFormatterContextObject
            ) {
              return ((this.value as number) > 0 ? "+" : "") + this.value + "%";
            },
          },
          plotLines: [
            {
              value: 0,
              width: 2,
              color: "silver",
            },
          ],
        },
        plotOptions: {
          series: {
            compare: "percent",
            showInNavigator: true,
          },
        },
        tooltip: {
          pointFormat:
            '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true,
        },
        series,
      });
    }

    fetchData();
  }, []);

  return (
    <Box>
      {options ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
        />
      ) : (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={200} // adjust based on your chart height
          sx={{ borderRadius: 2 }}
        />
      )}
    </Box>
  );
}
