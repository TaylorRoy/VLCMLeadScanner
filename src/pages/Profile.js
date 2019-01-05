import React, { Component } from "react";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import { List } from "../components/List";
import { ListItem } from "../components/List";

class Profile extends Component {
  // Setting our component's initial state
  state = {
    leads: [],
    firstname: "",
    lastname: "",
    company: "",
    position: "",
    email: "",
    phone: ""
  };
  count = 0;

  // Whens the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadLeads();
  }

  // Loads all books  and sets them to this.state.books
  loadLeads = (res) => {
    API.getBooks(res)
      .then(res => this.setState({ leads: res.data, firstname: "", lastname: "", company: "", position: "", email: "", phone: "" })
      )
      .catch(err => console.log(err));
    console.log("leads", this.state.leads);
  };

  //Writes a report.txt file of all leads from database
  // createReport = (res) => {
  //   alert("createReport");
  //   API.getBooks(res)
  //     .then(res => this.setState({ leads: res.data }))
  //     .catch(err => console.log(err));
  //   console.log("leads from createreport", this.state.leads);
  
  // }

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
    for (var i=0; i<jsonLeads.length; i++) {
      jsonArray.push([jsonLeads[i]._id , jsonLeads[i].firstname, jsonLeads[i].lastname, jsonLeads[i].company, jsonLeads[i].position, jsonLeads[i].email, jsonLeads[i].phone, jsonLeads[i].date]);
    }
    console.log("jsonArray befor join", jsonArray);

    //loop through jsonArray and join data inside of array into string based on commas
    for (var i =0; i<jsonArray.length; i++) {
      csvRow.push(jsonArray[i].join(","))
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
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    alert("yo");
    event.preventDefault();
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
        {this.state.leads.length ? (
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
