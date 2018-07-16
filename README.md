# Experimental branch: Spark WebAuthn Server using WebAuthn4J

**NOTE**: This branch is based on [Yoshikazu Nojima's webauthn4j](https://github.com/webauthn4j/webauthn4j). It attempts to build a Spark server for WebAuthn authentication on top of it. It's supposed to share a common history with experiment-webauthn4j-spark-server-1, but due to problems with git when importing the code, this didn't turn out to be the case, and merging them at this point creates conflicts I'm not sure how to solve.

## Goal

This is an attempt to build a Spark server directly on top of the WebAuthn4J library, in order to correctly interface with the React client in the experiment-react-webauthn-client branch (and later, the experiment-webauthn4j-spark-server-1 branch). It aims to extend the generic WebAuthn4J library with server-specific code that utilizes the library in authentication.

## Status

I don't know the status of this branch, since it doesn't seem to share a history with the other Spark server branch despite coming from [the same origin](https://github.com/viktorfa/webauthn4j-spark-demo). However, the other Spark server seems to be working together with the React app.

This code is preserved merely as a documentation of a dead end, as well as a record of code related to the Spark server and WebAuthn4J in case it should be needed.

**NOTE:** Below follows the README from WebAuthn4J, preserved in case it might be useful.

# WebAuthn4J

[![Build Status](https://travis-ci.org/webauthn4j/webauthn4j.svg?branch=master)](https://travis-ci.org/webauthn4j/webauthn4j)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=webauthn4j&metric=coverage)](https://sonarcloud.io/dashboard?id=webauthn4j)
[![Build Status](https://img.shields.io/maven-central/v/com.webauthn4j/webauthn4j-core.svg)](https://search.maven.org/#search%7Cga%7C1%7Cwebauthn4j)
[![license](https://img.shields.io/github/license/webauthn4j/webauthn4j.svg)](https://github.com/webauthn4j/webauthn4j/blob/master/LICENSE.txt)


A portable Java library for WebAuthn assertion and attestation verification

**This library hasn't reached version 1. Design may change.**

## Documentation

You can find out more details from the [reference](https://webauthn4j.github.io/webauthn4j/en/).

## Getting from Maven Central

If you are using Maven, just add the webauthn4j as a dependency:

```xml
<properties>
  ...
  <!-- Use the latest version whenever possible. -->
  <webauthn4j.version>0.6.3.RELEASE</webauthn4j.version>
  ...
</properties>

<dependencies>
  ...
  <dependency>
    <groupId>com.webauthn4j</groupId>
    <artifactId>webauthn4j.core</artifactId>
    <version>${webauthn4j.version}</version>
  </dependency>
  ...
</dependencies>
```


## Build from source

WebAuthn4J uses a Gradle based build system.
In the instructions below, `gradlew` is invoked from the root of the source tree and serves as a cross-platform,
self-contained bootstrap mechanism for the build.

### Prerequisites

- Java8 or later

### Checkout sources

```
git clone https://github.com/webauthn4j/webauthn4j
```

### Build all jars

```
./gradlew build
```

## How to use

Verification on registration
```java 
// Client properties
byte[] clientDataJSON    = null /* set clientDataJSON */;
byte[] attestationObject = null /* set attestationObject */;

// Server properties
Origin origin          = null /* set origin */;
String rpId            = null /* set rpId */;
Challenge challenge    = null /* set challenge */;
byte[] tokenBindingId  = null /* set tokenBindingId */;
ServerProperty serverProperty = new ServerProperty(origin, rpId, challenge, tokenBindingId);

WebAuthnRegistrationContext registrationContext = new WebAuthnRegistrationContext(clientDataJSON, attestationObject, serverProperty, false);

WebAuthnRegistrationContextValidator webAuthnRegistrationContextValidator =
        WebAuthnRegistrationContextValidator.createNullAttestationStatementValidator();

webAuthnRegistrationContextValidator.validate(registrationContext);
```

Verification on authentication
```java 
// Client properties
byte[] credentialId      = null /* set credentialId */;
byte[] clientDataJSON    = null /* set clientDataJSON */;
byte[] authenticatorData = null /* set authenticatorData */;
byte[] signature = null /* set signature */;

// Server properties
Origin origin          = null /* set origin */;
String rpId            = null /* set rpId */;
Challenge challenge    = null /* set challenge */;
byte[] tokenBindingId  = null /* set tokenBindingId */;
ServerProperty serverProperty = new ServerProperty(origin, rpId, challenge, tokenBindingId);

WebAuthnAuthenticationContext authenticationContext =
        new WebAuthnAuthenticationContext(
                credentialId,
                clientDataJSON,
                authenticatorData,
                signature,
                serverProperty,
                true
        );
Authenticator authenticator = null /* set authenticator */;

WebAuthnAuthenticationContextValidator webAuthnAuthenticationContextValidator =
        new WebAuthnAuthenticationContextValidator();

webAuthnAuthenticationContextValidator.validate(authenticationContext, authenticator);
```

## Sample application

Spring Security WebAuthn is built on the top of WebAuthn4J. 
Please see [Spring Security WebAuthn sample application](https://github.com/ynojima/spring-security-webauthn).

## License

WebAuthn4J is Open Source software released under the
[Apache 2.0 license](http://www.apache.org/licenses/LICENSE-2.0.html).
