"use client";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const sampleGraphData = [
  { day: "Mon", rating: 800 },
  { day: "Tue", rating: 1000 },
  { day: "Wed", rating: 900 },
  { day: "Thu", rating: 1200 },
  { day: "Fri", rating: 1150 },
  { day: "Sat", rating: 1120 },
  { day: "Sun", rating: 1245 },
];

const heatmapColors = [
  "#4B5563", // 0
  "#FEE2B3", // 1
  "#FDBA74", // 2
  "#FB923C", // 3
  "#F97316", // 4
  "#EA580C", // 5
];

const getLastSixMonths = () => {
  const months = [];
  const date = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
    months.push(d.toLocaleString("default", { month: "short" }));
  }
  return months;
};

const lastSixMonths = getLastSixMonths();

const sampleHeatMapData = Array.from({ length: 6 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
);

const ProfileSection = ({ user }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-neutral-900 rounded-xl p-6 w-full md:w-1/3 text-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col items-center gap-4">
            <img
              src={
                user?.avatar ||
                "https://riqieznxfrbdfcyfoxss.supabase.co/storage/v1/object/public/avatars/defaultPic.webp"
              }
              alt={user?.fullName}
              className="h-44 w-44 rounded-full object-cover border-2 border-orange-500 transition-transform duration-300 hover:scale-105"
            />
            <h2 className="text-3xl font-bold">{user?.fullName}</h2>
            <p className="text-xl text-orange-400">{user?.title || "Newbie"}</p>
            <p className="text-gray-300 text-sm">
              {user?.username || "noUser"}
            </p>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-neutral-900 rounded-xl p-4 w-full md:w-2/3 text-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-4">Rating Progress</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sampleGraphData}>
                <CartesianGrid stroke="#555" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    borderRadius: "8px",
                    border: "none",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#F2613F"
                  strokeWidth={2}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold mb-2">Heatmap</h3>

        <div className="flex justify-between text-xs text-gray-400 mb-1 px-1">
          {lastSixMonths.map((month, idx) => (
            <span key={idx}>{month}</span>
          ))}
        </div>

        <div className="grid grid-cols-6 gap-1 justify-items-center">
          {sampleHeatMapData.flat().map((count, idx) => (
            <div
              key={idx}
              className="h-6 w-6 rounded-sm transition-all duration-300 transform hover:scale-125 cursor-pointer"
              style={{ backgroundColor: heatmapColors[count] }}
              title={`${count} duels solved`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
