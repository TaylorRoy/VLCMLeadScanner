import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../utils/API";
import canvg from 'canvg';
//import DeleteBtn from "../components/DeleteBtn";
import Badge from "../components/Badge";
import { List } from "../components/List";
import { ListItem } from "../components/List";
import { QRCode } from 'react-qr-svg';



class Sameday extends Component {
	// Setting our component's initial state
	state = {
		registered: [],
		firstname: "",
		lastname: "",
		company: "",
		position: "",
		email: "",
		phone: "",
		qrValue: ""
	};
	count = 0;

	// Whens the component mounts, load all leads and save them to this.state.leads
	componentDidMount() {
		this.loadLeads();
	}

	// Loads all leads  and sets them to this.state.leads
	loadLeads = (res) => {

		API.getLeads(res)
			.then(res => {
				console.log('HELLO', res);
				this.setState({ leads: res.data, firstname: "", lastname: "", company: "", position: "", email: "", phone: "", qrValue: "" })
			})
			.catch(err => console.log(err));
		console.log("leads", this.state.leads);
	};

	// Deletes a book from the database with a given id, then reloads books from the db
	//   deleteBook = id => {
	//     API.deleteBook(id)
	//       .then(res => this.loadBooks())
	//       .catch(err => console.log(err));
	//   };

	// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	// When the form is submitted, use the API.saveLead method to save the lead data
	// Then reload leads from the database
	handleFormSubmit = event => {
		event.preventDefault();
		API.saveAttendee({
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			company: this.state.company,
			position: this.state.position,
			email: this.state.email,
			phone: this.state.phone
		})
			.then((res) => {
				console.log(res)
				this.loadLeads()
			})
			.catch(err => console.log(err));
	};

	//create PDF of just QR badge section of the Sameday page
	getPDF = () => {
		var doc = new jsPDF();
		var timesToRun = 1;
		for (var i = 0; i < timesToRun; i++) {
			makePdfPage(i)
			function makePdfPage(i) {
				html2canvas(document.querySelectorAll(".badgeContainer")[i]).then(canvas => {
					var image = canvas.toDataURL("image/png");
					doc.addImage(image, "JPEG", 20, 20);
					var svg = document.querySelectorAll(".badgeContainer")[i].children[1].children[0].outerHTML;
					var canvas2 = document.createElement('canvas');
					canvg(canvas2, svg);
					var imgData = canvas2.toDataURL('image/png');
					doc.addImage(imgData, 'PNG', 10, 80, 180, 100);
					if (i >= timesToRun - 1) {
						doc.save("testttttt.pdf");
					}
				});
			}
		}
	}


	render() {
		return (
			<div className="wrapper">

				<h1 className="text-center">Sameday Registration</h1>
				{/* <input onChange={this.handleInputChange} className="firstname" placeholder = "firstname" value={this.state.firstname}></input> */}
				<div className="col-md-6 samedayform">
					<div className="form-group">
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.firstname}
							name="firstname"
							onChange={this.handleInputChange}
							type="text"
							placeholder="First Name"
							className="form-control"
						/>
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.lastname}
							name="lastname"
							onChange={this.handleInputChange}
							type="text"
							placeholder="Last Name"
							className="form-control"
						/>
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.company}
							name="company"
							onChange={this.handleInputChange}
							type="text"
							placeholder="Company Name"
							className="form-control"
						/>
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.position}
							name="position"
							onChange={this.handleInputChange}
							type="text"
							placeholder="Position"
							className="form-control"
						/>
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.email}
							name="email"
							onChange={this.handleInputChange}
							type="text"
							placeholder="Email"
							className="form-control"
						/>
						<input
							// onChange={(e) => this.setState({qrValue: e.target.value})}
							value={this.state.phone}
							name="phone"
							onChange={this.handleInputChange}
							type="text"
							placeholder="Phone Number"
							className="form-control"
						/>

						{/* <button onClick={this.handleFormSubmit} className="saveDataButton">Save data</button> */}
						{/* <button onClick={this.readFile} className="reportButton">Report</button> */}
					</div>
				</div>
				<div>
					{this.state.registered.length ? (
						<List>
							{this.state.registered.map(registered => (
								<ListItem key={registered._id} id={registered._id}>
									<Badge
										firstname={registered.firstname}
										lastname={registered.lastname}
										position={registered.position}
										company={registered.company}
									/>
									<div style={{ margin: "0 auto !important" }} className="text-center">
										<QRCode
											style={{ width: 256, margin: '0 auto' }}
											value={JSON.stringify({
												firstname: registered.firstname,
												lastname: registered.lastname,
												company: registered.company,
												position: registered.position,
												email: registered.email,
												phone: registered.phone
											})}
										/>
									</div>

								</ListItem>
							))}
						</List>

					) : (
							<h3></h3>
						)}
					<div className="badgeContainer">
						<Badge
							firstname={this.state.firstname}
							lastname={this.state.lastname}
							position={this.state.position}
							company={this.state.company}
							qrValue={this.state.qrValue}
						/>
						<div className="qrCode" className="text-center">
							<QRCode
								className="qr-code"
								value={JSON.stringify({
									firstname: this.state.firstname,
									lastname: this.state.lastname,
									company: this.state.company,
									position: this.state.position,
									email: this.state.email,
									phone: this.state.phone
								})}
							/>
						</div>
					</div>
					<div className="text-center" style={{ padding: "30px 0 0 0" }}>
						<button onClick={this.getPDF} className="saveDataButton text-center" style={{ margin: '0 auto' }}>Create PDF</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Sameday;