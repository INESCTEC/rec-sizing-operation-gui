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
      header: "Amount (KWH)",
    },
    {
      key: "value",
      header: "Price (€/KWH)",
    },
  ];

  const items = offers.map((offer) => ({
    id: offer.meter_id + offer.datetime,
    datetime: new Date(offer.datetime).toUTCString(),
    meter_id: offer.meter_id,
    type: offer.type.toUpperCase(),
    amount: offer.amount,
    value: offer.value,
  }));

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
