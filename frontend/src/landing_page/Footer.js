import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "rgb(250,250,250)" }}>
      <div className="container border-top mt-5 pt-5">
        <div className="row gy-4">
          {/* LOGO */}
          <div className="col-12 col-md-6 col-lg-3">
            <img
              className="mb-3"
              src="media/images/logo.svg"
              style={{ width: "150px" }}
              alt="Logo"
            />
            <p className="text-muted small">
              &copy; 2010 - 2026, Charustock Broking Ltd. All rights reserved.
            </p>
          </div>

          {/* ACCOUNT */}
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-semibold">Account</p>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Open demat account
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Minor account
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              NRI account
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Commodity
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Fund transfer
            </a>
          </div>

          {/* SUPPORT */}
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-semibold">Support</p>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Contact us
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Support portal
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Complaints
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Downloads
            </a>
          </div>

          {/* COMPANY */}
          <div className="col-6 col-md-6 col-lg-2">
            <p className="fw-semibold">Company</p>
            <a href="/" className="d-block mb-2 text-decoration-none">
              About
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Careers
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Press
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Charustock.tech
            </a>
          </div>

          {/* QUICK LINKS */}
          <div className="col-6 col-md-6 col-lg-3">
            <p className="fw-semibold">Quick links</p>
            <a href="/" className="d-block mb-2 text-decoration-none">
              IPO
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Brokerage
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Market holidays
            </a>
            <a href="/" className="d-block mb-2 text-decoration-none">
              Calculators
            </a>
          </div>
        </div>

        {/* BOTTOM TEXT */}
        <div
          className="mt-5 text-muted"
          style={{ fontSize: "13px", lineHeight: "1.7" }}
        >
          <p>
            Charustock Broking Ltd.: Member of NSE, BSE, MCX & MSEI – SEBI
            Registration no.: INZ000031633. CDSL/NSDL: Depository services
            through Charustock Broking Ltd. – SEBI Registration no.:
            IN-DP-431-2019. Registered Address: Charustock Broking Ltd.,
            #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India/
          </p>

          <p>
            For any complaints pertaining to securities broking please write to
            complaints@Charustock.com, for DP related to dp@Charustock.com.
            Please ensure you carefully read the Risk Disclosure Document as
            prescribed by SEBI | ICF.
          </p>
          <p>
            Procedure to file a complaint on SEBI SCORES: Register on SCORES
            portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective
            communication and speedy redressal of grievances.
          </p>
          <p>
            Investments in securities market are subject to market risks; read
            all the related documents carefully before investing.
          </p>
          <p>
            Prevent unauthorised transactions in your account. Update your
            mobile numbers/email IDs with your stock brokers. Receive
            information of your transactions directly from Exchange on your
            mobile/email at the end of the day.
          </p>

          <p>
            KYC is a one-time exercise while dealing in securities markets -
            once KYC is done through a SEBI registered intermediary, you need
            not undergo the same process again.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
