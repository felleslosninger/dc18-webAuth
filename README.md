**NOTE:** For unrelated experimental server/client branches, checkout `experiment-keycloak-webauthn-authenticator`, `experiment-webauthn4j-spark-demo-1` and `experiment-barebones-spring-security-webauthn`. They represent three different approaches to implementing WebAuthn authentication servers; one implements a (U2F) Keycloak authenticator based on [keycloak-experimental](https://github.com/stianst/keycloak-experimental), another contains a React app communicating with a Spark server using [WebAuthn4J](https://github.com/webauthn4j/webauthn4j), and the third aims to be a bare-bones minimal implementation of [spring-security-webauthn](https://github.com/ynojima/spring-security-webauthn).

# Id-porten redesign

### Docker build instructions

#### Create the image

```
$ docker build -t dc2018/flow .
```

#### Run the server

```
$ docker run -p 8080:9000 -d dc2018/flow
```

#### Kill the server

```
$ docker kill "$(docker ps | grep "dc2018/flow" | sed -n 's/\(............\).*/\1/p')"
```

#### View the pages

First, build and run the docker image. With the server running, open your web browser and navigate to `localhost:8080/build/demo/landing-page/index.html` and go from there, or get an overview of the files in the demo folder by viewing the directory structure of `localhost:8080/build/demo`.

### How to build

Prerequisites
- NPM
- Ruby
- SASS

1. `npm install`
2. `npm build`


### How to develop

1. `npm start`
This will automatically build the project in the `dev` folder as you edit them.


### Designing Webauthn for MinId

Work in the `demo` folder. You can test stuff there and edit the source files later.

### Using localStorage for demo purposes

For the sake of the demo, we're just storing the data the user enters using
localStorage. In order to automatically populate fields with values from
localStorage, mark the elements with `class='...'` attributes depending on the
content you want them to have.

#### Currently supported class attributes:

- securitykey-name (the user defined name of the security key)
- securitykey-time (the time the security key was registered)
- securitykey-info (short html string with name and date only)
- auth-type (the type of second factor authorization the user has selected,
  in human readable format)

#### Currently used localStorage fields:

- webauthn-device (contains device data such as key name and creation time)
- auth-type (contains one of 'letter', 'sms' or 'webauthn')

#### Example usage:

```html
<!-- gets currently selected auth type and puts it in inner html -->
<span class='auth-type'></span>

<!-- gets current security key device name and puts it in value attr -->
<input type='text' class='securitykey-name' />

<!-- include this file in the "include scripts" section of your html file -->
<script type="text/javascript" src="../../js/update-localstorage-fields.js"></script>
```

**NOTE:** The input tag also receives the data in the inner html - this is not a
problem, precisely, but it's not ideal and is a point of improvement in the
code.
