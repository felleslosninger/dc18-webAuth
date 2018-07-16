# Experimental branch - React WebAuthn Client and Spark Server

**NOTE:** This is an experimental branch attempting to create a React app that uses [webauthn-simple-app](https://www.npmjs.com/package/webauthn-simple-app) in order to perform browser-authenticator and browser-server communication. It communicates with a Spark server.

## Goal

This branch aimed to explore the space of Node.js-based web applications, in particular using the webauthn-simple-app npm package, which is supposed to be an easy way of performing WebAuthn registration and authentication, abstracting away most of the details required when using WebAuthn directly.

The project was initially built to communicate with [this WebAuthn demo](https://webauthn.org), but was later reconfigured to communicate with [this spark server](https://github.com/viktorfa/webauthn4j-spark-demo), which is also included in this branch.

## Status

TODO

## Running the project

### Running the Spark server

1. Generate a jks keystore in `./secret/webauthn4j.jks`
2. bash: `./gradlew :run` windows: `gradlew :run`
3. It should work now

### Running the client

1. Run `npm install`
2. Run `npm start`

This should automatically open a browser window to http://localhost:3000/, where the client is set up to communicate with the Spark server
