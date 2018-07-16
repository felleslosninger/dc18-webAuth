# Experimental branch - React WebAuthn Client and Spark Server

**NOTE:** This is an experimental branch attempting to create a React app that uses [webauthn-simple-app](https://www.npmjs.com/package/webauthn-simple-app) in order to perform browser-authenticator and browser-server communication. It communicates with a Spark server.

## Goal

This branch aimed to explore the space of Node.js-based web applications, in particular using the webauthn-simple-app npm package, which is supposed to be an easy way of performing WebAuthn registration and authentication, abstracting away most of the details required when using WebAuthn directly.

The project was initially built to communicate with [this WebAuthn demo](https://webauthn.org), but was later reconfigured to communicate with [this spark server](https://github.com/viktorfa/webauthn4j-spark-demo), which is also included in this branch.

## Status

The project currently works, but requires a bit of configuration. To run the Spark server, a keystore must be generated with password "dificamp", and to run the client server the environment variable "HTTPS" must be set to "true". The data received from the server is displayed on the page. It's not clear whether authentication is handled any differently from registration.

## Running the project

### Running the Spark server

```
$ mkdir secret

$ keytool -genkey -alias mydomain -keyalg RSA -keystore secret/webauthn4j.jks -keysize 2048
>>> NOTE: password is "dificamp"

$ ./gradlew :run
>>> NOTE: or "gradlew run" on Windows
```

### Running the client

```
$ npm install

$ HTTPS=true npm start
```

This should automatically open a browser window to https://localhost:3000/, where the client is set up to communicate with the Spark server. If you get any warnings, add an exception for the current domain.

In order to test this demo, go to https://localost:3000/. You are brought to the "Register" tab. There is no need to enter a username; the server automatically generates a random number as your username. Click "Ask server for options" to get data from the server, then click "Create credentials with options" to create credentials using the authenticator, and finally click "Send credentials to server" to perform the registration.

When registered, you can also press the "Sign in" button to go to the "Sign in" tab. In order to sign in with WebAuthn, you perform the same actions.
