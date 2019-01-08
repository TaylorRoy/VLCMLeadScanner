import React, { Component } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import Badge from "../components/Badge";
import { List } from "../components/List";
import { ListItem } from "../components/List";

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
        qrcode: ""
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

    //   readFile = (res) => {
    //     API.getBooks(res)
    //       .then(res => this.setState({ leads: res.data, firstname: "", lastname: "", company: "", position: "", email: "", phone: "" })
    //       )
    //       .catch(err => console.log(err));
    //     console.log("leads", this.state.leads);

    //     //create empty array to push json into later
    //     var csvRow = [];

    //     //save this.state.leads into another variable
    //     var jsonLeads = this.state.leads;
    //     console.log("jsonLeads", jsonLeads);

    //     //create an array with an array of header strings which we will push json into
    //     var jsonArray = [["_id", "firstname", "lastname", "company", "position", "email", "phone", "date"]];

    //     //loop through jsonLeads and push into jsonArray
    //     for (var i=0; i<jsonLeads.length; i++) {
    //       jsonArray.push([jsonLeads[i]._id , jsonLeads[i].firstname, jsonLeads[i].lastname, jsonLeads[i].company, jsonLeads[i].position, jsonLeads[i].email, jsonLeads[i].phone, jsonLeads[i].date]);
    //     }
    //     console.log("jsonArray befor join", jsonArray);

    //     //loop through jsonArray and join data inside of array into string based on commas
    //     for (var i =0; i<jsonArray.length; i++) {
    //       csvRow.push(jsonArray[i].join(","))
    //     }
    //     console.log("csvRow after join", csvRow);
    //     //add %0A where there is a space to indicate where csv file should start a new line
    //     var csvString = csvRow.join("%0A");
    //     console.log("csvString", csvString);

    //     //output csv file
    //     var a = document.createElement("a");
    //     a.href = 'data:attachment/csv,' + csvString;
    //     a.target = "_Blank";
    //     a.download = "vlcmReport.csv";
    //     document.body.appendChild(a);
    //     a.click();
    //   };



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
                            <ListItem key={lead._id}>
                                <Badge
                                    firstname={lead.firstname}
                                    lastname={lead.lastname}
                                    company={lead.company}
                                    qrcode={lead.qrcode}
                                />
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