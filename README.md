# Experimental branch - Barebones Spring Security Webauthn

**NOTE:** This is an experimental branch loosely based on [Yoshikazu Nojima's spring-security-webauthn](https://github.com/ynojima/spring-security-webauthn), which has been under development for a few months.

## Goal

The goal of this branch was to implement a minimal implementation of the spring-security-webauthn code, intended to increase the understanding of the underlying mechanisms, and to potentially make it easier to understand for anyone coming to read it  later. The branch was developed by incrementally adding more code that was required to make WebAuthn work with Spring Security. Most of the files added are based on the corresponding files in spring-security-webauthn, with a few adaptations.

## Status

This project was abandoned before it could be brought to fruition completely, due to a shift in focus from frontend to backend. Most of the code in this branch deals with integrating WebAuthn with Spring-Security, and it does not contain much of the actual behavior of WebAuthn - the intention would be to use [WebAuthn4J](https://github.com/webauthn4j/webauthn4j) to achieve this. As best as I understand it, the explanation of how to integrate WebAuthn as a form of authentication with Spring Security is roughly as follows:

- Add a custom security filter based on UsernamePasswordAuthenticationFilter (Spring Security). Based on the data it receives, this filter determines whether to authenticate using username/password or with WebAuthn.
  - The correct AuthenticationProvider to use is determined based on which Authentication token the filter creates and passes to the authentication manager.
- Create an AuthenticationProvider that accepts a customized WebAuthn authentication token and performs the WebAuthn authentication step.
- The challenge somehow needs to be passed to the client. As far as I can tell, the server-generated challenge is included in the page metadata on login page load, but it should also be possible to fetch it on demand.
- The browser performs authentication over the challenge, creating an attestation object, the data of which is passed to the server
- The server creates a WebAuthn authentication token and invokes the AuthenticationProvider.
- The AuthenticationProvider verifies that the authentication was performed correctly and accepts the client if the authentication was successful.

This branch stops short of implementing the WebAuthnAuthenticationProvider properly. It also contains a few feeble attempts at client-authenticator and client-server communication of the results, but nothing impressive.

## Running the project

```
$ mvn spring-boot:run
```

This command sets up a server running on http://localhost:8080/.

In order to test the demo, as far as it has been implemented, register an account (you only need to enter a username and password, as the code as of yet has no concept of an authenticator). After registering a user, you are brought to the login page, from which you can attempt to login with your newly created user. If successful, you will be brought to a page asking you to press the security key. The Yubikey is automatically activated upon loading this page. However, nothing of interest happens when you do press it.
