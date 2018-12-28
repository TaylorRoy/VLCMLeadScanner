import axios from "axios";

export default {
  // Gets all books
  getBooks: function(req) {
    console.log("in getBooks API", req);
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  // getBooks: function(id) {
  //   return axios.get("/api/books/" + id);
  // },
  // // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/" + id);
  // },
  // Saves a book to the database
  saveBook: function(bookData) {
    console.log("In saveBook API");
    return axios.post("/api/books", bookData);
  }
};
