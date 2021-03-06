import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import canvg from 'canvg';
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Badge from "../components/Badge";
import { List } from "../components/List";
import { ListItem } from "../components/List";
import { QRCode } from 'react-qr-svg';

class Sameday extends Component {

	// Setting our component's initial state
	state = {
		leads: [],
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
			.then(res => this.setState({
				leads: res.data,
				firstname: "",
				lastname: "",
				company: "",
				position: "",
				email: "",
				phone: "",
			})
			)
			.catch(err => console.log(err));
		console.log("leads", this.state.leads);
	};

	// Handles updating component state when the user types into the input field
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	//create PDF of just QR badge section of the Sameday page
	getPDF = () => {
		var doc = new jsPDF();
		var timesToRun = this.state.leads.length;
		for (var i = 0; i < timesToRun; i++) {
			makePdfPage(i)
			function makePdfPage(i) {
				html2canvas(document.querySelectorAll(".list-group-item")[i]).then(canvas => {
					var image = canvas.toDataURL("image/png");
					doc.addImage(image, "JPEG", 20, 20);
					var svg = document.querySelectorAll(".list-group-item")[i].children[1].children[0].outerHTML;
					var canvas2 = document.createElement('canvas');
					canvg(canvas2, svg);
					var imgData = canvas2.toDataURL('image/png');
					doc.addImage(imgData, 'PNG', 10, 80, 180, 100);
					doc.addPage();
					if (i >= timesToRun - 1) {
						doc.save("testttttt.pdf");
					}
				});
			}
		}
	}

	render() {
		return (
			<div>
				<h1 className="text-center">Welcome Company</h1>
				<h3 className="text-center">
					Badges Page
        </h3>
				{/* <input onChange={this.handleInputChange} className="firstname" placeholder = "firstname" value={this.state.firstname}></input> */}

				<button onClick={this.loadLeads} className="saveDataButton">Show Leads from Database</button>
				<button onClick={this.readFile} className="reportButton">Export CSV Report</button>
				<button onClick={this.getPDF} className="saveDataButton">Create Badge PDF Files</button>

				<Jumbotron>
					<h1>List of Badges</h1>
					<h2>Number of Badges: {this.state.leads.length}</h2>
				</Jumbotron>
				{this.state.leads.length ? (
					<List>
						{this.state.leads.map(lead => (
							<ListItem key={lead._id} id={lead._id}>
								<Badge
									firstname={lead.firstname}
									lastname={lead.lastname}
									company={lead.company}
								/>
								<div style={{ margin: "50px" }}>
									<QRCode
										style={{ width: 256, marginLeft: 300 }}
										value={JSON.stringify({
											firstname: lead.firstname,
											lastname: lead.lastname,
											company: lead.company,
											position: lead.position,
											email: lead.email,
											phone: lead.phone
										})}
									/>
								</div>
								<DeleteBtn />
							</ListItem>
						))}
					</List>
				) : (
						<h3>No Results to Display</h3>
					)}
			</div>
		);
	}
}

export default Sameday;