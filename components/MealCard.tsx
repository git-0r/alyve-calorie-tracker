import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDateStore, useTrackerStore } from "@/store";
import { Meal, MealType } from "@/types";
import { useRouter } from "next/navigation";

export default function MealCard({ type }: { type: MealType }) {
  const router = useRouter();
  const trackerData = useTrackerStore((state) => state.data);
  const activeDate = useDateStore((state) => state.date);

  return (
    <Card onClick={() => router.push(`/${activeDate}?type=${type}`)}>
      <CardHeader>
        <CardTitle className="text-2xl">{Meal[type]}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <span className="text-2xl font-semibold">
            {trackerData[activeDate]
              ?.filter((entry) => entry.type === type)
              .reduce((acc, curr) => acc + curr.food.nutrients.ENERC_KCAL, 0)
              .toFixed(0) ?? 0}
          </span>{" "}
          calories
        </p>
        <div>
          {trackerData[activeDate]
            ?.filter((entry) => entry.type === type)
            .map((foodItem) => (
              <p key={foodItem.food.foodId} className="flex">
                <span className="basis-8/12">{foodItem.food.label}</span>
                <span>{foodItem.food.nutrients.ENERC_KCAL.toFixed(0)} cal</span>
              </p>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
