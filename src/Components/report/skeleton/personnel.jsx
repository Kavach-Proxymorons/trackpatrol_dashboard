import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "../../ui-components/button";

export const personnelHeader = [
    {
        accessorKey: "sid",
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="text-sm px-0">
                    MEMBER ID
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("sid")}</div>
        )
    },
    {
        accessorKey: "name",
        header: "OFFICIAL NAME",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        )
    },
    {
        accessorKey: "designation",
        header: "DESIGNATION",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("designation")}</div>
        )
    },
    {
        accessorKey: "score",
        header: "SCORE",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("score")}</div>
        )
    },
    {
        accessorKey: "gender",
        header: "GENDER",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("gender")}</div>
        )
    },
    {
        accessorKey: "posted_at",
        header: "POSTED AT",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("posted_at")}</div>
        )
    }
    // {
    //   accessorKey: "amount",
    //   header: () => <div className="text-right">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"));

    //     // Format the amount as a dollar amount
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount);

    //     return <div className="text-right font-medium">{formatted}</div>;
    //   },
    // },
];
