import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row py-3 mt-5 border-top">
        <h1 className="text-center mt-5">People</h1>
      </div>

      <div
        className="row py-3 text-muted align-items-center"
        style={{ lineHeight: "1.8", fontSize: "1.05rem" }}
      >
        <div className="col-12 col-md-6 p-3 p-md-5 text-center">
          <img
            src="media/images/AnasMalek.jpg"
            alt="Anas Malek"
            className="img-fluid"
            style={{
              borderRadius: "50%",
              width: "250px",
              height: "250px",
              objectFit: "cover",
            }}
          />
          <h4 className="mt-4 mb-1">Anas Malek</h4>
          <h6 className="text-secondary">Developer, Student</h6>
        </div>

        <div className="col-12 col-md-6 p-3 p-md-5">
          <p>
            Anas Malek is currently pursuing a Master of Science in Information
            Technology (M.Sc. IT) from Charotar University of Science and
            Technology (CHARUSAT). He has a strong interest in technology and
            software development.
          </p>
          <p>
            He is particularly interested in full-stack web development and
            works with technologies such as HTML, CSS, JavaScript, React, and
            Node.js to build modern web applications.
          </p>
          <p>
            Anas is currently working on a Full Stack Stock Management Platform
            (Zerodha Clone) to enhance his practical knowledge and development
            skills. He aims to become a skilled software developer in the
            future.
          </p>
          <p>
            Connect on{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a
              href="https://anasmalek12.netlify.app/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Portfolio
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/AnasMalek12/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
