import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import GrowthCard from "./growthCard";

const InvestmentGrowthAnalysis = ({
  portfolioAnalysisData,
}: {
  portfolioAnalysisData: any;
}) => {
  return (
    <>
      {portfolioAnalysisData && portfolioAnalysisData.length > 0 ? (
        portfolioAnalysisData.map((item: any, index: number) => {
          return (
            <GrowthCard
              title={item.title}
              titleValues={item.titleValues}
              key={`${item.title}-${index}`}
            />
          );
        })
      ) : (
        <Typography variant="body2">No Data Found</Typography>
      )}
    </>
  );
};

export default InvestmentGrowthAnalysis;
