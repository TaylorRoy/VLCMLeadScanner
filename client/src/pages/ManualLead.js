import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../utils/API";
//import DeleteBtn from "../components/DeleteBtn";
import Badge from "../components/Badge";
import { List } from "../components/List";
import { ListItem } from "../components/List";


import { QRCode } from 'react-qr-svg';



class ManualLead extends Component {
  // Setting our component's initial state
  state = {

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
    console.log("RES: ", res);
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

  //create PDF of just QR badge section of the Sameday page
  getPDF = () => {
    console.log("in getPDF");


    html2canvas(document.querySelector("#badgeContainer")).then(canvas => {
      console.log("canvas", canvas);
      document.body.appendChild(canvas);
      var image = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(image, "JPEG", 20, 20);
      doc.save("test.pdf");
    });
  }
  // .getElementById(""
  render() {
    return (
      <div>
				<div className="wrapper">
				<h1 className="text-center" style={{padding: '0 0 30px 0'}}>Manually Enter Lead</h1>
				<h3 className="col-md-6 justify-content-center" style={{margin: '0 auto'}}>Fill out the form below to manually enter your lead into the database. Return to the scanner page to view the lead after you hit submit.</h3>
      

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
              value={this.state.laststname}
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

            <button onClick={this.handleFormSubmit} className="saveDataButton">Save data</button>
            {/* <button onClick={this.readFile} className="reportButton">Report</button> */}
          </div>
        </div>

        
      </div>
			</div>
    );
  }
}

export default ManualLead;
