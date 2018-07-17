# Experimental branch - Keycloak Webauthn Authenticator

**NOTE:** This branch is based off of [Viktor Andersen's keycloak-webauthn-authenticator](https://github.com/viktorfa/keycloak-webauthn-authenticator), which is again largely based on [Stian Thorgersen's keycloak-experimental](https://github.com/stianst/keycloak-experimental) (fido-u2f subfolder).

## Goal

This branch explores the possibility of using WebAuthn together with Keycloak - or, more accurately, U2F authentication. However, the code or explanation of the procedure might be helpful in attempting to understand how also the newer WebAuthn standard may be used to authenticate using a Keycloak security server.

## Status

Using the Keycloak authentication server amounts to writing a custom Authenticator and a corresponding AuthenticatorFactory. The Authenticator implements the methods `authenticate()`, which sends a challenge to the client, and `action()`, which validates the client response and determines if the client is properly authenticated. The AuthenticatorFactory is required for Keycloak to be able to instantiate the Authenticator. In addition, some providers and corresponsing factories were created.

We managed to get a working login-flow using U2F based on this format, and using a separate Keycloak server with Spring Security. It should be possible to extend this example to also work with WebAuthn, possibly by using the [WebAuthn4J library](https://github.com/webauthn4j/webauthn4j) to perform the WebAuthn-specific device registration and authentication procedures. However, attempting to modify the code to make use of WebAuthn broke the project - currently it fails to build with dependency errors.

## Instructions

#### You need
* A running Keycloak 4 server
* Maven
* Java 8
* Yubikey device
* An appropriately configured Spring Boot application such as [this one](https://github.com/difi/dc18-webAuth)

#### Build and deploy the project
1. Clone the Git repo `git clone git@github.com:difi/dc2018-webAuth.git` or `git clone https://github.com/difi/dc2018-webAuth.git` if you don't have ssh credentials.
2. Enter the folder with `cd dc2018-webAuth`
3. Checkout this branch with `git checkout experiment-keycloak-webauthn-authenticator`
4. Make sure Keycloak is running. Verify this by entering [https://localhost:8443](https://localhost:8443).
5. Build and deploy with Maven `mvn clean install wildfly:deploy`.


#### Configure Keycloak
1. Create a realm called `Webauthn`
2. Create a client called `webauthn`
3. Make `http://localhost:8081/*` a valid redirect URI for this client.
4. Enter the Authentication page and make a copy of the browser flow. Add U2F as a required execution to this flow. 
5. Enter the Bindings tab and change Browser Flow to the new flow (Copy of browser).
6. Enter the Required Actions tab and click Register to register U2F.
7. Check Default Action for Register U2F
8. Enter the Users page and add a user called `a`.
9. Enter the Credentials tab and make the password `p`, uncheck Temporary, and click Reset Password.
10. Enter the Roles page and add a role called `user`.
11. Go back the to Users page, click View all users, click the only user there, enter the Role Mappings tab, click user in Available roles, and click Add selected.


#### Configure the Spring Boot application
1. Make sure the `application.proprties` file has the following contents:
```
#Keycloak Configuration
keycloak.auth-server-url=https://localhost:8443/auth
keycloak.realm=Webauthn
keycloak.resource=webauthn
keycloak.public-client=true
keycloak.principal-attribute=preferred_username
server.port=8081
```

#### Try it all out
1. Start the Spring Boot application with `mvn spring-boot:run`.
2. Enter `http://localost:8081` and click customers or some page you need to sign in to see.
3. Sign in with user `a` and password `p` and follow the U2F instructions.
4. Welcome to the future.

Check this related [Youtube video](https://www.youtube.com/watch?v=hKa5qMbc5u4) for similar instructions.
