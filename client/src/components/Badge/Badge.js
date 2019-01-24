import React from "react";
import "./badge.css";

const Badge = props => (
<div class="badgeContainer col-md-6 text-center"> 
    <h1 class="badgeName"> {props.firstname}  {props.lastname}</h1>
    <h2 class="badgeCompany"> {props.company}</h2>
    <h1>{props.qrValue}</h1>
</div>
); 

export default Badge;