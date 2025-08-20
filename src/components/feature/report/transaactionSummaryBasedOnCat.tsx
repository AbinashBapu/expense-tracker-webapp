import React, { useEffect, useState } from "react";
import { FormControl, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import DonutChart from "@/components/feature/donutChart";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DonutChartv2 from "@/components/feature/donutChartV2";

export default function ChartBasedOnCategory({
  donutChartData,
  donutChartV2Data,
  isSummaryLoading,
  isSummaryLoadingForDonutChartBasedOnCategory,
}: {
  donutChartData: any;
  donutChartV2Data: any;
  isSummaryLoading: any;
  isSummaryLoadingForDonutChartBasedOnCategory: any;
}) {
  const colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFA500",
    "#800080",
    "#FFC0CB",
    "#808080",
    "#C0C0C0",
    "#000000",
    "#FFC0CB",
    "#808080",
    "#C0C0C0",
    "#000000",
    "#FFC0CB",
    "#808080",
    "#C0C0C0",
    "#000000",
  ];
  let v2DonutChart = <> </>;
  if (!isSummaryLoadingForDonutChartBasedOnCategory) {
    const v2Categories = donutChartV2Data
      .filter((item: any) => item.categoryName !== "Incomes")
      .map((item: any) => item.categoryName);
    let data: any = [];

    donutChartV2Data
      .filter((item: any) => item.categoryName !== "Incomes")
      .map((item: any, index: number) => {
        const amounts = item.subCategoryInfoWithAmounts.map(
          (subCategory: any) => subCategory.amount
        );

        data.push({
          y: amounts.reduce((acc: any, cur: any) => acc + cur, 0),
          color: colors[index],
          drilldown: {
            name: item.categoryName,
            categories: item.subCategoryInfoWithAmounts.map(
              (subCategory: any) => subCategory.subcategoryName
            ),
            data: amounts,
          },
        });
      });

    console.log("Data: ", data);
    console.log("Categories: ", v2Categories);

    v2DonutChart = (
      <DonutChartv2
        title="Expense, Saving Summary"
        subtitle=""
        categories={v2Categories}
        chartData={data}
      />
    );
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={6}>
          {!isSummaryLoading && (
            <DonutChart
              title="Expense, Saving Summary"
              subtitle=""
              chartData={[
                { name: "Expense", y: donutChartData?.expense || 0 },
                { name: "Saving", y: donutChartData?.saving || 0 },
              ]}
            />
          )}
        </Grid>
        <Grid size={6}>{v2DonutChart}</Grid>
      </Grid>
    </>
  );
}
