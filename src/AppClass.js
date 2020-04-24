import React, { Fragment, Component } from 'react';

class App extends Component {

  state = {
    count: 0,
    isOn: false
  };

  incrementCount = () => {
    // this.setState({count: this.state.count + 1});
    this.setState(prevState => ({
      count: prevState.count + 1
    }))
  }

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }))
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}} >
        <h2>Counter</h2>
        <button onClick={this.incrementCount}>I was clicked {this.state.count} times</button>

        <div style={{height: "70px"}}></div>

        <h2>Toggle Light</h2>
        <div style={{height: "50px", width: "50px", background: this.state.isOn ? "yellow" : "grey"}} 
          onClick={this.toggleLight}>
        </div>
      </div>
    )
  }

}

export default App;