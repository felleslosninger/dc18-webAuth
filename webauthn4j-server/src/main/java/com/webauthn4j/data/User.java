package com.webauthn4j.data;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webauthn4j.attestation.authenticator.AttestedCredentialData;

import java.util.ArrayList;
import java.util.List;

public class User {
    private String name;
    private String displayName;
    private byte[] id;
    @JsonIgnore
    private boolean isRegistered = false;
    @JsonIgnore
    private List<AttestedCredentialData> AttestedCredentialDatas = new ArrayList<>();


    public User(String name, String displayName, byte[] id) {
        this.name = name;
        this.displayName = displayName;
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public byte[] getId() {
        return id;
    }

    public boolean isRegistered() {
        return isRegistered;
    }

    public void setRegistered(boolean registered) {
        isRegistered = registered;
    }

    public void registerAttestedCredentialData(AttestedCredentialData AttestedCredentialData) {
        this.AttestedCredentialDatas.add(AttestedCredentialData);
    }

    @JsonIgnore
    public List<AttestedCredentialData> getAttestedCredentialDatas() {
        return this.AttestedCredentialDatas;
    }
}
