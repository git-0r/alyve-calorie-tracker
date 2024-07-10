"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RenderDates from "@/components/RenderDates";
import Link from "next/link";
import FoodEntryCard from "@/components/FoodEntryCard";
import Search from "@/components/Search";

export default function NewEntry() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const handleTabChange = (value: string) => setActiveTab(value);

  return (
    <main>
      <RenderDates />
      <Tabs
        defaultValue={activeTab}
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
        <Search activeTab={activeTab} />
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
