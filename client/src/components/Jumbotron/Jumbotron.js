import React from "react";

const Jumbotron = ({ children }) => (
  <div
    style={{ margin: "10%",align: "center",height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
    className="jumbotron"
  >
    {children}
  </div>
);

export default Jumbotron;
