import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";
import GrowthCard from "./growthCard";




const InvestmentGrowthAnalysis = () => {
    const investedGrowth = {
        amount: 100,
        percentage: 10
    }
    const portfolioGrowth = {
        amount: -300,
        percentage: -10
    }
    return (
        <>
            <GrowthCard title="One Day Growth" investedGrowth={investedGrowth} portfolioGrowth={portfolioGrowth} />
            <GrowthCard title="Weekly Growth" investedGrowth={investedGrowth} portfolioGrowth={portfolioGrowth} />
            <GrowthCard title="Monthly Growth" investedGrowth={investedGrowth} portfolioGrowth={portfolioGrowth} />
            <GrowthCard title="Yearly Growth" investedGrowth={investedGrowth} portfolioGrowth={portfolioGrowth} />
        </>
    )
}

export default InvestmentGrowthAnalysis;