package com.webauthn4j.data;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.webauthn4j.serverconverter.ResponseDeserializer;

@JsonDeserialize(using = ResponseDeserializer.class)
public class RegisterChallengeResponse {
    private String id;
    private String clientDataJSON;
    private String attestationObject;

    public String getId() {
        return id;
    }

    public String getClientDataJSON() {
        return clientDataJSON;
    }

    public String getAttestationObject() {
        return attestationObject;
    }

    public RegisterChallengeResponse(String id, String clientDataJSON, String attestationObject) {
        this.id = id;
        this.clientDataJSON = clientDataJSON;
        this.attestationObject = attestationObject;
    }

    @Override
    public String toString() {
        return "RegisterChallengeResponse{" +
                "id='" + id + '\'' +
                ", clientDataJSON='" + clientDataJSON + '\'' +
                ", attestationObject='" + attestationObject + '\'' +
                '}';
    }
}
