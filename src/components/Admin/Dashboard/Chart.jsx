import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
const data = [
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
  { name: "July", Total: 1200 },
  { name: "August", Total: 2400 },
];

export default function RenderLineChart({ aspect, title }) {
  return (
    <div className="chart  rounded-lg bg-white p-4 drop-shadow-lg">
      <div className="px-4 pb-4 text-xl font-medium">{title}</div>
      <ResponsiveContainer className="text-sm" width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="name"
            stroke="gray"
          />
          <YAxis axisLine={false} tickLine={false} stroke="gray" />
          {/* <CartesianGrid strokeDasharray="3 3" className="chartGrid" /> */}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
