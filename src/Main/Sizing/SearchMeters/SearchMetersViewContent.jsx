import styles from "../../InterfaceContent.module.css";

function SearchMetersViewContent({ data }) {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          {data.length > 0 ? (
            data.map((v) => <p>v</p>)
          ) : (
            <p>No meters in area.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchMetersViewContent;
