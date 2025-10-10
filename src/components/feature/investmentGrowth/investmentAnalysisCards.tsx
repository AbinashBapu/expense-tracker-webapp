import {
  Paper,
} from "@mui/material";
import GrowthCard from "./growthCard";
import DonutChart from "../donutChart";

const InvestmentGrowthAnalysis = ({
  portfolioAnalysisData,
}: {
  portfolioAnalysisData: any;
}) => {

  type TitleValue = {
    title: string;
    value: string;
  };

  type InputItem = {
    title: string;
    titleValues: TitleValue[];
  };

  type OutputValue = {
    name: string;
    y: number;
  };
  type OutputItem = {
    title: string;
    value: OutputValue[];
  };
  const datapoint: OutputItem[] = portfolioAnalysisData?.map((item: any) => {
    const filteredValues: OutputValue[] = item.titleValues
      .filter((tv: any) => tv.title !== "Accumulated")
      .map((tv: any) => ({
        name: tv.title,
        y: parseFloat(tv.value)
      }));

    return {
      title: item.title,
      value: filteredValues
    };
  });

  return (
    <>
      {
        datapoint && datapoint.length > 0 &&
        datapoint.map((item: OutputItem,index:number) =>
          <Paper key={index}>
            <DonutChart
              title={item.title}
              subtitle=""
              chartData={item.value}
              isVisibleStat={true}
            />
          </Paper>
        )
      }
    </>
  );
};

export default InvestmentGrowthAnalysis;
