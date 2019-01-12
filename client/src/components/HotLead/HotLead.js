import React from "react";
import "./HotLead.css";


class HotLead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: false};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button className="btn btn-link" onClick={this.handleClick}>
        {this.state.isToggleOn ? <i class="fas fa-fire on"></i> : <i class="fas fa-fire off"></i>}
      </button>
    );
  }
}

export default HotLead; 