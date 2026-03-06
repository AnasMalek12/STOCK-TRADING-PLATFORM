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
      <div className="row p-5">
        <div className="col-6">
          <img src={imageURL} className="img-fluid" />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesctiption}</p>
          <div>
            <a href={tryDemo} style={{ textDecoration: "none" }}>
              TryDemo <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a
              href={learnMore}
              style={{ marginLeft: "50px", textDecoration: "none" }}
            >
              learnMore{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay}>
              <img src="media\images\googlePlayBadge.svg" alt="googlePlay" />
            </a>
            <a href={appStore}>
              <img
                src="media\images\appstoreBadge.svg"
                style={{ marginLeft: "50px" }}
                alt="appStore"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
