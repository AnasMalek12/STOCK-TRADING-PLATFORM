import React, { useState } from "react";
import axios from "axios";

// Toast Imports
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
          "http://localhost:3002/login",
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
          window.location.href = "http://localhost:3001";
        }, 1200);
      } else {
        // SIGNUP API
        await axios.post(
          "http://localhost:3002/signup",
          formData, // Now contains { username, email, password }
          { withCredentials: true },
        );

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

      <div className="container-fluid vh-100">
        <div className="row h-100">
          {/* LEFT SIDE */}
          <div className="col-md-7 d-none d-md-flex flex-column justify-content-center px-5 bg-light">
            <h1 className="fw-bold mb-3">
              Open a free demat and trading account online
            </h1>
            <p className="text-muted fs-5">
              Start investing brokerage free and join millions of investors.
            </p>
            <img
              src="https://zerodha.com/static/images/landing.png"
              alt="trading"
              className="img-fluid mt-4"
              style={{ maxWidth: "500px" }}
            />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-md-5 d-flex align-items-center justify-content-center">
            <div style={{ width: "380px" }}>
              <h3 className="text-center mb-4">
                {isLogin ? "Login to Continue" : "Create your Account"}
              </h3>

              {/* Toggle Buttons */}
              <div className="d-flex mb-4">
                <button
                  type="button"
                  className={`btn ${isLogin ? "btn-primary" : "btn-outline-primary"} w-50 mx-2`}
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
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username} // FIX: Bind to formData.username
                    onChange={handleChange}
                    required
                  />
                )}

                <input
                  type="email"
                  className="form-control mb-3"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  className="form-control mb-4"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button className="btn btn-primary w-100 py-2">
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
