import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "../../ui-components/button";

export const hardwareHeader = [
    {
        accessorKey: "sid",
        header: ({ column }) => {
            return (
                <Button variant="ghost" className="text-sm px-0">
                    HARDWARE ID
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue("sid")}</div>
    },
    {
        accessorKey: "secret",
        header: "Secret",
        cell: ({ row }) => <div className="">{row.getValue("secret")}</div>
    },
    {
        accessorKey: "name",
        header: "HARDWARE NAME",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("name")}</div>
        )
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("description")}</div>
        )
    },
    {
        accessorKey: "type",
        header: "TYPE",
        cell: ({ row }) => (
            <div className="lowercase">{row.getValue("type")}</div>
        )
    },
    {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
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
