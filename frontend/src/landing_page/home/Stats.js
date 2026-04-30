import React from "react";

function Stats() {
  return (
    <div className="container px-3 px-md-5 py-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <h1 className="fs-4 fs-md-2 mb-4">Trust with confidence</h1>

          <h2 className="fs-5">Customer-first always</h2>
          <p className="text-muted">
            That's why 1.6+ crore customers trust Charustock with ~ ₹6 lakh
            crores of equity investments, making us India’s largest broker;
            contributing to 15% of daily retail exchange volumes in India.
          </p>

          <h2 className="fs-5">No spam or gimmicks</h2>
          <p className="text-muted">
            No gimmicks, spam, "gamification", or annoying push notifications.
            High quality apps that you use at your pace, the way you like.
          </p>

          <h2 className="fs-5">The Charustock universe</h2>
          <p className="text-muted">
            Not just an app, but a whole ecosystem. Our investments in 30+
            fintech startups offer you tailored services.
          </p>

          <h2 className="fs-5">Do better with money</h2>
          <p className="text-muted">
            With initiatives like Nudge and Kill Switch, we help you do better
            with your money.
          </p>
        </div>

        <div className="col-12 col-md-6 text-center">
          <img
            src="media/images/ecosystem.png"
            alt="Ecosystem"
            className="img-fluid mb-4"
            style={{ maxWidth: "90%" }}
          />

          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
            <a href="#" className="text-decoration-none">
              Explore our products <i className="fa fa-long-arrow-right"></i>
            </a>

            <a href="#" className="text-decoration-none">
              Try Kite demo <i className="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 text-center">
          <img
            src="media/images/pressLogos.png"
            alt="Press Logos"
            className="img-fluid"
            style={{ maxWidth: "60%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Stats;
