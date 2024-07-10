import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MealType } from "./types";

interface TrackerState {
  data: {
    [key: string]: {
      food: {
        foodId: string;
        label: string;
        knownAs: string;
        nutrients: {
          ENERC_KCAL: number;
          PROCNT: number;
          FAT: number;
          CHOCDF: number;
          FIBTG: number;
        };
        category: string;
        categoryLabel: string;
        image: string;
      };
      type: MealType;
    }[];
  };
  addFoodItem: (foodItem: any, date: string) => void;
  deleteFoodEntry: (type: MealType, foodId: string, date: string) => void;
}

export const useTrackerStore = create<TrackerState>()(
  persist(
    (set) => ({
      data: {},
      addFoodItem: (foodItem, date) =>
        set((state) => {
          return {
            data: {
              ...state.data,
              [date]: [...(state?.data?.[date] ?? []), foodItem],
            },
          };
        }),
      deleteFoodEntry: (type, foodId, date) =>
        set((state) => {
          return {
            data: {
              ...state.data,
              [date]: [
                ...state.data?.[date]?.filter((entry) => entry.type !== type),
                ...state.data?.[date]
                  ?.filter((entry) => entry.type === type)
                  .filter((entry) => entry.food.foodId !== foodId),
              ],
            },
          };
        }),
    }),
    {
      name: "tracker-storage",
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

interface DateStoreState {
  date: string;
  setDate: (date: string) => void;
}

export const useDateStore = create<DateStoreState>()((set) => ({
  date: new Date().toDateString(),
  setDate: (date: string) => set((state) => ({ date })),
}));
