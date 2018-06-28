package com.webauthn4j.serverstorage;

import com.webauthn4j.client.challenge.Challenge;
import com.webauthn4j.server.ServerProperty;
import com.webauthn4j.data.PublicKeyScheme;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.webauthn4j.util.Base64UrlUtil.encodeToString;

public class ServerPropertyCache {
    private Map<String, ServerProperty> ServerPropertyMap = new HashMap<>();

    public Optional<ServerProperty> getServerPropertyByUserId(byte[] decodedUserId) {
        String encodedUserId = encodeToString(decodedUserId);
        ServerProperty result = this.ServerPropertyMap.get(encodedUserId);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }
    public Optional<ServerProperty> getServerPropertyByUserId(String userId) {
        ServerProperty result = this.ServerPropertyMap.get(userId);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }
    public Optional<ServerProperty> getServerPropertyByChallenge(Challenge challenge) {
        ServerProperty result = this.ServerPropertyMap.get(encodeToString(challenge.getValue()));
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public void addServerProperty(ServerProperty serverProperty) {
        this.ServerPropertyMap.put(encodeToString(serverProperty.getTokenBindingId()), serverProperty);
        this.ServerPropertyMap.put(encodeToString(serverProperty.getChallenge().getValue()), serverProperty);
    }
}
