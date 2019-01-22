import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Consumer from "../../GlobalState"
import API from "../../utils/API";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends React.Component {

			<nav className="navbar navbar-expand-lg bg-dark justify-content-center">
				{<h1>{global.state.vendor}</h1>}
			
				{<p className="logout"><i class="fas fa-sign-out-alt"></i></p>}
				{/* <Link className="navbar-brand" to="/">
      Valcom Logo
    </Link> */}
				{/* <div>
      <ul className="navbar-nav">
			<li className="nav-item">
			<Link
			to="/"
			className={
				window.location.pathname === "/" || window.location.pathname === "/about"
				? "nav-link active"
				: "nav-link"
            }
          >
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/profile"
            className={
              window.location.pathname === "/profile"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/admin"
            className={
              window.location.pathname === "/admin"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Admin
            </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sameday"
            className={
              window.location.pathname === "/sameday"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Same Day
          </Link>
        </li>
      </ul>
    </div> */}
			</nav>
		)}
	</Consumer>
);

					<nav className="navbar navbar-expand-lg bg-dark justify-content-center">
						{<h1>{global.state.vendor}</h1>}

						{<p className="logout" onClick={this.signOut}><i class="fas fa-sign-out-alt"></i></p>}

					</nav>
				)}
			</Consumer>
		);

	}
}
export default props => (
	<Consumer>
		{(global) => {
			return <Navbar {...props} global={global} />
		}}
	</Consumer>
)
