import TableWrapper from "../../Data/TableWrapper";

export default function TablePerMeter({ data }) {
  const headers = [];

  let header_keys = Object.keys(Object.entries(data)[0][1]);

  if (header_keys.includes("time")) {
    headers.push({
      key: "time",
      header: "Time",
    });
  }
  headers.push({
    key: "fill6",
    header: "",
  });
  if (header_keys.includes("buy_price")) {
    headers.push({
      key: "buy_price",
      header: "Buy Price (€/kWh)",
    });
  }
  if (header_keys.includes("sell_price")) {
    headers.push({
      key: "sell_price",
      header: "Sell Price (€/kWh)",
    });
  }

  if (header_keys.includes("transactions_price")) {
    headers.push({
      key: "transactions_price",
      header: "Transactions Price (€/kWh)",
    });
  }
  headers.push({
    key: "fill5",
    header: "",
  });

  if (header_keys.includes("load")) {
    headers.push({
      key: "load",
      header: "Load (kWh)",
    });
  }

  if (header_keys.includes("battery")) {
    headers.push({
      key: "battery",
      header: "Battery (kWh)",
    });
  }

  if (header_keys.includes("PV")) {
    headers.push({
      key: "PV",
      header: "Generation (kWh)",
    });
  }

  headers.push({
    key: "fill3",
    header: "",
  });

  if (header_keys.includes("supplied")) {
    headers.push({
      key: "supplied",
      header: "Supplied (kWh)",
    });
  }

  if (header_keys.includes("surplus")) {
    headers.push({
      key: "surplus",
      header: "Surplus (kWh)",
    });
  }

  if (header_keys.includes("sold_position")) {
    headers.push({
      key: "sold_position",
      header: "Sold Position (kWh)",
    });
  }

  if (header_keys.includes("net_load")) {
    headers.push({
      key: "net_load",
      header: "Net Load (kWh)",
    });
  }

  const items = [];

  for (let [obj, value] of Object.entries(data)) {
    items.push({ ...value, id: value.meter_id + obj });
  }


  const description = (
    <div style={{ color: "GrayText" }}>
      <p style={{ fontSize: "0.9rem", fontWeight: "bold" }}>
        Net Load Equations
      </p>
      <p style={{ fontSize: "0.9rem" }}>
        Net Load = Supplied - Surplus - Sold Position
      </p>
      <p style={{ fontSize: "0.9rem" }}>
        Net Load = Load - Generation + Battery
      </p>
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
