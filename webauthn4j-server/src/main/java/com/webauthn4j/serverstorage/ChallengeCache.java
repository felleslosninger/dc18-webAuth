package com.webauthn4j.serverstorage;

import com.webauthn4j.client.challenge.Challenge;
import com.webauthn4j.data.PublicKeyScheme;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.webauthn4j.util.Base64UrlUtil.encodeToString;

public class ChallengeCache {
    private Map<String, Challenge> challengeMap = new HashMap<>();

    public Optional<Challenge> getChallengeByUserId(String userId) {
        Challenge result = this.challengeMap.get(userId);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public void addChallenge(PublicKeyScheme publicKeyScheme) {
        this.challengeMap.put(encodeToString(publicKeyScheme.getUser().getId()), publicKeyScheme.getChallenge());
    }
}
