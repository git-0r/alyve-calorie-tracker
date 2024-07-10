"use client";

import { getLastSevenDays } from "@/lib/utils";
import { useTrackerStore } from "@/store";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Analytics() {
  const trackerData = useTrackerStore((state) => state.data);
  const lastSevenDays = getLastSevenDays();

  const chartData = lastSevenDays.map((date) => {
    if (trackerData[date]) {
      return {
        date,
        count: trackerData[date]
          .reduce((acc, curr) => acc + curr.food.nutrients.ENERC_KCAL, 0)
          .toFixed(0),
      };
    } else {
      return { date, count: 0 };
    }
  });

  const maxValue = Math.max(...chartData.map((d) => Number(d.count)));

  const chartConfig = {
    calories: {
      label: "Calories",
      color: "#2563eb",
    },
  } satisfies ChartConfig;

  return (
    <div className="my-8">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="count"
            tickLine={false}
            axisLine={false}
            domain={[0, maxValue]}
            tickCount={10}
          />
          <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
          <Bar dataKey="count" fill="var(--primary)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
