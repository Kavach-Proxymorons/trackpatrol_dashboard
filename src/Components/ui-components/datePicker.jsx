"use client";
import { addDays, format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({ date, setDate, className }) {
  
  const handleDateSubmit = (d) => {
    console.log(d);
    setDate(() => d);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-96 text-[#7B7D92] justify-between text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date? 
                <>
                  {format(date, "LLL dd, y")}
                </>
              : 
              <span className="py-4">Pick a date</span>
            }
            <CalendarIcon className="mr-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleDateSubmit}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
