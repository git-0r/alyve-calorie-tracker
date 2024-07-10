"use client";
import { cn, getDatesInMonth, getDayOfWeek } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { SyntheticEvent, useEffect, useState } from "react";
import { getMonth, getYear, isEqual, set, startOfWeek } from "date-fns";
import { useDateStore } from "@/store";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { CalendarSearchIcon } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const RenderDates = () => {
  const activeDate = useDateStore((state) => state.date);
  const setDate = useDateStore((state) => state.setDate);
  const dates = getDatesInMonth(getMonth(activeDate), getYear(activeDate));
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) {
      return;
    }
    const weekStartsOn =
      startOfWeek(new Date(activeDate), { weekStartsOn: 1 }).getDate() - 1;

    if (getMonth(activeDate) === getMonth(new Date())) {
      api.scrollTo(weekStartsOn, true);
    } else {
      api.scrollTo(0, true);
    }
  }, [api, activeDate]);

  const onMonthChange = (month: string) => {
    if (Number(month) === getMonth(Date())) {
      setDate(new Date().toDateString());
      return;
    }
    setDate(set(new Date(), { month: Number(month), date: 1 }).toDateString());
  };
  const handleDateChange = (e: SyntheticEvent) => {
    const index = (e.target as HTMLParagraphElement)?.dataset?.carouselIndex;
    if (!index) return;
    setDate(dates[Number(index)].toDateString());
  };

  return (
    <div className="my-4 animate-in zoom-in-75">
      <div className="flex justify-between">
        <Select
          onValueChange={onMonthChange}
          value={getMonth(activeDate).toString()}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={months[`${getMonth(activeDate)}`]} />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={month} value={index.toString()}>
                {months[index]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" asChild className="p-2">
              <div>
                <CalendarSearchIcon size={24} />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0 border-none">
            <Calendar
              mode="single"
              selected={new Date(activeDate)}
              onSelect={(date) =>
                setDate(date?.toDateString() || new Date().toDateString())
              }
              className="rounded-md border shadow"
            />
          </PopoverContent>
        </Popover>
      </div>

      <Carousel setApi={setApi}>
        <CarouselContent className="my-4" onClick={handleDateChange}>
          {dates.map((date, index) => (
            <CarouselItem
              key={date.toISOString()}
              className="basis-[calc(100%/7)]"
            >
              <p
                className={cn(
                  "flex flex-col gap-2 items-center text-center rounded-3xl select-none p-2 cursor-pointer hover:bg-slate-100",
                  isEqual(activeDate, date.toDateString())
                    ? "text-blue-500 border hover:bg-white"
                    : ""
                )}
                data-carousel-index={index}
              >
                {getDayOfWeek(date)} <br />
                {String(date.getDate()).padStart(2, "0")}
              </p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default RenderDates;
