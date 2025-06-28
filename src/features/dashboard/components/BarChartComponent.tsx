import { BarChart, Bar, XAxis, YAxis } from "recharts";

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
    <div>
      <h3>{title}</h3>
      <BarChart width={300} height={250} data={data}>
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Bar dataKey={dataKey} fill={color} />
      </BarChart>
    </div>
  );
};
