import React from "react";
import "./badge.css";

const Badge = props => (

    <div className="badgeContainer col-md-6">
        <img style={{width:"100%", height: "auto"}} src="https://files.slack.com/files-pri/TBLFR8X19-FFKN28WC9/screen_shot_2019-01-22_at_2.31.13_pm.png"/>
            <h1> {props.firstname}  {props.lastname}</h1>
            <h2> {props.company}</h2>
        <h1>{props.qrValue}</h1>
    </div>
);


export default Badge;