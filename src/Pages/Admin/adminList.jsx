import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "../../Components/ui-components/button";

export const header = [
    // {
    //     accessorKey: "id",
    //     header: ({ column }) => {
    //         return (
    //             <Button variant="ghost" className="text-sm px-0">
    //                 MEMBER ID
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => (
    //         <div className="lowercase">{row.getValue("sid")}</div>
    //     )
    // },
    {
        accessorKey: "name",
        header: "NAME",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        )
    },
    {
        accessorKey: "police_station",
        header: "POLICE STATION",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("police_station")}</div>
        )
    },
    {
        accessorKey: "role",
        header: "ROLE",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("role")}</div>
        )
    },
    {
        accessorKey: "last_login",
        header: "LAST LOGIN",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("last_login")}</div>
        )
    },
   
];
