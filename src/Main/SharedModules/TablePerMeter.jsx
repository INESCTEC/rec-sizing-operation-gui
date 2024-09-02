import TableWrapper from "../../Data/TableWrapper";

export default function TablePerMeter({ data }) {
  const headers = [
    {
      key: "datetime",
      header: "Date Time",
    },
    {
      key: "fill6",
      header: "",
    },
    {
      key: "buy_price",
      header: "Buy Price (€/kWh)",
    },
    {
      key: "sell_price",
      header: "Sell Price (€/kWh)",
    },
    {
      key: "shadow_price",
      header: "Transactions Price (€/kWh)",
    },
    {
      key: "fill5",
      header: "",
    },
    {
      key: "load",
      header: "Load (kWh)",
    },
    {
      key: "battery",
      header: "Battery (kWh)",
    },
    {
      key: "PV",
      header: "Generation (kWh)",
    },

    {
      key: "fill3",
      header: "",
    },
    {
      key: "supplied",
      header: "Supplied (kWh)",
    },
    {
      key: "surplus",
      header: "Surplus (kWh)",
    },
    {
      key: "sold_position",
      header: "Sold Position (kWh)",
    },

    
    {
      key: "net_load",
      header: "Net Load (kWh)",
    },
  ];

  const items = [];

  for (let [obj, value] of Object.entries(data)) {
    items.push({ ...value, id: value.meter_id + obj });
  }

  console.log(items);

  const description = (
    <div style={{color: "GrayText"}}>
      <p style={{fontSize: "0.9rem", fontWeight: "bold"}}>Net Load Equations</p>
      <p style={{fontSize: "0.9rem"}}>Net Load = Supplied - Surplus - Sold Position</p>
      <p style={{fontSize: "0.9rem"}}>Net Load = Load - Generation + Battery</p>
    </div>
  );

  return (
    <>
      <TableWrapper
        title={"Table View"}
        headers={headers}
        items={items}
        description={description}
      ></TableWrapper>
    </>
  );
}
