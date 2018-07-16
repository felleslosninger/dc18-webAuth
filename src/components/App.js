import React, {Component} from 'react';
import webauthnRegisterFlow from '../static/images/MDN Webauthn Registration (r3).png';
import webauthnAuthenticationFlow from '../static/images/MDN Webauthn Authentication (r1).png';
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
        <h4 className="App-title">{`Webauthn ${this.state.flowType} med Difi!`}</h4>
        <header>
          {
            this.state.flowType === FlowTypes.REGISTER &&
            <img src={webauthnRegisterFlow} className="App-flow-diagram" alt="Webauthn registration flow"/>
            ||
            this.state.flowType === FlowTypes.SIGN_IN &&
            <img src={webauthnAuthenticationFlow} className="App-flow-diagram" alt="Webauthn authentication flow"/>
          }
        </header>
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
