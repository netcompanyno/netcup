import React, { Component } from "react";

class Content extends Component {
  render() {
    return (
      <div style={{
        marginBottom: '10vh'
      }} className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
}

export default Content;
