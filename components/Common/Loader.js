import React from "react";

function Loader() {
  return (
    <div className="loader-wrap d-flex justify-content-center center-loader">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
