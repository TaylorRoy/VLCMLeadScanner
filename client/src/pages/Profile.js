import React, { Component } from "react";
// import API from "../utils/API";
// import Card from "../components/Card";
// import Alert from "../components/Alert";
// import ProfileBtn from "../components/ProfileBtn"
// import VendorLeadTable from "../components/VendorLeadTable"
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { List } from "../components/List";
import { ListItem } from "../components/List";

import QrReader from "react-qr-reader";

// class Profile extends Component {


//   render() {
//     return (
//       <div style={{ ProfileBtn }} className="text-center scanner">

//         <button className="scanButton">SCAN <br /> BADGE</button>
//         <button className="reportButton">MANUALLY <br /> ENTER LEAD</button>
//         <p>List rendered below from db</p>
//       </div>
//     );
// 	}

// }

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
    result: ""
  };
  count = 0;

  // QR code stuff
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result"
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

			this.handleFormSubmit();

			return;
			
		}
		
  }
  handleError(err) {
    console.error(err);
	}
	// END OF QR CODE STUFF


  // Whens the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadLeads();
  }

  // Loads all books  and sets them to this.state.books
  loadLeads = (res) => {
    API.getBooks(res)
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

 

  readFile = (res) => {
    API.getBooks(res)
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
    for (var j =0; j<jsonArray.length; j++) {
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
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      // qrValue: "firstname: " + this.state.firstname + "lastname: " + this.state.lastname + "company: " + this.state.company
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    alert("yo");

    API.saveBook({
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



  render() {
    return (
      <div>
        <h1 className="text-center">Welcome Company</h1>
        <h3 className="text-center">
          Click scan to scan badges or Report to see booth visitor data.
        </h3>

        <QrReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "320px" }}
        />
        <p>{this.state.result}</p>

        {/* <input onChange={this.handleInputChange} className="firstname" placeholder = "firstname" value={this.state.firstname}></input> */}
        <input
          value={this.state.firstname}
          name="firstname"
          onChange={this.handleInputChange}
          type="text"
          placeholder="First Name"
        />
        <input
          value={this.state.laststname}
          name="lastname"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Last Name"
        />
        <input
          value={this.state.company}
          name="company"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Company Name"
        />
        <input
          value={this.state.position}
          name="position"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Position"
        />
        <input
          value={this.state.email}
          name="email"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Email"
        />
        <input
          value={this.state.phone}
          name="phone"
          onChange={this.handleInputChange}
          type="text"
          placeholder="Phone Number"
        />

        <button onClick={this.handleFormSubmit} className="saveDataButton">Save data</button>
        <button className="scanButton">Scan</button>
        <button onClick={this.readFile} className="reportButton">Report</button>


        <Jumbotron>
          <h1>List of Leads</h1>
        </Jumbotron>
        {this.state.leads ? (
          <List>
            {this.state.leads.map(lead => (
              <ListItem key={lead._id}>
                <a href={"/scans/" + lead._id}>
                  <strong>
                    {lead.firstname} {lead.lastname}
                  </strong>
                </a>
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

export default Profile;
