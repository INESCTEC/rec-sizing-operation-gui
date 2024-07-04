import styles from "../../InterfaceContent.module.css";

function SearchMetersViewContent({ data }) {
  return (
    <>
      <div className="card-wrapper">
        {data.length > 0 ? (
          data.map((v) => <p>v</p>)
        ) : (
          <p>No meters in area.</p>
        )}
      </div>
    </>
  );
}

export default SearchMetersViewContent;
