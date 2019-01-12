import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = ({ children }) => (
	<nav className="navbar navbar-expand-lg bg-dark justify-content-center text-center">
		{children}
		{<p className="logout"><i class="fas fa-sign-out-alt"></i></p>}

	</nav>
);

export default Navbar;
