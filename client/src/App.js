import React from "react";
import { Route, withRouter,Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Badge from "./pages/Badge";
import Admin from "./pages/Admin";
import Sameday from "./pages/Sameday";
import UploadLeadList from "./pages/UploadLeadList";
import Navbar from "./components/Navbar";
import Consumer, { GlobalState } from "./GlobalState";


const App = (props) => (
	<GlobalState history={props.history}>
		<Consumer>
			{(global) => (
				<React.Fragment>
					


  
					<Switch>
						<div>
							<Navbar />

							<Route exact path="/" component={Login} />
							<Route exact path="/login" component={Login} />
							{global.state.authenticated && <Route exact path="/profile" component={Profile} />}
							{global.state.authenticated && <Route exact path="/admin" component={Admin} />}
							{global.state.authenticated && <Route exact path="/badge" component={Badge} />}
							{global.state.authenticated && <Route exact path="/sameday" component={Sameday} />}
							{global.state.authenticated && <Route exact path="/UploadLeadList" component={UploadLeadList} />}


						</div>
					</Switch>
				</React.Fragment>
			)}
		</Consumer>
	</GlobalState>
);

export default withRouter(App);
