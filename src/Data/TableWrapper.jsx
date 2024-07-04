import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

import styles from "./TableWrapper.module.css";

function TableWrapper({ title, items, headers }) {
  return (
    <>
      <div className={styles.tableWrapper}>
        <p className={styles.tableTitle}>{title}</p>
        <DataTable headers={headers} rows={items}>
          {({ rows, headers, getTableProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader key={header.key} header={header.header}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      </div>
    </>
  );
}

export default TableWrapper;
