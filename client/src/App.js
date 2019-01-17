import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Badge from "./pages/Badge";
import Admin from "./pages/Admin";
import Sameday from "./pages/Sameday";
import UploadLeadList from "./pages/UploadLeadList";



const App = () => (
  <Router>
    <div>
     
   
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/badge" component={Badge} />
        <Route exact path="/sameday" component={Sameday} />
				<Route exact path="/UploadLeadList" component={UploadLeadList} />
 
    
    </div>
  </Router>
);

export default App;
