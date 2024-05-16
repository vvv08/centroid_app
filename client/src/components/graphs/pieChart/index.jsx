import React from "react";
import './pieChart.scss';
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const PieChartGraph = ({ data }) => {
  return (
    <>
      <PieChart
        series={[
          {
            data: data
          },
        ]}
        sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'var(--centroidPiechartLabel)',
          fontWeight: 'bold',
        },
      }}
        width={1400}
        height={400}
      />
    </>
  );
};

export default PieChartGraph;
