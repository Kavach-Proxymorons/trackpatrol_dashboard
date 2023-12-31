import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../Contexts/ContextProvider";
import AuthContext from "../../../Contexts/AuthContext";

import {
    ColumnDef,
    ColumnFiltersState,
    ColumnSizing,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    MoreHorizontal,
    Plus,
    RefreshCcw
} from "lucide-react";

import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../dropdown-menu";
import Input from "../input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./table";

export default function DataTable({
    columns,
    path,
    data,
    fetchData,
    assignedPersonnelsId,
    setAddPersonnelRespData,
    shift_id
}) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const [columnVisibility, setColumnVisibility] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [searchByName, setSearchByName] = useState("sid");
    const { token } = useContext(AuthContext);

    const baseUrl =
        process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_DEV_URL
            : process.env.REACT_APP_PROD_URL;

    const handleAttachClick = async () => {
        try {
            // array of selected personnel_id
            const selectedPersonnel = Object.keys(rowSelection).filter(
                (personnel_id) => rowSelection[personnel_id]
            );

            // array of selected personnell_ids
            const selectedPersonnelIds = [];
            selectedPersonnel.forEach((rowIndex) => {
                selectedPersonnelIds.push(data[rowIndex]._id);
            });

            const response = await fetch(
                `${baseUrl}admin/shift/${shift_id}/add_personnel`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        personnel_array: selectedPersonnelIds
                    })
                }
            );

            const res = await response.json();
            console.log("api response", res);
            setAddPersonnelRespData(res.data);

            fetchData(shift_id);
            setRowSelection({});
        } catch (error) {
            console.log(error);
        }
    };

    const handleDetchClick = async () => {
        try {
            // array of selected personnel_id
            const selectedPersonnel = Object.keys(rowSelection).filter(
                (personnel_id) => rowSelection[personnel_id]
            );

            // array of selected hardware_ids
            const selectedPersonnelIds = [];
            selectedPersonnel.forEach((rowIndex) => {
                selectedPersonnelIds.push(data[rowIndex]._id);
            });

            const response = await fetch(
                `${baseUrl}admin/shift/${shift_id}/remove_personnel`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        personnel_array: selectedPersonnelIds
                    })
                }
            );

            const res = await response.json();
            fetchData(shift_id);
            setRowSelection({});
        } catch (error) {
            console.log(error);
        }
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        }
    });

    const filterOption = [
        "sid",
        "official_name",
        "gender",
        "designation",
        "posted_at"
    ];

    return (
        <div className="w-auto">
            <div className="flex justify-between items-center py-4">
                <div className="inline-flex gap-x-2">
                    <Input
                        placeholder={`Search by ${path} ${searchByName}`}
                        value={
                            table.getColumn(searchByName)?.getFilterValue() ??
                            ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn(searchByName)
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline">
                                Filter
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {filterOption.map((filterField) => {
                                return (
                                    <DropdownMenuItem
                                        key={filterField}
                                        onClick={() => {
                                            // console.log(filterField);
                                            setSearchByName(filterField);
                                        }}
                                    >
                                        {filterField}
                                    </DropdownMenuItem>
                                );
                            })}
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-x-3">
                    <Button
                        variant="outline"
                        onClick={() => {
                            fetchData(shift_id);
                        }}
                    >
                        <RefreshCcw className="h-6 w-6" />
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            handleDetchClick();
                        }}
                    >
                        Detach Selected
                        <Plus size={20} className="ml-2 h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="ml-2 sky-200"
                        onClick={() => {
                            handleAttachClick();
                        }}
                    >
                        Attach Selected
                        <Plus size={20} className="ml-2 h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                    style={{
                                        // check if id is in assignedPersonnelsId array
                                        background: assignedPersonnelsId[
                                            shift_id
                                        ].includes(row.original._id)
                                            ? "rgb(186 230 253)"
                                            : "inherit" // update the background color here
                                    }}
                                    className={
                                        assignedPersonnelsId[shift_id].includes(
                                            row.original._id
                                        )
                                            ? "border-sky-600"
                                            : ""
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="p-[13px]"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
