package com.webauthn4j;

import static spark.Spark.*;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.webauthn4j.attestation.AttestationObject;
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
import com.webauthn4j.serverstorage.ChallengeCache;
import com.webauthn4j.serverstorage.ServerPropertyCache;
import com.webauthn4j.util.Base64UrlUtil;
import com.webauthn4j.validator.WebAuthnRegistrationContextValidator;
import org.apache.http.entity.ContentType;
import spark.Filter;
import spark.Request;
import spark.Response;
import spark.Spark;

public class SparkServer {
    private static AttestationObjectConverter attestationObjectConverter = new AttestationObjectConverter();
    private static CollectedClientDataConverter collectedClientDataConverter = new CollectedClientDataConverter();
    private static Gson gson = new Gson();
    private static ObjectMapper mapper = ObjectMapperUtil.createWebAuthnClassesAwareJSONMapper();
    private static ChallengeCache challengeCache = new ChallengeCache();
    private static ServerPropertyCache serverPropertyCache = new ServerPropertyCache();
    private static Origin origin = new Origin("https://localhost:3000");


    public static void main(String[] args) {
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
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
        get("/test", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            Challenge challenge = new DefaultChallenge();
            ServerProperty serverProperty = new ServerProperty(
                    origin,
                    "difi.no",
                    challenge,
                    Base64UrlUtil.decode("difi")
            );
            return new PublicKeyScheme(
                    new RelyingParty("difi.no"),
                    new User("difi", "difi", serverProperty.getTokenBindingId()),
                    PublicKeyScheme.getDefaultPubKeyCredParams(),
                    challenge
            );
        }, mapper::writeValueAsString);
        post("/test", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            Challenge challenge = new DefaultChallenge();
            ServerProperty serverProperty = new ServerProperty(
                    origin,
                    origin.getHost(),
                    challenge,
                    Base64UrlUtil.decode("difi")
            );
            return new PublicKeyScheme(
                    new RelyingParty("difi.no"),
                    new User("difi", "difi", serverProperty.getTokenBindingId()),
                    PublicKeyScheme.getDefaultPubKeyCredParams(),
                    challenge
            );
        }, mapper::writeValueAsString);
        post("/register", (req, res) -> {
            res.type(ContentType.APPLICATION_JSON.toString());
            Challenge challenge = new DefaultChallenge();
            ServerProperty serverProperty = new ServerProperty(
                    origin,
                    origin.getHost(),
                    challenge,
                    Base64UrlUtil.decode("difi")
            );
            PublicKeyScheme publicKeyScheme = new PublicKeyScheme(
                    new RelyingParty("difi.no"),
                    new User("difi", "difi", serverProperty.getTokenBindingId()),
                    PublicKeyScheme.getDefaultPubKeyCredParams(),
                    challenge
            );
            challengeCache.addChallenge(publicKeyScheme);
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
            System.out.println(collectedClientData);
            System.out.println(attestationObject);
            WebAuthnRegistrationContext registrationContext = new WebAuthnRegistrationContext(
                    collectedClientDataConverter.convertToBytes(collectedClientData),
                    attestationObjectConverter.convertToBytes(attestationObject),
                    serverPropertyCache.getServerPropertyByChallenge(collectedClientData.getChallenge()).orElseThrow(Exception::new),
                    false
            );
            WebAuthnRegistrationContextValidator webAuthnRegistrationContextValidator =
                    WebAuthnRegistrationContextValidator.createNullAttestationStatementValidator();
            webAuthnRegistrationContextValidator.validate(registrationContext);
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
