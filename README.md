# 📈 Charustock
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

> **A Full-Stack Simulated Stock Trading & Portfolio Management Platform**

Charustock is a comprehensive web application designed to simulate the fast-paced environment of stock trading. It provides users with a secure platform to manage investments, track real-time simulated market movements, and visualize portfolio performance—all without relying on external financial APIs.

## ✨ Key Features

* **Real-Time Market Simulation:** Utilizes **Socket.io** to push live, simulated stock price updates continuously to the client, creating a dynamic trading environment.
* **Secure User Authentication:** Implements robust login and registration flows protected by **JSON Web Tokens (JWT)** for secure user sessions.
* **Interactive Data Visualization:** Integrates **Chart.js** to provide beautiful, responsive charts for analyzing Wishlist trends and Holdings performance.
* **Portfolio Management:** Users can easily add stocks to their personal Wishlist or track their active investments in the centralized Holdings dashboard.
* **Clean & Responsive UI:** Designed with **Bootstrap** for a professional, crisp, and mobile-friendly layout, utilizing **FontAwesome** for intuitive iconography.

## 📸 Application Screenshots

| Landing Page | Login / Signup Page |
| :---: | :---: |
| ![Landing Page](https://res.cloudinary.com/dmvzrbyq1/image/upload/v1777728938/Landing_Page_nwwxyr.webp) | ![Login Signup](https://res.cloudinary.com/dmvzrbyq1/image/upload/v1777729005/Login_m4jm7i.webp) |
| **Welcome screen and platform introduction** | **Secure JWT protected authentication** |

| User Dashboard | About Page |
| :---: | :---: |
| ![Dashboard](https://res.cloudinary.com/dmvzrbyq1/image/upload/v1777729027/Dashboard_lj9kpt.webp) | ![About Page](https://res.cloudinary.com/dmvzrbyq1/image/upload/v1777729047/About_zq8puh.webp) |
| **Active holdings, wishlists, and real-time Chart.js data** | **Author details and project information** |

## 🛠️ Tech Stack

**Frontend & Dashboard**
* React.js
* Bootstrap 
* Chart.js (Data Visualization)
* FontAwesome (Icons)

**Backend**
* Node.js & Express.js
* Socket.io (Real-time bid/ask simulation)
* JSON Web Tokens (JWT Authentication)

**Database**
* MongoDB Atlas

## 📁 Folder Structure

The project is divided into three main directories to separate concerns cleanly:

```text
STOCK-TRADING-PLATFORM/
├── backend/       # Node.js/Express server, Socket.io logic, Auth routes, and DB models
├── frontend/      # Landing page for the application (React)
└── dashboard/     # User dashboard for managing holdings and wishlists (React)
```

## 👨‍💻 Author

**Anas Malek**

* GitHub: [@AnasMalek12](https://github.com/AnasMalek12/)
* LinkedIn: [@AnasMalek12](https://www.linkedin.com/in/Anasmalek12)

---
*If you find this project interesting or helpful, please consider giving it a ⭐ on GitHub!*
