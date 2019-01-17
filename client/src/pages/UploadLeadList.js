import React, { Component} from "react";
import LeadUpload from "../components/LeadUpload";

// import {QRCode} from 'react-qr-svg';

class UploadLeadList extends Component {
  render() {
		return (
			<div>
				<LeadUpload />

			

				{/* <div className="qrCode">
					<QRCode
            className="qr-code"
						value={this.state.qrValue}
					/>
				</div> */}
		
			</div>

		
			
		)
	}
}


export default UploadLeadList;