
import React, { useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { updateUser } from "../../store/store"; // Ensure correct path

const Table = ({ data }) => {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "key",
        header: "Key",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "value",
        header: "Value",
        cell: (info) => (
          <input
          className="outline-none"
            type="text"
            value={info.row.original.value}
            onChange={(e) => {
              const updatedValue = {};
              updatedValue[info.row.original.key] = e.target.value;
              updateUser(updatedValue);
            }}
          />
        ),
      },
    ],
    []
  );

  // Transform user data into an array of key-value pairs for the table
  const tableData = useMemo(() => {
    return data.flatMap((user) =>
      Object.entries(user).map(([key, value]) => ({
        key,
        value: value?.toString() || "", // Convert all values to string
      }))
    );
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-[1000px] divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
