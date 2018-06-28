package com.webauthn4j.data;

public class User {
    private String name;
    private String displayName;
    private byte[] id;


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
}
