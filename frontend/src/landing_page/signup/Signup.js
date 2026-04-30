import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN API
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL || "http://localhost:3002"}/login`,
          {
            email: formData.email,
            password: formData.password,
          },
          { withCredentials: true },
        );

        // Save Token
        localStorage.setItem("token", res.data.token);

        toast.success("Login Successful 🚀");

        // Redirect to Dashboard (port 3001)
        setTimeout(() => {
          window.location.href = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";
        }, 1200);
      } else {
        // SIGNUP API
        await axios.post(`${process.env.REACT_APP_API_URL || "http://localhost:3002"}/signup`, formData, {
          withCredentials: true,
        });

        toast.success("Account Created Successfully 🎉");

        setIsLogin(true);
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          {/* LEFT SIDE */}
          <div className="col-lg-7 d-none d-lg-flex flex-column justify-content-center px-5 bg-light">
            <h1
              className="fw-bold mb-3"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Open a free demat and trading account online
            </h1>

            <p
              className="text-muted"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                maxWidth: "600px",
              }}
            >
              Start investing brokerage free and join millions of investors.
            </p>

            <img
              src="https://zerodha.com/static/images/landing.png"
              alt="Trading Illustration"
              className="img-fluid mt-4"
              style={{ maxWidth: "500px" }}
            />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center px-3 px-md-4 py-5">
            <div
              className="w-100 bg-white p-4 p-md-5 shadow-sm rounded"
              style={{ maxWidth: "420px" }}
            >
              <h3 className="text-center mb-4 fw-semibold">
                {isLogin ? "Login to Continue" : "Create your Account"}
              </h3>

              {/* Toggle Buttons */}
              <div className="d-flex gap-2 mb-4">
                <button
                  type="button"
                  className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} w-50`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>

                <button
                  type="button"
                  className={`btn ${!isLogin ? "btn-primary" : "btn-outline-primary"} w-50`}
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="form-control py-2"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control py-2"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control py-2"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    required
                  />
                </div>

                <button className="btn btn-primary w-100 py-2 fw-semibold">
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
