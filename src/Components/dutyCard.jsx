import { Button } from "./ui-components/button";
import Input from "./ui-components/input";
import Label from "./ui-components/label";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardCard({ duty }) {
    const Navigate = useNavigate();
    const priority = [
        { color: "red", title: "High" },
        { color: "yellow", title: "Medium" },
        { color: "green", title: "Low" }
    ];

    let title = priority[Math.min(2, duty.shifts.length)].title;
    let color = priority[Math.min(2, duty.shifts.length)].color;
    useEffect(() => {
        title = priority[Math.min(2, duty.shifts.length)].title;
        color = priority[Math.min(2, duty.shifts.length)].color;
    }, []);
    return (
        <Card className="w-[320px] shadow flex flex-col justify-between">
            <div>
                <div className="flex justify-between mt-4 mx-4 items-center">
                    <Badge
                        variant={"outline"}
                        className={`text-${color}-500 bg-${color}-50 px-3`}
                    >
                        {title}
                    </Badge>
                    <ArrowUpRight
                        size={30}
                        className=""
                        onClick={() => {
                            Navigate(`/dashboard/${duty._id}`);
                        }}
                    />
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
                <CardFooter className="flex justify-between pb-4 px-4">
                    <div className="flex items-center gap-x-2">
                        <User2 size={20} />
                        <p className="pt-1">200 Personnel</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <CalendarRange size={20} />
                        <p className="pt-1">25 Oct - 2 Nov</p>
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
