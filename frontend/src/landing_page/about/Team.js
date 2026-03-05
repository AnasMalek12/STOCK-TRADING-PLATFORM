import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-3 mt-5 border-top">
        <h1 className="text-center mt-5">People</h1>
      </div>

      <div
        className="row p-3 text-muted fs-6"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="media\images\AnasMalek.jpg"
            style={{ borderRadius: "100%", width: "60%" }}
          />
          <h4 className="mt-5">Anas Malek</h4>
          <h6>Developer, Student</h6>
        </div>
        <div className="col-6 p-5">
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
            <a href="" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a
              href="https://anasmalek12.netlify.app/"
              style={{ textDecoration: "none" }}
            >
              Portfolio
            </a>{" "}
            /{" "}
            <a
              href="https://github.com/AnasMalek12/"
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
