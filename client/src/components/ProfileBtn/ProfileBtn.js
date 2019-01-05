import React from "react";
import "./ProfileBtn.css";

const ProfileBtn = props => (
<button
onClick={props.onClick}
className={`ProfileBtn`}
{...props}
/>
);

export default ProfileBtn;
