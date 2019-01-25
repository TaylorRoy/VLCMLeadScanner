import axios from "axios";

export default {
  // Gets all leads
  getLeads: function (req) {
    return axios.get("/api/leads");
  },


  login: function (req) {
    
    return axios.post("/api/vendor/login", req)
  },

  // Saves a lead to the database
  saveLead: function (leadData) {
    return axios.post("/api/leads", leadData);
	},
	
	deleteLead: function(id) {
    return axios.delete("/api/leads/" + id);
  },


	saveAttendee:  function(attendee) {
		return axios.post("/api/attendee/add",attendee)
	},


	verifySignIn: function () {
		return axios.get('/api/vendor/login')
	},


	signOut: function () {
		return axios.get('/api/vendor/logout')
	}
  // Gets the book with the given id
  // getBooks: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  

};
