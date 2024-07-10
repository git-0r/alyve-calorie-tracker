"use client";
import { ArrowLeft, Loader2, Search as SearchIcon, X } from "lucide-react";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { useDebounce } from "@uidotdev/usehooks";
import { useDateStore, useTrackerStore } from "@/store";
import { APIResponse, MealType } from "@/types";

export default function Search({ activeTab }: { activeTab: string }) {
  const addFoodItem = useTrackerStore((state) => state.addFoodItem);
  const activeDate = useDateStore((state) => state.date);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<APIResponse | null>(null);
  const handleInputFocus = () => {
    if (!isInputFocused) {
      setIsInputFocused(true);
    }
  };

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!debouncedSearchTerm) return;
    const searchFood = async () => {
      let results;
      setIsSearching(true);
      if (debouncedSearchTerm) {
        const data = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}${new URLSearchParams({
            app_id: process.env.NEXT_PUBLIC_APP_ID as string,
            app_key: process.env.NEXT_PUBLIC_APP_KEY as string,
            ingr: debouncedSearchTerm,
          }).toString()}`
        );
        results = await data.json();
        setSearchResults(results);
      }
      setIsSearching(false);
    };

    searchFood();
  }, [debouncedSearchTerm]);

  const handleFoodSelection = (e: MouseEvent) => {
    const selectedFoodItemId = (e.target as HTMLElement).dataset.foodId;
    if (!selectedFoodItemId) return;
    const foodItem = searchResults?.hints?.find(
      (item) => item.food.foodId === selectedFoodItemId
    );
    addFoodItem({ ...foodItem, type: activeTab }, activeDate);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults(null);
    setIsInputFocused(false);
  };

  return (
    <Popover open={isInputFocused && Boolean(searchTerm)}>
      <PopoverAnchor>
        <div className="border rounded-lg overflow-hidden p-2 flex items-center gap-2 my-2">
          {isInputFocused ? (
            <ArrowLeft size={16} onClick={clearSearch} />
          ) : (
            <SearchIcon size={16} />
          )}
          <input
            type="text"
            value={searchTerm}
            placeholder="search"
            autoFocus={isInputFocused}
            onChange={handleSearchTermChange}
            onFocus={handleInputFocus}
            className="focus:outline-none w-full"
          />
          {isInputFocused && <X size={16} onClick={clearSearch} />}
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="PopoverContent"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="space-y-2" onClick={handleFoodSelection}>
          {searchResults?.hints?.map((sr, index: number) => (
            <p
              key={sr.food.foodId + index}
              className="hover:bg-slate-100 cursor-pointer"
              data-food-id={sr.food.foodId}
            >
              {sr.food.label}
            </p>
          ))}
          {isSearching && (
            <Loader2 size={24} className="animate-spin mx-auto" />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
