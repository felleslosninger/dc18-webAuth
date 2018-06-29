package com.webauthn4j;

import static spark.Spark.*;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.google.gson.Gson;
import com.webauthn4j.attestation.AttestationObject;
import com.webauthn4j.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.authenticator.Authenticator;
import com.webauthn4j.authenticator.AuthenticatorImpl;
import com.webauthn4j.client.CollectedClientData;
import com.webauthn4j.client.Origin;
import com.webauthn4j.client.challenge.Challenge;
import com.webauthn4j.client.challenge.DefaultChallenge;
import com.webauthn4j.converter.AttestationObjectConverter;
import com.webauthn4j.converter.CollectedClientDataConverter;
import com.webauthn4j.converter.jackson.ObjectMapperUtil;
import com.webauthn4j.data.PublicKeyScheme;
import com.webauthn4j.data.RegisterChallengeResponse;
import com.webauthn4j.data.RelyingParty;
import com.webauthn4j.data.User;
import com.webauthn4j.server.ServerProperty;
import com.webauthn4j.serverconverter.AttestedCredentialDataSerializer;
import com.webauthn4j.serverstorage.AuthenticatorStorage;
import com.webauthn4j.serverstorage.ServerPropertyCache;
import com.webauthn4j.serverstorage.UserStorage;
import com.webauthn4j.util.Base64UrlUtil;
import com.webauthn4j.validator.WebAuthnAuthenticationContextValidator;
import com.webauthn4j.validator.WebAuthnRegistrationContextValidator;
import org.apache.http.entity.ContentType;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

import java.nio.ByteBuffer;
import java.util.UUID;

public class SparkServer {
    private static AttestationObjectConverter attestationObjectConverter = new AttestationObjectConverter();
    private static CollectedClientDataConverter collectedClientDataConverter = new CollectedClientDataConverter();
    private static Gson gson = new Gson();
    private static ObjectMapper mapper = ObjectMapperUtil.createWebAuthnClassesAwareJSONMapper();
    private static SimpleModule module = new SimpleModule();
    private static ServerPropertyCache serverPropertyCache = new ServerPropertyCache();
    private static UserStorage userStorage = new UserStorage();
    private static AuthenticatorStorage authenticatorStorage = new AuthenticatorStorage();
    private static Origin origin = new Origin("https://localhost:3000");


    public static void main(String[] args) {
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
        module.addSerializer(AttestedCredentialData.class, new AttestedCredentialDataSerializer());
        mapper.registerModule(module);
        Spark.secure(
                "webauthn4j.jks",
                "dificamp",
                null,
                null
        );
        enableCORS("https://localhost:3000", "POST", "Content-Type");
        get("/hello", (req, res) -> "Hello world");

        get("/options", (req, res) -> {
            return "-hei";
        });
        post("/register", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            JsonNode requestBodyTree = mapper.readTree(req.body());

            byte[] tokenBindingId = getRandomUUIDBytes();
            Challenge challenge = new DefaultChallenge();
            User user = new User(requestBodyTree.get("username").asText(), requestBodyTree.get("displayName").asText(), tokenBindingId);

            ServerProperty serverProperty = new ServerProperty(
                    origin,
                    origin.getHost(),
                    challenge,
                    tokenBindingId
            );
            PublicKeyScheme publicKeyScheme = new PublicKeyScheme(
                    new RelyingParty("difi.no"),
                    user,
                    PublicKeyScheme.getDefaultPubKeyCredParams(),
                    challenge
            );
            userStorage.addUser(user);
            serverPropertyCache.addServerProperty(serverProperty);

            return publicKeyScheme;
        }, mapper::writeValueAsString);
        post("/register/finish", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());


            JsonNode requestBodyTree = mapper.readTree(req.body());
            System.out.println(requestBodyTree);
            RegisterChallengeResponse registerChallengeResponse = mapper.readValue(req.body(), RegisterChallengeResponse.class);
            System.out.println(registerChallengeResponse);

            CollectedClientData collectedClientData = collectedClientDataConverter.convert(registerChallengeResponse.getClientDataJSON());
            AttestationObject attestationObject = attestationObjectConverter.convert(registerChallengeResponse.getAttestationObject());
            ServerProperty serverProperty = serverPropertyCache.getServerPropertyByChallenge(collectedClientData.getChallenge()).orElseThrow(Exception::new);
            System.out.println(collectedClientData);
            System.out.println(attestationObject);
            WebAuthnRegistrationContext registrationContext = new WebAuthnRegistrationContext(
                    collectedClientDataConverter.convertToBytes(collectedClientData),
                    attestationObjectConverter.convertToBytes(attestationObject),
                    serverProperty,
                    false
            );
            WebAuthnRegistrationContextValidator webAuthnRegistrationContextValidator =
                    WebAuthnRegistrationContextValidator.createNullAttestationStatementValidator();
            webAuthnRegistrationContextValidator.validate(registrationContext);

            userStorage.registerUser(serverProperty.getTokenBindingId(), attestationObject.getAuthenticatorData().getAttestedCredentialData());

            Authenticator authenticator = new AuthenticatorImpl(
                    attestationObject.getAuthenticatorData().getAttestedCredentialData(),
                    attestationObject.getAttestationStatement(),
                    0
            );
            authenticatorStorage.addAuthenticator(authenticator);


            return registrationContext;
        }, mapper::writeValueAsString);
        /*
        options("/*", (req, res) -> {
            System.out.println("OPTIONS REQUEST!!!");
            res.header("Access-Control-Allow-Origin", "https://localhost:3000");
            res.header("Access-Control-Request-Method", "POST");
            return res.raw();
        });
        */
        post("/authenticate", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            JsonNode requestBodyTree = mapper.readTree(req.body());

            String username = requestBodyTree.get("username").asText();
            User user = userStorage.getUserByUsername(username).orElseThrow(Exception::new);

            Challenge challenge = new DefaultChallenge();
            ServerProperty serverProperty = new ServerProperty(
                    origin,
                    origin.getHost(),
                    challenge,
                    user.getId()
            );
            PublicKeyScheme publicKeyScheme = new PublicKeyScheme(
                    new RelyingParty("difi.no"),
                    user,
                    PublicKeyScheme.getDefaultPubKeyCredParams(),
                    challenge
            );
            publicKeyScheme.setAttestedCredentialDatas(user.getAttestedCredentialDatas());
            serverPropertyCache.addServerProperty(serverProperty);

            return publicKeyScheme;
        }, mapper::writeValueAsString);

        post("/authenticate/finish", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            JsonNode requestBodyTree = mapper.readTree(req.body());
            String credentialId = requestBodyTree.get("id").asText();
            String clientDataJSON = requestBodyTree.get("response").get("clientDataJSON").asText();
            String signature = requestBodyTree.get("response").get("signature").asText();
            String authenticatorData = requestBodyTree.get("response").get("authenticatorData").asText();

            CollectedClientData collectedClientData = collectedClientDataConverter.convert(requestBodyTree
                    .get("response")
                    .get("clientDataJSON")
                    .asText());

            ServerProperty serverProperty = serverPropertyCache.getServerPropertyByChallenge(collectedClientData.getChallenge()).orElseThrow(Exception::new);

            WebAuthnAuthenticationContext webAuthnAuthenticationContext = new WebAuthnAuthenticationContext(
                    Base64UrlUtil.decode(credentialId),
                    Base64UrlUtil.decode(clientDataJSON),
                    Base64UrlUtil.decode(authenticatorData),
                    Base64UrlUtil.decode(signature),
                    serverProperty,
                    false
            );
            Authenticator authenticator = authenticatorStorage.getAuthenticatorById(credentialId).orElseThrow(Exception::new);

            WebAuthnAuthenticationContextValidator webAuthnAuthenticationContextValidator = new WebAuthnAuthenticationContextValidator();
            try {
                webAuthnAuthenticationContextValidator.validate(webAuthnAuthenticationContext, authenticator);
                return userStorage.getUserById(serverProperty.getTokenBindingId()).orElseThrow(Exception::new);
            } catch (Exception exc) {
                res.status(418);
                exc.printStackTrace();
                return exc;
            }
        }, mapper::writeValueAsString);


    }

    private static byte[] getRandomUUIDBytes() {
        UUID uuid = UUID.randomUUID();
        long hi = uuid.getMostSignificantBits();
        long lo = uuid.getLeastSignificantBits();
        return ByteBuffer.allocate(16).putLong(hi).putLong(lo).array();
    }

    private static void enableCORS(final String origin, final String methods, final String headers) {
        before(new Filter() {
            @Override
            public void handle(Request request, Response response) {
                System.out.println("Handle before!");
                response.header("Access-Control-Allow-Origin", origin);
                response.header("Access-Control-Request-Method", methods);
                response.header("Access-Control-Allow-Headers", headers);
                response.header("Accept", "*/*");
            }
        });
    }
}
