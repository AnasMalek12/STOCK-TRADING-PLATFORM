import React from "react";

function RightSection({
  imageURL,
  productName,
  productDesctiption,
  learnMore,
}) {
  return (
    <div className="container mt-5">
      <div className="row py-5 align-items-center">
        {/* Content */}
        <div className="col-12 col-md-6 p-3 p-md-5 order-2 order-md-1">
          <h2 className="fw-semibold mb-3">{productName}</h2>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            {productDesctiption}
          </p>

          <a href={learnMore} style={{ textDecoration: "none" }}>
            Learn More{" "}
            <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </a>
        </div>

        {/* Image */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0 order-1 order-md-2">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
