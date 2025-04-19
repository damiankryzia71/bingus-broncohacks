import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


interface DataPoint {
  timestamp: string;
  value: number;
}

/*
const dummyData: DataPoint[] = [
    { timestamp: "2025-04-14T10:00:00Z", value: 12 },
    { timestamp: "2025-04-15T10:00:00Z", value: 18 },
    { timestamp: "2025-04-16T10:00:00Z", value: 10 },
    { timestamp: "2025-04-17T10:00:00Z", value: 22 },
    { timestamp: "2025-04-18T10:00:00Z", value: 15 },
    { timestamp: "2025-04-18T10:00:00Z", value: 100 },
    { timestamp: "2025-04-18T10:00:00Z", value: 70 },
    { timestamp: "2025-04-18T10:00:00Z", value: 90 }
  ];*/

const Linegraph: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    
    axios
      .get<DataPoint[]>("/api/wellness/1/")
      .then((res) => {
        console.log("API response:", res.data); 
        setData(res.data);
      })
      .catch((err) => console.error(err));

      //setData(dummyData);



  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(str: string) => dayjs(str).format("MMM D")}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label: string) => dayjs(label).format("MMM D, HH:mm")}
          formatter={(value: number) => [`${value}`, "Value"]}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Linegraph;
