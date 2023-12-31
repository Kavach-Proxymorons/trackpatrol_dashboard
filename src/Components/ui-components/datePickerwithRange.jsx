import { useState, useEffect } from "react";
import { addDays, format, set } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useStateContext } from "../../Contexts/ContextProvider";
import { toast } from "react-hot-toast";

const today = new Date();
export function DatePickerWithRange({ date, setDate, className }) {
    const { setRegisterDuty, setRegisterShift } = useStateContext();
    useEffect(() => {
        console.log("here");
        if (date.from < today - 86400000 || date.to < today - 86400000) {
            toast.error("Please select a valid date", { id: "datePicker" });
            return;
        }

        setRegisterDuty((prev) => ({
            ...prev,
            start_time: date.from,
            end_time: date.to
        }));

        setRegisterShift((prev) => ({
            ...prev,
            start_time: date.from,
            end_time: date.to
        }));
    }, [date]);

    const handleDateSubmit = (selectedDate) => {
        console.log(today);
        if (selectedDate?.to) {
            if (selectedDate?.to < today - 86400000) {
                toast.error("Please select a valid date", { id: "datePicker" });
                return;
            }
            setDate({
                from: selectedDate.from,
                to: selectedDate.to
            });
        } else if (selectedDate?.from) {
            if (selectedDate?.from < today - 86400000) {
                toast.error("Please select a valid date", { id: "datePicker" });
                return;
            }
            setDate({
                from: selectedDate.from,
                to: selectedDate.from
            });
        } else {
            setDate({});
        }
    };

    return (
        <div className={cn("grid gap-2 ", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-96 text-[#7B7D92] justify-start bg-background text-left font-normal rounded",
                            !date && "text-muted-foreground",
                            className
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span className="py-4">Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleDateSubmit}
                        numberOfMonths={1}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
