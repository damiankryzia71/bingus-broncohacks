import React, { useEffect, useState } from "react";
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

// Define the shape of your API data
interface MonthlyScore {
  month: string;         // example: "2025-04"
  average_score: number; // example: 78
}

const MonthlyWellnessChart: React.FC = () => {
  const [data, setData] = useState<MonthlyScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonthlyScores = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/app/wellness-scores/monthly-scores/");
        if (!response.ok) {
          throw new Error("Failed to fetch wellness scores");
        }
        const result: MonthlyScore[] = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Unable to load wellness scores");
        setLoading(false);
      }
    };

    fetchMonthlyScores();
  }, []);

  if (loading) {
    return <div>Loading wellness chart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ 
      width: "100%", 
      height: 500,
      backgroundColor: "#FAFAFA",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 8px 10px  #C8BFE7", 
      overflow: "hidden",  
      
      }}>


      <div
        style={{
          padding: "15px 20px",
          backgroundColor: "#FAFAFA",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "600",
            color: "#C8BFE7",
            fontFamily: "Geneva",
          }}
        >
          Your Latest Wellness Scores
        </h1>
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid stroke="#ddd" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            //tickFormatter={formatMonth}
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#999" }}
            tickLine={{ stroke: "#999" }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#666", fontSize: 12 }}
            axisLine={{ stroke: "#999" }}
            tickLine={{ stroke: "#999" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: 4,
            }}
            labelStyle={{ fontWeight: "bold", color: "#333" }}
            formatter={(value: number) => [`${value}`, "Wellness Score"]}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{
              top: 0,
              left: 0,
              lineHeight: "30px",
            }}
          />
          <Line 
          type="monotone" 
          dataKey="wellness_scores" 
          stroke="#C8BFE7" 
          strokeWidth={3} 
          dot={{
            stroke: "#C8BFE7",
            strokeWidth: 2,
            fill: "#fff",
            r: 4,
          }}
          activeDot={{
            r: 8,
            fill: "#C8BFE7",
            stroke: "#fff",
            strokeWidth: 2,
          }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyWellnessChart;