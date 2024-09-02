import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Popover,
  PopoverContent
} from "@carbon/react";

import { InformationFilled } from "@carbon/icons-react";
import React from "react";

import styles from "./TableWrapper.module.css";

function TableWrapper({ title, items, headers, description }) {
  return (
    <>
      <div className={styles.tableWrapper}>
        <div className="row flex-center"><p className={styles.tableTitle} style={{paddingRight: "5px", paddingBottom: "2px"}}>{title}</p>
        {description ? (
          <>
            <PopOver description={description}/>
          </>
        ) : undefined}
        </div>
        
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

function PopOver({description}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} autoAlign={true}>
      <span
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}>
        <InformationFilled/>
      </span>
      <PopoverContent className="padding-1-rem">
        {description}
      </PopoverContent>
    </Popover>
  );
}