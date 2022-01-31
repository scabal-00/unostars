import React from "react";
import { ResponsiveContainer } from "recharts";

const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ colour, percentage }) => {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.

  return (
    <>
      <circle
        r={r}
        cx={100}
        cy={100}
        fill="transparent"
        stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
        strokeWidth={"10%"}
        strokeDasharray={circ}
        strokeDashoffset={percentage ? strokePct : 0}
        strokeLinecap="round"
      ></circle>
    </>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="100"
      y="100"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const ProgressCircle = ({ percentage, color1, color2 }) => {
  const pct = cleanPercentage(percentage);

  return (
    <svg width={200} height={200}>
      <defs>
        <linearGradient id="myGradient">
          <stop offset="0%" stop-color={color1} />
          <stop offset="100%" stop-color={color2} />
        </linearGradient>
      </defs>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" />
        <Circle colour={"url(#myGradient)"} percentage={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default ProgressCircle;
