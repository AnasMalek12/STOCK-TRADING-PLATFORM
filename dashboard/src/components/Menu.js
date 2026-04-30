import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL || "http://localhost:3002"}/logout`,
        {},
        { withCredentials: true },
      );
      if (data.success) {
        localStorage.removeItem("token");
        window.location.href = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch logged in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL || "http://localhost:3002"}/`,
          {},
          { withCredentials: true },
        );

        if (data.status) {
          setUsername(data.user);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} alt="logo" />

      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        <hr />

        {/* Profile Section */}
        <div
          className="profile"
          onClick={handleProfileClick}
          style={{ position: "relative" }}
        >
          <div className="avatar">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>

          <p className="username">{username || "Loading..."}</p>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                zIndex: "1000",
                minWidth: "120px",
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "#fdecea",
                  border: "none",
                  borderRadius: "6px",
                  color: "#e74c3c",
                  fontSize: "14px",
                  padding: "10px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#fadbd8")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#fdecea")
                }
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
