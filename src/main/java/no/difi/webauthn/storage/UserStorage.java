package no.difi.webauthn.storage;

import com.webauthn4j.attestation.authenticator.AttestedCredentialData;
import no.difi.webauthn.data.User;

import java.util.HashMap;
import java.util.Optional;

import static com.webauthn4j.util.Base64UrlUtil.encodeToString;

public class UserStorage {
    private HashMap<String, User> userIdToUserMap = new HashMap<>();
    private HashMap<String, User> usernameToUserMap = new HashMap<>();

    public void addUser(User user) {
        this.userIdToUserMap.put(encodeToString(user.getId()), user);
        this.usernameToUserMap.put(user.getName(), user);
    }

    public Optional<User> getUserById(String id) {
        User result = this.userIdToUserMap.get(id);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public Optional<User> getUserById(byte[] id) {
        User result = this.userIdToUserMap.get(encodeToString(id));
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public Optional<User> getUserByUsername(String username) {
        User result = this.usernameToUserMap.get(username);
        if (result == null) return Optional.empty();
        else return Optional.of(result);
    }

    public void registerUser(byte[] tokenBindingId, AttestedCredentialData AttestedCredentialData) throws Exception {
        User user = this.getUserById(tokenBindingId).orElseThrow(Exception::new);
        user.setRegistered(true);
        user.registerAttestedCredentialData(AttestedCredentialData);
    }
}
