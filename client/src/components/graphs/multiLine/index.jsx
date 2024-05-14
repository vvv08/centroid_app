import React, { PureComponent } from "react";
import "./multiLine.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MultiLineFormat = () => {
  const data = [
    {
      name: "Day 1",
      Rejection: 4000,
      Production: 2400,
      amt: 2400,
    },
    {
      name: "Day 2",
      Rejection: 3000,
      Production: 1398,
      amt: 2210,
    },
    {
      name: "Day 3",
      Rejection: 2000,
      Production: 9800,
      amt: 2290,
    },
    {
      name: "Day 4",
      Rejection: 2780,
      Production: 3908,
      amt: 2000,
    },
  ];

  return (
    <>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Production"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Rejection" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default MultiLineFormat;
