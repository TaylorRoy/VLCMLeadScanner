import React from "react";
import "./badge.css";

const Badge = props => (
    <div class="badgeContainer col-md-6">
        <p class="badgeHeader">IT EXCHANGE</p>
            <h1> {props.firstname}  {props.lastname}</h1>
            <h2> {props.company}</h2>
        <h1>{props.qrValue}</h1>
    </div>
);

export default Badge;