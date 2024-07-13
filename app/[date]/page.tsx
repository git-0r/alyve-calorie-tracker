"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import RenderDates from "@/components/RenderDates";
import Link from "next/link";
import FoodEntryCard from "@/components/FoodEntryCard";
import Search from "@/components/Search";
import { useDateStore, useTrackerStore } from "@/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NewEntry({ params }: { params: { date: string } }) {
  const setDate = useDateStore((state) => state.setDate);
  const router = useRouter();
  const pathname = usePathname();
  const handleTabChange = (value: string) => {
    router.push(pathname + "?" + createQueryString("type", value));
  };
  const searchParams = useSearchParams();
  const mealType = searchParams.get("type");

  useEffect(() => {
    setDate(params.date.split("%20").join(" "));
  }, [params.date]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <main>
      <RenderDates />
      <Tabs
        defaultValue={mealType || "breakfast"}
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full">
          <TabsTrigger value="breakfast" className="w-4/12">
            Breakfast
          </TabsTrigger>
          <TabsTrigger value="lunch" className="w-4/12">
            Lunch
          </TabsTrigger>
          <TabsTrigger value="dinner" className="w-4/12">
            Dinner
          </TabsTrigger>
        </TabsList>
        <Search activeTab={mealType || "breakfast"} />
        <TabsContent value="breakfast">
          <FoodEntryCard mealType="breakfast" />
        </TabsContent>
        <TabsContent value="lunch">
          <FoodEntryCard mealType="lunch" />
        </TabsContent>
        <TabsContent value="dinner">
          <FoodEntryCard mealType="dinner" />
        </TabsContent>
      </Tabs>
      <Button className="w-full" asChild>
        <Link href="/">Done</Link>
      </Button>
    </main>
  );
}
