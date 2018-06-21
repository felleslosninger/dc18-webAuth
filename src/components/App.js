import React, {Component} from 'react';

import logo from '../logo.svg';
import './App.css';
import RegisterComponent from "./RegisterComponent";
import SignInComponent from "./SignInComponent";


const FlowTypes = {
  REGISTER: 'register',
  SIGN_IN: 'sign_in',
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: Math.random(),
      flowType: FlowTypes.REGISTER,
    };

    this.switchToRegisterFlow = this.switchToRegisterFlow.bind(this);
    this.switchToSignInFlow = this.switchToSignInFlow.bind(this);
    this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
  }

  switchToRegisterFlow() {
    this.setState({flowType: FlowTypes.REGISTER})
  };

  switchToSignInFlow() {
    this.setState({flowType: FlowTypes.SIGN_IN})
  };

  onUsernameInputChange(event) {
    //event.preventDefault();
    console.log('onUsernameInputChange');
    console.log(event);
    console.log(event.target.value);
    this.setState({username: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <button
            disabled={this.state.flowType === FlowTypes.REGISTER}
            onClick={this.switchToRegisterFlow}
          >
            Register
          </button>
          <button
            disabled={this.state.flowType === FlowTypes.SIGN_IN}
            onClick={this.switchToSignInFlow}
          >
            Sign in
          </button>
          <br/>
          <form>
            username
            <br/>
            <input
              onChange={this.onUsernameInputChange}
              type="text"
              name="username"
              placeholder={'username'}
            />
          </form>
        </div>
        {
          this.state.flowType === FlowTypes.REGISTER &&
          <RegisterComponent
            username={this.state.username}
          />
          ||
          this.state.flowType === FlowTypes.SIGN_IN &&
          <SignInComponent
            username={this.state.username}
          />
          ||
          <p>:(</p>
        }
      </div>
    );
  }
}

export default App;
