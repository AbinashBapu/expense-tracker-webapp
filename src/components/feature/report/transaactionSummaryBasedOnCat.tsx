import React, { useEffect, useState } from "react";
import { FormControl, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import DonutChart from "@/components/feature/donutChart";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import DonutChartv2 from "@/components/feature/donutChartV2";

export default function ChartBasedOnCategory() {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 2 }}>
    
        <Grid size={6}>
          <DonutChart
            title="2023 Norway car registrations"
            subtitle='Source: <a href="https://www.ssb.no/transport-og-reiseliv/faktaside/bil-og-transport">SSB</a>'
            chartData={[
              { name: "EV", y: 23.9 },
              { name: "Hybrids", y: 12.6 },
              { name: "Diesel", y: 37.0 },
              { name: "Petrol", y: 26.4 },
            ]}
          />
        </Grid>
        <Grid size={6}>
          <DonutChartv2
            title="2023 Norway car registrations"
            subtitle='asdfasd'
          />
        </Grid>
      </Grid>
    </>
  );
}
