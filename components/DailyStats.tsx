import { useDateStore, useTrackerStore } from "@/store";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { nutrients } from "@/types";
import ProgressBar from "./ProgressBar";

export default function DailyStats() {
  const trackerData = useTrackerStore((state) => state.data);
  const activeDate = useDateStore((state) => state.date);
  const totalCalorieCount =
    trackerData[activeDate]?.reduce(
      (acc, curr) => acc + curr.food.nutrients.ENERC_KCAL,
      0
    ) ?? 0;
  const targetPercent = ((totalCalorieCount / 2500) * 100).toFixed(0);
  const getNutruientInfo = (nutrient: "protein" | "fat" | "carbs") => {
    const totalNutrient =
      trackerData[activeDate]
        ?.reduce(
          (acc, curr) => acc + curr.food.nutrients[nutrients[nutrient]],
          0
        )
        .toFixed(0) ?? 0;
    return Number(totalNutrient);
  };

  const totalProtein = getNutruientInfo("protein") / 10;
  const totalFat = getNutruientInfo("fat") / 10;
  const totalCarbs = getNutruientInfo("carbs") / 10;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center flex-wrap justify-center gap-4 sm:justify-between sm:gap-0">
          <div className="sm:basis-1/2 basis-full text-center flex items-center justify-center">
            <ProgressBar progress={Number(targetPercent)} size={175} />
          </div>
          <div className="flex flex-col sm:basis-1/2 basis-full space-y-2">
            <div>
              <p>Protein</p>
              <Progress value={totalProtein} max={27} />
              <p className="text-sm text-gray-400">{totalProtein}/27g</p>
            </div>
            <div>
              <p>Fat</p>
              <Progress max={100} value={totalFat} />
              <p className="text-sm text-gray-400">{totalFat}/100g</p>
            </div>
            <div>
              <p>Carbs</p>
              <Progress max={300} value={totalCarbs} />
              <p className="text-sm text-gray-400">{totalCarbs}/300g</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
