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
    <div style={{ width: "100%", height: 500 }}>
      <h2>Your Monthly Wellness Scores</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="wellness_scores" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyWellnessChart;