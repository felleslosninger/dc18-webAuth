package com.webauthn4j.serverconverter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.webauthn4j.data.RegisterChallengeResponse;

import java.io.IOException;

public class ResponseDeserializer extends JsonDeserializer<RegisterChallengeResponse> {
    @Override
    public RegisterChallengeResponse deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        ObjectCodec codec = p.getCodec();
        JsonNode node = codec.readTree(p);
        return new RegisterChallengeResponse(
                node.get("id").asText(),
                node.get("response").get("clientDataJSON").asText(),
                node.get("response").get("attestationObject").asText()
        );
    }
}
