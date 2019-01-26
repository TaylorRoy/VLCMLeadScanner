import React from "react";
import "./badge.css";

const Badge = props => (

    <div className="badgeContainer col-md-6">
        
            <h1 className="badgeName text-center"> {props.firstname}  {props.lastname}</h1>
            <h2 className="badgeCompany text-center"> {props.company}</h2>
        <h1>{props.qrValue}</h1>
    </div>
);


export default Badge;