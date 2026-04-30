import React from "react";

function CreateTicket() {
  return (
    <div className="container mt-5">
      <div className="row g-4">
        {/* LEFT SIDE */}
        <div className="col-12 col-lg-8">
          <div className="border rounded p-3 mb-3">Account Opening</div>
          <div className="border rounded p-3 mb-3">Your Charustock Account</div>
          <div className="border rounded p-3 mb-3">Kite</div>
          <div className="border rounded p-3 mb-3">Funds</div>
          <div className="border rounded p-3 mb-3">Console</div>
          <div className="border rounded p-3 mb-3">Coin</div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-lg-4">
          <div className="border rounded p-3 mb-4 bg-warning-subtle">
            <ul className="mb-0 ps-3">
              <li className="mb-2">
                Surveillance measure on scrips - March 2026
              </li>
              <li>Latest Intraday leverages and Square-off timings</li>
            </ul>
          </div>

          <div className="border rounded overflow-hidden">
            <div className="p-3 border-bottom fw-bold bg-light">
              Quick links
            </div>

            <div className="p-3">1. Track account opening</div>
            <div className="p-3 border-top">2. Track segment activation</div>
            <div className="p-3 border-top">3. Intraday margins</div>
            <div className="p-3 border-top">4. Kite user manual</div>
            <div className="p-3 border-top">
              5. Learn how to create a ticket
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
