import React from "react";

function RightSection({
  imageURL,
  productName,
  productDesctiption,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row p-5">
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesctiption}</p>
          <a href={learnMore} style={{ textDecoration: "none" }}>
            learnMore <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
        <div className="col-6">
          <img src={imageURL} />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
