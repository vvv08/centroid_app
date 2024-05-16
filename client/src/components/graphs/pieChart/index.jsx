import React from "react";
import './pieChart.scss';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const PieChartGraph = ({ data }) => {
  return (
    <>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data: data,
          },
        ]}
        sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
        width={900}
        height={400}
      />
    </>
  );
};

export default PieChartGraph;
