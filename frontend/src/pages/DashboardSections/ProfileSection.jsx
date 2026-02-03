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
import React, { useMemo, useState } from "react";

// --- Heatmap ---

const generateYearData = () => {
  const data = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const rand = Math.random();
    let count = 0;
    if (rand > 0.8) count = Math.floor(Math.random() * 5);
    if (rand > 0.95) count = Math.floor(Math.random() * 15) + 5;

    data.push({
      date: d,
      dateString: d.toISOString().split("T")[0],
      count: count,
    });
  }
  return data;
};

const getHeatmapColor = (count) => {
  if (count === 0) return "bg-[#161b22]";
  if (count <= 2) return "bg-[#FDBA74]";
  if (count <= 5) return "bg-[#FB923C]";
  if (count <= 10) return "bg-[#F97316]";
  return "bg-[#EA580C]";
};

const ContributionGraph = () => {
  const [hoveredData, setHoveredData] = useState(null);
  const dailyData = useMemo(() => generateYearData(), []);

  const weeks = useMemo(() => {
    const weeksArr = [];
    let currentWeek = Array(7).fill(null);

    dailyData.forEach((dayObj) => {
      const dayOfWeek = dayObj.date.getDay();
      currentWeek[dayOfWeek] = dayObj;
      if (dayOfWeek === 6) {
        weeksArr.push(currentWeek);
        currentWeek = Array(7).fill(null);
      }
    });
    if (currentWeek.some((d) => d !== null)) weeksArr.push(currentWeek);
    return weeksArr;
  }, [dailyData]);

  const monthLabels = useMemo(() => {
    const labels = [];
    let lastMonth = -1;
    weeks.forEach((week, index) => {
      const firstDay = week.find((d) => d !== null);
      if (!firstDay) return;
      const month = firstDay.date.getMonth();
      if (month !== lastMonth) {
        labels.push({
          index,
          label: firstDay.date.toLocaleString("default", { month: "short" }),
        });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className="bg-[#0b0f14] p-6 rounded-2xl w-full shadow-lg border border-neutral-800">
      <div className="flex justify-between items-end mb-4">
        <h2 className="text-gray-200 text-lg font-semibold">
          Submission History
        </h2>
        <div className="text-xs text-gray-400">
          {dailyData.reduce((acc, curr) => acc + curr.count, 0)} contributions
          in the last year
        </div>
      </div>
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
        <div className="min-w-max">
          <div className="flex mb-2 text-xs text-gray-400 relative h-4">
            {monthLabels.map((m, i) => (
              <span
                key={i}
                style={{ left: `${m.index * 14}px`, position: "absolute" }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col gap-1 pr-2 text-[10px] text-gray-500 justify-between py-1 h-22.5">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>
            <div className="flex gap-0.75">
              {weeks.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-0.75">
                  {week.map((day, dIndex) => {
                    if (!day)
                      return <div key={dIndex} className="w-2.5 h-2.5" />;
                    return (
                      <div
                        key={dIndex}
                        className={`w-2.5 h-2.5 rounded-[2px] ${getHeatmapColor(
                          day.count,
                        )} transition-all duration-200 hover:ring-1 hover:ring-white hover:z-10 relative group`}
                        onMouseEnter={() => setHoveredData(day)}
                        onMouseLeave={() => setHoveredData(null)}
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded pointer-events-none z-20 shadow-xl border border-gray-700">
                          <span className="font-bold text-gray-300">
                            {day.count} submissions
                          </span>
                          <br />
                          <span className="text-gray-400">
                            {new Date(day.date).toDateString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400 justify-end">
        <span>Less</span>
        <div className="w-3 h-3 rounded-sm bg-[#161b22]" />
        <div className="w-3 h-3 rounded-sm bg-[#FDBA74]" />
        <div className="w-3 h-3 rounded-sm bg-[#FB923C]" />
        <div className="w-3 h-3 rounded-sm bg-[#F97316]" />
        <div className="w-3 h-3 rounded-sm bg-[#EA580C]" />
        <span>More</span>
      </div>
    </div>
  );
};

// Array of Rating Changes (Deltas)
const sampleRatingDeltas = [
  0, // Start
  15, // Contest 1
  24,
  -12,
  45,
  -30,
  10,
  80,
  12,
  -5,
  35,
  60,
  -100, // Bad day
  45,
  20,
];

const STARTING_RATING = 800; // default

const ProfileSection = ({ user }) => {
  // Prefix Sum Calculation
  const ratingData = useMemo(() => {
    let currentRating = STARTING_RATING;

    return sampleRatingDeltas.map((delta, index) => {
      currentRating += delta;
      return {
        matchIndex: index, // 0 is initial, 1 is first match...
        matchLabel: index === 0 ? "Start" : `Contest ${index}`,
        rating: currentRating,
        delta: delta,
      };
    });
  }, []);

  // Custom Tooltip for the Line Chart
  const CustomGraphTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{data.matchLabel}</p>
          <p className="text-white font-bold text-base">
            Rating: <span className="text-orange-500">{data.rating}</span>
          </p>
          {data.matchIndex !== 0 && (
            <p
              className={`text-xs font-semibold mt-1 ${data.delta >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              Change: {data.delta > 0 ? "+" : ""}
              {data.delta}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4">
      {/* Top Section: Avatar & Line Chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Profile Card */}
        <div className="bg-neutral-900 rounded-xl p-6 w-full lg:w-1/3 text-white shadow-md border border-neutral-800">
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-linear-to-r from-orange-600 to-amber-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={
                  user?.avatar ||
                  "https://riqieznxfrbdfcyfoxss.supabase.co/storage/v1/object/public/avatars/defaultPic.webp"
                }
                alt={user?.fullName}
                className="relative h-44 w-44 rounded-full object-cover border-4 border-neutral-900"
              />
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold">
                {user?.fullName || "User Name"}
              </h2>
              <p className="text-xl text-orange-400 font-mono mt-1">
                {user?.title || "Specialist"}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                @{user?.username || "username"}
              </p>
            </div>

            <div className="w-full h-px bg-neutral-800 my-2"></div>

            <div className="flex justify-between w-full px-4 text-sm">
              <div className="text-center">
                <span className="block font-bold text-lg text-white">
                  {ratingData[ratingData.length - 1].rating}
                </span>
                <span className="text-gray-500">Rating</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg text-white">453</span>
                <span className="text-gray-500">Solved</span>
              </div>
              <div className="text-center">
                <span className="block font-bold text-lg text-white">
                  Top 5%
                </span>
                <span className="text-gray-500">Rank</span>
              </div>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-neutral-900 rounded-xl p-6 w-full lg:w-2/3 text-white shadow-md border border-neutral-800 flex flex-col">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
            Rating Progress
          </h3>
          <div className="flex-1 min-h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ratingData}>
                <CartesianGrid
                  stroke="#333"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="matchIndex"
                  stroke="#6b7280"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                  tickFormatter={(val) => (val === 0 ? "" : `#${val}`)} // Don't show 0, show #1, #2
                />
                <YAxis
                  stroke="#6b7280"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                  // The first value is the min (800), the second is max (auto calculates it)
                  domain={[800, "auto"]}
                />
                <Tooltip
                  content={<CustomGraphTooltip />}
                  cursor={{ stroke: "#374151", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#F97316"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#F97316", strokeWidth: 0 }}
                  activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full Horizontal Heatmap Calendar */}
      <ContributionGraph />
    </div>
  );
};

export default ProfileSection;
