import styles from "../../InterfaceContent.module.css";
import OfferTable from "./OfferTable";
import LEMChart from "../LEMChart";
import DownloadCSV from "../../../Data/DownloadCSV";

function VanillaViewContent({ data }) {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <LEMChart lem_prices={data.lem_prices} />
        </div>
      </div>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          <OfferTable offers={data.offers} />
        </div>
      </div>
      <DownloadCSV data={data.lem_prices} fileName={"lem_prices"} />
    </>
  );
}

export default VanillaViewContent;
