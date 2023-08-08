"use client";
import { addDays, format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import toast from "react-hot-toast";
// import { ToastAction } from "./toast";
// import { useToast } from "./use-toast";

const tid = "calendar_toast_id";

export function DatePicker({ date, setDate, endDate, className }) {
    const today = new Date();
    const et = new Date(endDate);

    const handleDateSubmit = (d) => {
        if (d.getTime() > et.getTime()) {
            toast.error("Date should be before end date", { id: tid });
            return;
        } else if (d.getTime() < today.getTime() - 86400000) {
            toast.error("Date should be after today or today", { id: tid });
            return;
        } else {
            setDate(d);
        }
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-96 text-[#7B7D92] justify-between text-left font-normal border",
                            !date && "text-muted-foreground",
                            className
                        )}
                    >
                        {date ? (
                            <>{format(date, "LLL dd, y")}</>
                        ) : (
                            <span className="py-4">Pick a date</span>
                        )}
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
