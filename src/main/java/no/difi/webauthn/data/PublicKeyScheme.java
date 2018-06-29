package no.difi.webauthn.data;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.webauthn4j.attestation.authenticator.AttestedCredentialData;
import com.webauthn4j.client.challenge.Challenge;
import com.webauthn4j.client.challenge.DefaultChallenge;

import java.util.Arrays;
import java.util.List;

public class PublicKeyScheme {
    private RelyingParty rp;
    private User user;
    private List<CryptoScheme> pubKeyCredParams;
    private Challenge challenge;
    @JsonIgnore
    private List<AttestedCredentialData> AttestedCredentialDatas;


    public PublicKeyScheme(RelyingParty rp, User user, List<CryptoScheme> pubKeyCredParams, Challenge challenge) {
        this.rp = rp;
        this.user = user;
        this.pubKeyCredParams = pubKeyCredParams;
        this.challenge = challenge;
    }


    public PublicKeyScheme() {
        this.rp = new RelyingParty("difi");
        this.user = new User("per", "per", new byte[]{0, 0, 0});
        this.pubKeyCredParams = PublicKeyScheme.getDefaultPubKeyCredParams();
        this.challenge = new DefaultChallenge();
    }

    public static List<CryptoScheme> getDefaultPubKeyCredParams() {
        return Arrays.asList(new CryptoScheme(-7L), new CryptoScheme(-257L));
    }


    public RelyingParty getRp() {
        return rp;
    }

    public User getUser() {
        return user;
    }

    public List<CryptoScheme> getPubKeyCredParams() {
        return pubKeyCredParams;
    }

    public Challenge getChallenge() {
        return challenge;
    }

    public void setAttestedCredentialDatas(List<AttestedCredentialData> AttestedCredentialDatas) {
        this.AttestedCredentialDatas = AttestedCredentialDatas;
    }

    @JsonProperty("allowCredentials")
    public List<AttestedCredentialData> getAttestedCredentialDatas() {
        return AttestedCredentialDatas;
    }
}
