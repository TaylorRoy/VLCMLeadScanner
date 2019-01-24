import React,{Component,createContext} from "react";
const {Provider, Consumer} = createContext()

class GlobalState extends Component {
	constructor (props){
		super (props)
		this.state = {
			test: "I am the test",
			vendor:"",
			authenticated: false,
			adminAuthenticated: false,
			authRes: null
		}
	}
	
	updateVendor = (event) => {
		this.setState({
			vendor: event.target.value
		})
	}
	
	setAuthRes = (authStatus) => {
		if (authStatus.user.Username === "Admin"){
			this.setState({
				authRes: authStatus,
				vendor: authStatus.user.Company,
				authenticated: true,
				adminAuthenticated:true
			})
			this.props.history.push('/admin')

		}
		else {

			this.setState({
				authRes: authStatus,
				vendor: authStatus.user.Company,
				authenticated: true,
			})

			this.props.history.push('/profile')
		}
	}

	logOut = () =>{
		this.setState({
			authenticated: true,
			vendor: "",
			authRes: null
		})
		this.props.history.push('/login')
		console.log("Logged out successfully")
		
	}


	setPage = (page) => {
		this.props.history.push(page)
	}

	render() {
		console.log(this.state)
		return (
			<Provider
				value={{
					state: this.state,
					updateVendor: this.updateVendor,
					setAuthRes: this.setAuthRes,
					logOut: this.logOut,
					setPage:this.setPage
				}}
			>
				{this.props.children}
			</Provider>
			
		)
	};
}
export default Consumer;
export {GlobalState}
