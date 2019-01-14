import React,{Component,createContext} from "react";
const {Provider, Consumer} = createContext()

class GlobalState extends Component {
	constructor (props){
		super (props)
		this.state = {
			test: "I am the test",
			vendor:"Clayton Co",
			authenticated: false,
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
			authenticated: true
		})
	}

	render() {
		console.log(this.state)
		return (
			<Provider
				value={{
					state: this.state,
					updateVendor: this.updateVendor,
					setAuthRes: this.setAuthRes
				}}
			>
				{this.props.children}
			</Provider>
			
		)
	};
}
export default Consumer;
export {GlobalState}
