import TableWrapper from "../../Data/TableWrapper";

function SizingResultsTable({data}) {
  let headers = [
    {
      key: "contracted_power",
      header: "Contracted Power (kW)",
    },
    {
      key: "installed_pv",
      header: "Installed PV Power (kW)",
    },
    {
      key: "installed_storage",
      header: "Installed Storage Capacity (khW)",
    },
    {
      key: "total_pv",
      header: "Total PV (kW)",
    },
    {
      key: "total_storage",
      header: "Total Storage (kWh)",
    },
  ];

  const items = [];

  for (let [obj, value] of Object.entries(data)) {
    items.push({ ...value, id: value.meter_id + obj });
  }

  return (
    <>
      <TableWrapper
        title={"Sizing Results"}
        headers={headers}
        items={items}
      ></TableWrapper>
    </>
  );
}

export default SizingResultsTable;
