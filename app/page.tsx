"use client";
import DailyStats from "@/components/DailyStats";
import MealCard from "@/components/MealCard";
import RenderDates from "@/components/RenderDates";
import { Button } from "@/components/ui/button";
import { useDateStore, useTrackerStore } from "@/store";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const trackerData = useTrackerStore((state) => state.data);
  const activeDate = useDateStore((state) => state.date);
  const [showDates, setShowDates] = useState(false);
  const dateToday = format(new Date(), "MMM dd");
  const totalCalorieCount =
    trackerData[activeDate]
      ?.reduce((acc, curr) => acc + curr.food.nutrients.ENERC_KCAL, 0)
      .toFixed(0) ?? 0;

  const handleDatesToggle = () => setShowDates((prev) => !prev);

  return (
    <main className="space-y-4 relative pb-20">
      <div
        className="my-4 cursor-pointer select-none"
        onClick={handleDatesToggle}
      >
        <p className="text-gray-500">Hello, User!</p>
        <p className="text-2xl font-bold">Today, {dateToday}</p>
      </div>
      {showDates && <RenderDates />}
      <DailyStats />
      <p>
        <span className="text-2xl font-semibold">
          {totalCalorieCount}
          /2500 Kcal
        </span>
      </p>
      <MealCard type="breakfast" />
      <MealCard type="lunch" />
      <MealCard type="dinner" />
      <Button
        asChild
        variant="outline"
        className="rounded-full size-14 fixed bottom-4 left-1/2"
      >
        <Link href="/new-entry">
          <Plus size={32} />
        </Link>
      </Button>
    </main>
  );
}
