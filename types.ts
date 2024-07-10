export type MealType = "breakfast" | "lunch" | "dinner";

export enum Meal {
  "breakfast" = "Breakfast",
  "lunch" = "Lunch",
  "dinner" = "Dinner",
}

export enum nutrients {
  protein = "PROCNT",
  fat = "FAT",
  carbs = "CHOCDF",
}

export interface Food {
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
}

export interface APIResponse {
  text: string;
  parsed: {
    food: Food;
  }[];
  hints: {
    food: Food;
    measures: {
      uri: string;
      label: string;
      weight: number;
      qualified: {
        qualifiers: [
          {
            uri: string;
            label: string;
          }
        ];
        weight: number;
      }[];
    }[];
  }[];
  _links: {
    next: {
      title: "Next page";
      href: string;
    };
  };
}
