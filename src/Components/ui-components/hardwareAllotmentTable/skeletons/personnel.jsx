import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "../../button"
import { Checkbox } from "../../checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../dropdown-menu"

export const headers = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "sid",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-sm px-0"
        >
          MEMBER ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("sid")}</div>,
  },
  {
    accessorKey: "official_name",
    header: "OFFICIAL NAME",
    cell: ({ row }) => <div className="capitalize">{row.getValue("official_name")}</div>,
  },
  {
    accessorKey: "blood_group",
    header: "BLOOD GROUP",
    cell: ({ row }) => <div className="capitalize">{row.getValue("blood_group")}</div>,
  },
  {
    accessorKey: "gender",
    header: "GENDER",
    cell: ({ row }) => <div className="capitalize">{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "designation",
    header: "DESIGNATION",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("designation")}</div>
    ),
  },
  {
    accessorKey: "posted_at",
    header: "POSTED AT",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("posted_at")}</div>
    ),
  },
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Lorem.
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lorem</DropdownMenuItem>
            <DropdownMenuItem>Lorem</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];