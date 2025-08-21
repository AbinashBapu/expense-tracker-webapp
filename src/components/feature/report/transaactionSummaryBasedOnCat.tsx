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
    "#9F00FF", // Vibrant Purple
    "#FF00C5", // Hot Pink
    "#00C5FF", // Bright Cyan
    "#FFC080", // Peach Orange
    "#C6FF00", // Lime Green
    "#FFA57D", // Soft Coral
    "#FFC0E5", // Light Pink
    "#F2FF00", // Neon Yellow
    "#00F2FF", // Aqua Blue
    "#FF6F61", // Coral Red
    "#6A5ACD", // Slate Blue
    "#40E0D0", // Turquoise
    "#FFD700", // Gold
    "#7FFF00", // Chartreuse
    "#FFB347", // Pastel Orange
    "#FF69B4", // Pink
    "#BA55D3", // Orchid Purple
    "#20B2AA", // Light Sea Green
    "#FF7F50", // Coral
    "#6495ED", // Cornflower Blue
    "#32CD32", // Lime
    "#FF1493", // Deep Pink
    "#00CED1", // Dark Turquoise
    "#ADFF2F", // Green Yellow
    "#FF8C00", // Dark Orange
    "#8A2BE2", // Blue Violet
    "#00FA9A", // Medium Spring Green
    "#DC143C", // Crimson
    "#87CEFA", // Light Sky Blue
    "#FF6347", // Tomato
    "#3CB371", // Medium Sea Green
    "#DA70D6", // Orchid
    "#00BFFF", // Deep Sky Blue
    "#FFDAB9", // Peach Puff
  ];

  let v2DonutChart = <> </>;
  if (!isSummaryLoadingForDonutChartBasedOnCategory) {
    // const v2Categories = donutChartV2Data
    //   .filter((item: any) => item.categoryName !== "Incomes")
    //   .map((item: any) => item.categoryName);
    // let data: any = [];

    // donutChartV2Data
    //   .filter((item: any) => item.categoryName !== "Incomes")
    //   .map((item: any, index: number) => {
    //     const amounts = item.subCategoryInfoWithAmounts.map(
    //       (subCategory: any) => subCategory.amount
    //     );

    //     data.push({
    //       y: amounts.reduce((acc: any, cur: any) => acc + cur, 0),
    //       color: colors[index],
    //       drilldown: {
    //         name: item.categoryName,
    //         categories: item.subCategoryInfoWithAmounts.map(
    //           (subCategory: any) => subCategory.subcategoryName
    //         ),
    //         data: amounts,
    //       },
    //     });
    //   });

    const v2Categories = donutChartV2Data
      .filter((item: any) => item.categoryName !== "Incomes")
      .map((item: any) => item.categoryName);

    let data: any = [];

    // 1️⃣ Calculate total expenses (excluding Incomes)
    const totalExpenses = donutChartV2Data
      .filter((item: any) => item.categoryName !== "Incomes")
      .reduce((catAcc: number, cat: any) => {
        return (
          catAcc +
          cat.subCategoryInfoWithAmounts.reduce(
            (subAcc: number, sub: any) => subAcc + sub.amount,
            0
          )
        );
      }, 0);

    // 2️⃣ Build percentage-based data with 2 decimals
    donutChartV2Data
      .filter((item: any) => item.categoryName !== "Incomes")
      .map((item: any, index: number) => {
        const amounts = item.subCategoryInfoWithAmounts.map(
          (subCategory: any) => subCategory.amount
        );

        const totalCategoryAmount = amounts.reduce(
          (acc: any, cur: any) => acc + cur,
          0
        );

        data.push({
          // Category % of total (2 decimals)
          y: parseFloat(
            ((totalCategoryAmount / totalExpenses) * 100).toFixed(2)
          ),

          color: colors[index],

          drilldown: {
            name: item.categoryName,
            categories: item.subCategoryInfoWithAmounts.map(
              (subCategory: any) => subCategory.subcategoryName
            ),

            // Each subcategory % of total (2 decimals)
            data: amounts.map((amt: number) =>
              parseFloat(((amt / totalExpenses) * 100).toFixed(2))
            ),
          },
        });
      });

    console.log("Total Expenses:", totalExpenses);
    console.log("Final Data:", data);

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
