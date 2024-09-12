
function SearchMetersViewContent({ data }) {
  return (
    <>
      <div className="card-wrapper">
        <div className="card-header"></div>
        <div className="card-body">
          {data.length > 0 ? (
            data.map((v) => <p>{v}</p>)
          ) : (
            <p> No meters found in specified area, meter selection will show meters of the selected dataset.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchMetersViewContent;
