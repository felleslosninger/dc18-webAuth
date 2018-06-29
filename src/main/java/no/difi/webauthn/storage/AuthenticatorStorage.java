package no.difi.webauthn.storage;

import com.webauthn4j.authenticator.Authenticator;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static com.webauthn4j.util.Base64UrlUtil.encodeToString;

public class AuthenticatorStorage {
    private Map<String, Authenticator> AuthenticatorMap = new HashMap<>();

    public Optional<Authenticator> getAuthenticatorById(String id) {
        Authenticator result = this.AuthenticatorMap.get(id);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public Optional<Authenticator> getAuthenticatorById(byte[] id) {
        return this.getAuthenticatorById(encodeToString(id));
    }

    public void addAuthenticator(Authenticator authenticator) {
        this.AuthenticatorMap.put(encodeToString(authenticator.getAttestedCredentialData().getCredentialId()), authenticator);
    }
}
