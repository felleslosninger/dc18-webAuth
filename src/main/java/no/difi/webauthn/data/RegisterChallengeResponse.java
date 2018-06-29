package no.difi.webauthn.data;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import no.difi.webauthn.converter.ResponseDeserializer;

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
