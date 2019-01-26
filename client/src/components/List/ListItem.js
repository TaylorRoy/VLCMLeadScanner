import React from "react";

export const ListItem = props => (
  <li className="list-group-item" id={props.id} style={{position: "relative"}}>
    {props.children}
  </li>
);