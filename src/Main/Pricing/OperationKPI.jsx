import TableWrapper from "../../Data/TableWrapper";
import styles from "./OperationKPI.module.css";

function OperationKPI({ meter_id, data }) {
  const items = [{"total_rec_cost": data.total_rec_cost, "individual_cost": 
  data.individual_costs.filter((obj) => obj.meter_id === meter_id)[0].individual_cost, "id": meter_id}]
  const headers = [
    {
      key: "total_rec_cost",
      header: "Total Operation Cost",
    },
    {
      key: "individual_cost",
      header: "Individual Operation Cost",
    },
  ];


  return (
    <>
      <div className={styles.tableContainer}>
        <TableWrapper
          title={"Operation Costs"}
          headers={headers}
          items={items}
        ></TableWrapper>
      </div>
    </>
  );
}

export default OperationKPI;
