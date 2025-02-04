import { Loading } from "@carbon/react";

function WaitingPage() {
  return (
    <>
      <div style={{display: "flex", alignItems: "center", flexDirection:"column", height:"350px", justifyContent:"center"}}>
        <Loading withOverlay={false} />
        <p style={{paddingTop: "20px"}}>
          {" "}
          Your request is being processed. Results will be available soon.{" "}
        </p>
      </div>
    </>
  );
}

export default WaitingPage;
