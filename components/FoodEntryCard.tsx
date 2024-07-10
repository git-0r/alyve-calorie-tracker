import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MealType } from "@/types";
import { useDateStore, useTrackerStore } from "@/store";
import { X } from "lucide-react";

export default function FoodEntryCard({ mealType }: { mealType: MealType }) {
  const trackerStore = useTrackerStore((state) => state.data);
  const deleteFoodEntry = useTrackerStore((state) => state.deleteFoodEntry);
  const activeDate = useDateStore((state) => state.date);

  const mealData = trackerStore[activeDate]?.filter(
    (item) => item.type === mealType
  );

  if (!mealData?.length) {
    return <p>No items in the list!</p>;
  }

  return mealData?.map((item) => (
    <Card key={item.food.foodId} className="my-4 relative">
      <X
        size={24}
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() =>
          deleteFoodEntry("breakfast", item.food.foodId, activeDate)
        }
      />
      <CardHeader className="flex flex-row gap-4 items-center">
        <Avatar className="rounded-md">
          <AvatarImage src={item.food.image} alt={item.food.label} />
          <AvatarFallback className="rounded-none text-gray-400">
            NA
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{item.food.label}</CardTitle>
          <CardDescription className="pt-1">
            🔥{item.food.nutrients.ENERC_KCAL.toFixed(0)} kcal . 100G
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div key={item.food.foodId} className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <Progress
              value={Number(item.food.nutrients.PROCNT.toFixed(0))}
              max={20}
              className="[&>*]:bg-green-600 -rotate-90 w-10"
            />
            <div>
              <p className="font-bold">
                {item.food.nutrients.PROCNT.toFixed(0)}g
              </p>
              <p className="text-sm">Protein</p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <Progress
              value={Number(item.food.nutrients.CHOCDF.toFixed(0))}
              max={100}
              className="[&>*]:bg-orange-600 -rotate-90 w-10"
            />
            <div>
              <p className="font-bold">
                {item.food.nutrients.CHOCDF.toFixed(0)}g
              </p>
              <p className="text-sm">Carbs</p>
            </div>
          </div>
          <div className="flex flex-row items-center">
            <Progress
              value={Number(item.food.nutrients.FAT.toFixed(0))}
              max={50}
              className="[&>*]:bg-purple-600 -rotate-90 w-10"
            />
            <div>
              <p className="font-bold">{item.food.nutrients.FAT.toFixed(0)}g</p>
              <p className="text-sm">Fat</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
