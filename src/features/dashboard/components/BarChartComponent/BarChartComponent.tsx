import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface BarChartComponentProps {
  data: any[];
  dataKey: string;
  xAxisDataKey: string;
  title: string;
  color: string;
}

export const BarChartComponent = ({
  data,
  dataKey,
  xAxisDataKey,
  title,
  color,
}: BarChartComponentProps) => {
  return (
    <section aria-label={title} style={{ width: "100%", height: 300 }}>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};
