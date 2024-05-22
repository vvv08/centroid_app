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

const MultiLineFormat = ({ data }) => {
  console.log(data)
  return (
    <>
      <LineChart
        width={730}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Total mix" stroke="#9e1b32" />
        <Line type="monotone" dataKey="Production" stroke="#8884d8" />
        <Line type="monotone" dataKey="Rejection" stroke="#82ca9d" />
      </LineChart>
    </>
  );
};

export default MultiLineFormat;
