import React, { Component } from "react";
import API from "../utils/API";
import Navbar from "../components/Navbar"; 


class Admin extends Component {
  render() {
		return (
			<div>
				<Navbar>
					<h1>Admin</h1>
					</Navbar> 
					 <div className="row justify-content-center text-center">
				<button className="btn btn-lg sameDayBtn col-md-3">SAMEDAY</button>
				<button className="btn btn-lg bulkBadgeBtn col-md-3">BADGES</button>
				<br></br>
				</div>
				<div className="row justify-content-center text-center col-md-6 viewLeads">
				<button className="btn-block btn-lg btn viewAllLeads">VIEW ALL LEADS</button>
				</div>
			</div>

		
			
		)
	}
}

export default Admin;
