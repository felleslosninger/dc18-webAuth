/* global WebAuthnApp */
/* global CreateOptions */
/* global CreateOptionsRequest */
/* global ServerResponse */
/* global CredentialAttestation */
/* global Msg */
/* global exp */
import React, {Component} from 'react';
import * as WebAuthn from './webauthn';
import logo from './logo.svg';
import './App.css';

import {WebAuthnHelpers} from './webauthn';

const utils = WebAuthnHelpers.utils;


console.log(window.WebAuthnHelpers);
console.log(window.CreateOptions);

let requestId;

const webAuthnConfig = {
  timeout: 30000,
  username: 'Per',
  registerChallengeMethod: 'POST',
  registerChallengeEndpoint: 'https://webauthn.org/attestation/options',
  registerResponseEndpoint: 'https://localhost:8443/webauthn/api/v1/register/finish',
  registerResponseMethod: 'POST',
};

const waApp = new WebAuthnApp(webAuthnConfig);
console.log(WebAuthn);
console.log(WebAuthnApp);
console.log(waApp);

const getCreateCredentialsOptions = (serverResponse) => {
  return {
    publicKey: serverResponse,
  };
};

const getDecodedObject = (obj) => {
  return {
    ...obj,
    challenge: utils.coerceToArrayBuffer(obj.challenge),
    user: {...obj.user, id: utils.coerceToArrayBuffer(obj.user.id)},
  };
};

const getEncodedObject = (obj) => {
  return {...obj, challenge: utils.coerceToBase64Url(obj.challenge)};
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.register = this.register.bind(this);
    this.startCreateCredentials = this.startCreateCredentials.bind(this);
    this.generateCreateCredentials = this.generateCreateCredentials.bind(this);
  }

  register() {
    const data = {
      username: 'a',
      displayName: 'a',
    };
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
    const options = {
      headers,
      body: JSON.stringify(data),
      method: 'POST',
      mode: 'cors',
    };
    console.log('options');
    console.log(options);
    fetch(webAuthnConfig.registerChallengeEndpoint, options).then((response) => {
      if (response.ok) return response.json();
      else throw new Error(response.statusText);
    }).then((data) => {
      this.setState({registerResponse: data});
    });
  }

  generateCreateCredentials() {
    console.log('this.state.registerResponse');
    console.log(this.state.registerResponse);
    console.log('this.state.registerResponse decoded');
    console.log(getDecodedObject(this.state.registerResponse));
    navigator.credentials.create(getCreateCredentialsOptions(getDecodedObject(this.state.registerResponse))).then((credentials) => {
      this.setState({publicKeyCredential: credentials});
    }).catch(console.error);
  }

  startCreateCredentials(options) {
    console.log('startCreateCredentials');
    console.log('options');
    console.log(options);
    options.decodeBinaryProperties();
    navigator.credentials.create({publicKey: options.toObject()})
      .then((credentials) => {
        console.log("Credentials from browser:");
        console.log(credentials);
        this.sendRegisterResult(credentials);
      }).catch(console.error);
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
        <button
          onClick={this.register}
        >
          Register
        </button>
        <button
          onClick={this.generateCreateCredentials}
          disabled={!this.state.registerResponse}
        >
          Create credentials
        </button>

        <div>
          <h4>this.state:</h4>
          <pre
            style={{textAlign: 'left'}}
          >
            {JSON.stringify(this.state, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}

export default App;
