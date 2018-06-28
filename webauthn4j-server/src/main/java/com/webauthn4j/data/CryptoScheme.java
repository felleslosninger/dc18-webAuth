package com.webauthn4j.data;

public class CryptoScheme {
    private long alg;
    private String type;

    public CryptoScheme(long alg, String type) {
        this.alg = alg;
        this.type = type;
    }

    public CryptoScheme(long alg) {
        this.alg = alg;
        this.type = "public-key";
    }
}
