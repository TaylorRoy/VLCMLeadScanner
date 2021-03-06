import React,{Component,createContext} from "react";
import API from "./utils/API";
const {Provider, Consumer} = createContext()

class GlobalState extends Component {
	constructor (props){
		super (props)
		this.state = {
			test: "I am the test",
			vendor:"",
			authenticated: true,
			adminAuthenticated: false,
			authRes: null
		}
	}
	
	updateVendor = (event) => {
		this.setState({
			vendor: event.target.value
		})
	}

	checkUrlForRedirect = () => {
    if(window.location.hash){
      this.props.history.push(window.location.hash.split('#')[1])
    }
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
		API.signOut()
		.then(res => {
			this.handleAuthRes(res)
			this.props.history.push('/login')
			
    }).catch(err => {
      console.log(err)
    })
		
		this.props.history.push('/login')
		console.log("Logged out successfully")
		
	}


	setPage = (page) => {
		this.props.history.push(page)
	}
//verify login

	componentWillMount(){
		this.isSignedIn()
		this.checkUrlForRedirect()
  }

  isSignedIn = () => {
    
		API.verifySignIn()
		.then(res => {
			this.handleAuthRes(res)
			
    }).catch(err => {
      console.log(err)
    })
  }

  handleAuthRes = (res) => {
		// if(res.data.message){alert(res.data.message)}
		console.log(res)
    this.setState({
      username:res.data.user,
      authenticated:res.data.auth,adminAuthenticated:res.data.admin
    })
  }
	

	render() {
		
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
