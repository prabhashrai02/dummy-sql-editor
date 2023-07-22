import { memo, useMemo } from "react";
import { useTable, Column, TableInstance } from "react-table";

import styles from "./reactTable.module.css";

const ReactTable = ({ columnsArray, data }: ReactTableProps) => {
  const columns: Column<Data>[] = useMemo(
    () =>
      columnsArray.map((col, idx) => ({
        Header: col,
        accessor: `${idx}`,
      })),
    [columnsArray]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  }: TableInstance<Data> = useTable({ columns, data });

  return (
    <table className={styles.resultTable} {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th{...column.getHeaderProps()}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

type Data = Record<string, any>;

type ReactTableProps = {
  columnsArray: string[];
  data: Data[];
};

export default memo(ReactTable);
