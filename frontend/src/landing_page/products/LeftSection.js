import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesctiption,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5">
      <div className="row py-5 align-items-center">
        {/* Image */}
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxWidth: "90%" }}
          />
        </div>

        {/* Content */}
        <div className="col-12 col-md-6 p-3 p-md-5">
          <h2 className="fw-semibold mb-3">{productName}</h2>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            {productDesctiption}
          </p>

          {/* Links */}
          <div className="d-flex flex-column flex-md-row gap-3 mt-3">
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              Try Demo{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>

            <a href={learnMore} style={{ textDecoration: "none" }}>
              Learn More{" "}
              <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
            </a>
          </div>

          {/* Store buttons */}
          <div className="d-flex flex-column flex-md-row gap-3 mt-4">
            <a href={googlePlay}>
              <img
                src="media/images/googlePlayBadge.svg"
                alt="Google Play"
                className="img-fluid"
                style={{ maxWidth: "160px" }}
              />
            </a>
            <a href={appStore}>
              <img
                src="media/images/appstoreBadge.svg"
                alt="App Store"
                className="img-fluid"
                style={{ maxWidth: "160px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
