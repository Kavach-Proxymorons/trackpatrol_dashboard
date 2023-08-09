import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui-components/card";

import { Badge } from "./ui-components/badge";
import { ArrowUpRight, CalendarRange, Navigation, User2 } from "lucide-react";
import { Separator } from "./ui-components/separator";
import { useNavigate } from "react-router-dom";

const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];

export default function DashboardCard({ duty }) {
    const Navigate = useNavigate();
    const priority = [
        { color: "green", title: "Low" },
        { color: "yellow", title: "Medium" },
        { color: "red", title: "High" }
    ];

    const title = priority[Math.min(2, duty.shifts.length)].title;
    const startTime = new Date(duty.start_time);
    const endTime = new Date(duty.end_time);

    return (
        <Card
            className="w-[320px] flex flex-col justify-between cursor-pointer"
            onClick={() => {
                Navigate(`/dashboard/${duty._id}`);
            }}
        >
            <div>
                <div className="flex justify-between mt-4 mx-4 items-center">
                    <Badge variant={"outline"} className={`badge${title}`}>
                        {title}
                    </Badge>
                    <ArrowUpRight size={30} />
                </div>
                <CardHeader className="pt-3 px-4">
                    <CardTitle>{duty?.title}</CardTitle>
                    <CardDescription>{duty?.description}</CardDescription>
                </CardHeader>
            </div>
            <div>
                <CardContent className="py-0 px-4">
                    <div className="flex gap-x-2 items-center bg-blue-50 p-2 rounded">
                        <div className="w-8 h-10 flex items-center">
                            {" "}
                            <Navigation size={25} />
                        </div>
                        <span className="">{duty.venue}</span>
                    </div>
                </CardContent>
                <Separator className="my-4" />
                <CardFooter className="flex justify-start pb-4 px-4">
                    {/* <div className="flex items-center gap-x-2">
                        <User2 size={20} />
                        <p className="pt-1">200 Pers.</p>
                    </div> */}
                    <div className="flex items-center gap-x-2">
                        <CalendarRange size={20} />
                        <p className="pt-1">
                            {startTime.getDate()} {month[startTime.getMonth()]}{" "}
                            - {endTime.getDate()} {month[endTime.getMonth()]}
                        </p>
                    </div>
                </CardFooter>
            </div>
        </Card>
    );
}

/*
title: 
description: 
*/
