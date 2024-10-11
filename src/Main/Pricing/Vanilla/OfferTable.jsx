import TableWrapper from "../../../Data/TableWrapper";
import styles from "./OfferTable.module.css";

function OfferTable({ offers }) {
  const headers = [
    {
      key: "datetime",
      header: "Date",
    },
    {
      key: "meter_id",
      header: "Meter",
    },
    {
      key: "type",
      header: "Type",
    },
    {
      key: "amount",
      header: "Amount (kWh)",
    },
    {
      key: "value",
      header: "Price (€/kWh)",
    },
  ];

  const items = offers.map((offer) => ({
    id: offer.meter_id + offer.datetime,
    datetime: new Date(offer.datetime).toLocaleTimeString([], {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    meter_id: offer.meter_id,
    type: offer.type.toUpperCase(),
    amount: offer.amount,
    value: offer.value,
  }));


  //console.logitems);
  return (
    <>
      <div className={styles.tableContainer}>
        <TableWrapper
          title={"Offers"}
          headers={headers}
          items={items}
        ></TableWrapper>
      </div>
    </>
  );
}

export default OfferTable;
