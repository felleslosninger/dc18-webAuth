package no.difi.webauthn.converter;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.webauthn4j.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.util.Base64UrlUtil;

import java.io.IOException;

public class AttestedCredentialDataSerializer extends JsonSerializer<AttestedCredentialData> {
    @Override
    public void serialize(AttestedCredentialData value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("id", Base64UrlUtil.encodeToString(value.getCredentialId()));
        gen.writeStringField("type", "public-key");
        gen.writeEndObject();
    }
}
