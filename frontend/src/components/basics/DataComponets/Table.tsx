import React from "react";

type Row = Record<string, unknown>;
type RenderFn<T extends Row> = (row: T) => React.ReactNode;

interface Column<T extends Row> {
  header: string;
  accessor: keyof T;
  render?: RenderFn<T>;
}

interface TableProps<T extends Row> extends React.TableHTMLAttributes<HTMLTableElement> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  emptyText?: string;
}

function Table<T extends Row>({
  data,
  columns,
  onRowClick,
  emptyText = "No data",
  ...props
}: TableProps<T>) {
  return (
    <table className="min-w-full divide-y divide-gray-200" {...props}>
      <thead className="bg-gray-50">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.accessor)}
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.length === 0 ? (
          <tr>
            <td className="px-6 py-4 text-sm text-gray-500" colSpan={columns.length}>
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row as T)}
              className={onRowClick ? "cursor-pointer" : undefined}
            >
              {columns.map((col) => (
                <td
                  key={String(col.accessor)}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {col.render ? col.render(row as T) : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;
