/* global WebAuthnApp */
/* global CreateOptions */
/* global CreateOptionsRequest */
/* global ServerResponse */
/* global CredentialAttestation */
/* global Msg */
/* global exp */
import React, {Component} from 'react';
import formurlencoded from 'form-urlencoded';
import * as WebAuthn from './webauthn';
import {WebAuthnHelpers} from './webauthn';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

const utils = WebAuthnHelpers.utils;

const ServerSchemes = {
  YUBICO: 'yubico',
};
const ContentTypes = {
  JSON: 'application/json; charset=utf-8',
  URLENCODED: 'application/x-www-form-urlencoded',
};

console.log(window.WebAuthnHelpers);
console.log(window.CreateOptions);

const webAuthnConfig = {
  timeout: 30000,
  username: 'Per',
  registerChallengeMethod: 'POST',
  registerChallengeEndpoint: 'https://localhost:8443/webauthn/api/v1/register',
  registerResponseEndpoint: 'https://localhost:8443/webauthn/api/v1/register/finish',
  registerResponseMethod: 'POST',
  serverScheme: ServerSchemes.YUBICO,
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

const getRegisterResponseObject = (publicKeyCredential) => {
  return publicKeyCredential;
};

const getDecodedObject = (obj, paths) => {
  const clonedObj = {..._.clone(obj)};
  for (let path of paths) {
    _.update(clonedObj, path, utils.coerceToArrayBuffer);
  }
  return clonedObj;
};

const getEncodedObject = (obj, paths) => {
  const result = {};
  for (let path of paths) {
    _.set(result, path, utils.coerceToBase64Url(_.get(obj, path)));
  }
  return {..._.toPlainObject(obj), ...result};
};

const getFetchOptions = (data, contentType) => {
  const defaultHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const defaultOptions = {
    headers: defaultHeaders,
    body: JSON.stringify(data),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  };
  const resultOptions = {};
  const resultHeaders = {};

  switch (webAuthnConfig.serverScheme) {
    case ServerSchemes.YUBICO:
      break;
    default:
      break;
  }
  switch (contentType) {
    case ContentTypes.JSON:
      resultHeaders['Content-Type'] = ContentTypes.JSON;
      resultOptions.body = JSON.stringify(data);
      break;
    case ContentTypes.URLENCODED:
      defaultOptions.headers["Content-Type"] = ContentTypes.URLENCODED;
      defaultOptions.body = formurlencoded(data);
      break;
    default:
      break;
  }
  return {
    ...defaultOptions,
    headers: {...defaultHeaders, resultHeaders},
    ...resultOptions,
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.register = this.register.bind(this);
    this.generateCreateCredentials = this.generateCreateCredentials.bind(this);
    this.sendCredentialsToServer = this.sendCredentialsToServer.bind(this);
  }

  register() {
    const data = {
      username: 'a',
      displayName: 'a',
    };
    fetch(webAuthnConfig.registerChallengeEndpoint, getFetchOptions(data, ContentTypes.URLENCODED)).then((response) => {
      if (response.ok) return response.json();
      else throw new Error(response.statusText);
    }).then((data) => {
      this.setState({registerResponse: data.request.publicKeyCredentialCreationOptions});
      this.setState({requestId: data.request.requestId});
      this.setState({requestId: data.request.requestId});
    }).catch(console.error);
  }

  generateCreateCredentials() {
    console.log('this.state.registerResponse');
    console.log(this.state.registerResponse);
    console.log('this.state.registerResponse decoded');
    console.log(getDecodedObject(this.state.registerResponse, ['challenge', 'user.id']));
    navigator.credentials.create(getCreateCredentialsOptions(getDecodedObject(this.state.registerResponse, ['challenge', 'user.id']))).then((credentials) => {
      console.log('Credentials from browser:');
      console.log(credentials);
      console.log('Credentials from browser _.toPlainObject(credentials):');
      console.log(_.toPlainObject(credentials));
      this.setState({publicKeyCredential: credentials});
      this.setState({publicKeyCredentialEncoded: getEncodedObject(credentials, ['response.attestationObject', 'response.clientDataJSON', 'rawId'])});
      this.setState({publicKeyCredentialObject: _.update(_.pick(credentials, ['response.attestationObject', 'rawId', 'id']), 'response.attestationObject', utils.coerceToBase64Url)});
      this.setState({publicKeyCredentialString: JSON.stringify(_.pick(credentials, ['response.attestationObject', 'rawId']))});
    }).catch(console.error);
  }

  sendCredentialsToServer() {
    console.log('this.state.publicKeyCredentialEncoded');
    console.log(this.state.publicKeyCredentialEncoded);
    let data;
    switch (webAuthnConfig.serverScheme) {
      case ServerSchemes.YUBICO:
        data = {
          credential: this.state.publicKeyCredentialEncoded,
          requestId: this.state.requestId,
        };
        break;
      default:
        data = this.state.publicKeyCredentialEncoded;
    }
    fetch(webAuthnConfig.registerResponseEndpoint, getFetchOptions(data, ContentTypes.JSON)).then((response) => {
      if (response.ok) return response.json();
      else throw new Error(response.statusText);
    }).then((data) => {
      console.log('sendCredentialsToServer response data');
      console.log(data);
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
          Ask server for options
        </button>
        <button
          onClick={this.generateCreateCredentials}
          disabled={!this.state.registerResponse}
        >
          Create credentials with options
        </button>
        <button
          onClick={this.sendCredentialsToServer}
          disabled={!this.state.publicKeyCredentialObject}
        >
          Send credentials to server
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
