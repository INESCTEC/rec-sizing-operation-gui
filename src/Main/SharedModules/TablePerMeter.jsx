import TableWrapper from "../../Data/TableWrapper";

export default function TablePerMeter({ data }) {
  const headers = [
    {
      key: "datetime",
      header: "Date Time",
    },
    {
      key: "buy_price",
      header: "buy_price",
    },
    {
      key: "sell_price",
      header: "sell_price",
    },
    {
      key: "shadow_price",
      header: "shadow_price",
    },
    {
      key: "supplied",
      header: "supplied",
    },
    {
      key: "surplus",
      header: "surplus",
    },
    {
      key: "load",
      header: "load",
    },
    {
      key: "battery",
      header: "battery",
    },
    {
      key: "PV",
      header: "PV",
    },
    {
      key: "net_load",
      header: "net_load",
    },
    {
      key: "sold_position",
      header: "sold_position",
    },
  ];

  const items = [];

  for (let [obj, value] of Object.entries(data)) {
    items.push(value);
  }

  return (
    <>
      <TableWrapper
        title={"Table View"}
        headers={headers}
        items={items}
      ></TableWrapper>
    </>
  );
}
