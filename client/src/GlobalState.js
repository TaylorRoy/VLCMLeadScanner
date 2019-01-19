import React,{Component,createContext} from "react";
const {Provider, Consumer} = createContext()

class GlobalState extends Component {
	constructor (props){
		super (props)
		this.state = {
			test: "I am the test",
			vendor:"",
			authenticated: true,
			authRes: null
		}
	}
	
	updateVendor = (event) => {
		this.setState({
			vendor: event.target.value
		})
	}
	
	setAuthRes = (authStatus) => {
		this.setState({
			authRes: authStatus,
			vendor: authStatus.user.username,
			authenticated: true,
		})
		this.props.history.push('/profile')
	}

	logOut = () =>{
		this.setState({
			authenticated: false,
			vendor: "",
			authRes: null
		})
		this.props.history.push('/login')
		console.log("Logged out successfully")
		
	}

	render() {
		console.log(this.state)
		return (
			<Provider
				value={{
					state: this.state,
					updateVendor: this.updateVendor,
					setAuthRes: this.setAuthRes,
					logOut: this.logOut
				}}
			>
				{this.props.children}
			</Provider>
			
		)
	};
}
export default Consumer;
export {GlobalState}
