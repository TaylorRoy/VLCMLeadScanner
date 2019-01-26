import React, { Component } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { List } from "../components/List";
import { ListItem } from "../components/List";
import { Link } from 'react-router-dom'

import QrReader from "react-qr-reader";
import Consumer from './../GlobalState'

class Profile extends Component {

	// Setting our component's initial state
	state = {
		image: "",
		match: false,
		matchCount: 0,
		leads: [],
		firstname: "",
		lastname: "",
		company: "",
		position: "",
		email: "",
		phone: "",
		result: "",
	};
	count = 0;

	// QR code stuff
	constructor(props) {
		super(props);
		this.state = {
			delay: 2000
			// result: "No result"
		};
		this.handleScan = this.handleScan.bind(this);
	}

	handleScan(data) {
		if (data) {

			let whatIread = data;
			console.log("The QR code says: " + whatIread)


			var newObject = JSON.parse(whatIread);
			console.log(newObject);
			console.log("new Data is a: " + newObject);
			console.log(newObject.firstname);
			this.state.firstname = newObject.firstname;
			this.state.lastname = newObject.lastname;
			this.state.company = newObject.company;
			this.state.position = newObject.position;
			this.state.email = newObject.email;
			this.state.phone = newObject.phone;

					// add vibration
					window.navigator.vibrate(200); 

		
					if (window.navigator.vibrate(200)) {
						console.log("success in vibration")
					} else {
						console.log("this did not vibrate");
					}


			this.handleFormSubmit();

			return;

		}

	}
	handleError(err) {
		console.error(err);
	}
	// END OF QR CODE STUFF


	// Whens the component mounts, load all leads and save them to this.state.leads
	componentDidMount() {
		this.loadLeads();
	}

	// Loads all leads and sets them to this.state.leads
	loadLeads = (res) => {
		API.getLeads(res)
			.then(res => this.setState({
				leads: res.data,
				firstname: "",
				lastname: "",
				company: "",
				position: "",
				email: "",
				phone: "",
				qrValue: ""
			})
			)
			.catch(err => console.log(err));
		console.log("leads", this.state.leads);
	};


	//function used to create vlcmReport.csv file of all leads in database
	readFile = (res) => {
		API.getLeads(res)
			.then(res => this.setState({ leads: res.data, firstname: "", lastname: "", company: "", position: "", email: "", phone: "" })
			)
			.catch(err => console.log(err));
		console.log("leads", this.state.leads);

		//create empty array to push json into later
		var csvRow = [];

		//save this.state.leads into another variable
		var jsonLeads = this.state.leads;
		console.log("jsonLeads", jsonLeads);

		//create an array with an array of header strings which we will push json into
		var jsonArray = [["_id", "firstname", "lastname", "company", "position", "email", "phone", "date"]];

		//loop through jsonLeads and push into jsonArray
		for (var i = 0; i < jsonLeads.length; i++) {
			jsonArray.push([jsonLeads[i]._id, jsonLeads[i].firstname, jsonLeads[i].lastname, jsonLeads[i].company, jsonLeads[i].position, jsonLeads[i].email, jsonLeads[i].phone, jsonLeads[i].date]);
		}
		console.log("jsonArray befor join", jsonArray);

		//loop through jsonArray and join data inside of array into string based on commas
		for (var j = 0; j < jsonArray.length; j++) {
			csvRow.push(jsonArray[j].join(","))
		}
		console.log("csvRow after join", csvRow);
		//add %0A where there is a space to indicate where csv file should start a new line
		var csvString = csvRow.join("%0A");
		console.log("csvString", csvString);

		//output csv file
		var a = document.createElement("a");
		a.href = 'data:attachment/csv,' + csvString;
		a.target = "_Blank";
		a.download = "vlcmReport.csv";
		document.body.appendChild(a);
		a.click();
	};

	// Deletes a book from the database with a given id, then reloads books from the db
	// deleteBook = id => {
	//   API.deleteBook(id)
	//     .then(res => this.loadBooks())
	//     .catch(err => console.log(err));
	// };

	// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	// When the form is submitted, use the API.saveLead method to save the lead data
	// Then reload lead from the database with loadLeads()
	handleFormSubmit = event => {

		API.saveLead({
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			company: this.state.company,
			position: this.state.position,
			email: this.state.email,
			phone: this.state.phone
		})
			.then(() => this.loadLeads())
			.catch(err => console.log(err));
	};

	goToManualLeads = (event) => {
		console.log("Redirect to Manual Lead page")
		event.preventDefault()

		this.props.global.setPage("/ManualLead")
	}

	deleteLead = id => {
		API.deleteLead(id)
			.then(res => this.loadLeads())
			.catch(err => console.log(err));
	};

	closeDeleteView = i => {
		let leads = this.state.leads
		leads[i].deleteView = false
		this.setState({ leads })
	}

	openDeleteView = i => {
		let leads = this.state.leads
		leads[i].deleteView = true
		this.setState({ leads })
	}


	render() {
		return (
			<div>


				<br></br>
				<div class="qrReader">
					<QrReader
						delay={this.state.delay}
						onError={this.handleError}
						onScan={this.handleScan}
						style={{ width: "320px", margin: "0 auto" }}
					/>
					<p>{this.state.result}</p>
				</div>

				{/* buttons */}
				<div className="row justify-content-center text-center">
					<div className="addLeadBtns col-md-11 ">
						<div className="btnDiv">
							<Link to="/ManualLead"><button className="manualEnterBtn btn btn-lg  text-center">Manually Enter Lead</button>
							</Link>
						</div>

					</div>
				</div>
				<br></br>

				<div className="col-md-5 scannedList">
					<br></br>
					{this.state.leads ? (
						<List>
							<button onClick={this.readFile} className="btn btn-link justify-content-left export">Export as a .csv</button>
							{this.state.leads.map((lead, i) => (
								<ListItem key={lead._id}>
									{ lead.deleteView && 
										<div style={{ position: "absolute", height: "100% !important", width: "100%", backgroundColor: "black", padding: "5px"  }}>
										<div style={{padding: "10px"}}>
										
											<span style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>Delete?</span>
										
											<button className="btn btn-sm yesDeleteBtn" style={{ width: "20%", margin: "10px" }} onClick={() => this.deleteLead(lead._id)} >Yes</button>
											

											<button onClick={() => this.closeDeleteView(i)} className="btn btn-sm" style={{ width: "20%", margin: "10px" }}>No</button>
											</div>
										</div>
									}

									<a href={"/scans/" + lead._id}>
										<strong>
											{lead.firstname} {' '}

											{lead.lastname}
										</strong>
										<br></br>
										<span className="leadPosition">{lead.position}</span>
										<br></br>
										<span className="leadPosition">{lead.company}</span>
									</a>
									<DeleteBtn onClick={() => this.openDeleteView(i)} />
								</ListItem>
							))}
						</List>
					) : (
							<h3>No Results to Display</h3>
						)}
				</div>
			</div>
		);
	}
}

export default props => (
	<Consumer>
		{(global) => {
			return <Profile {...props} global={global} />
		}}
	</Consumer>
)
