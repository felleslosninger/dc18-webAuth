package com.webauthn4j.test.client;

import com.webauthn4j.client.ClientDataType;
import com.webauthn4j.client.CollectedClientData;
import com.webauthn4j.test.TestUtil;

public class RegistrationEmulationOption {

    private boolean signatureOverrideEnabled = false;
    private byte[] signature = new byte[]{0x01, 0x23, 0x45, 0x67};
    private boolean collectedClientDataOverrideEnabled = false;
    private CollectedClientData collectedClientData = TestUtil.createClientData(ClientDataType.CREATE);

    public boolean isSignatureOverrideEnabled() {
        return signatureOverrideEnabled;
    }

    public void setSignatureOverrideEnabled(boolean signatureOverrideEnabled) {
        this.signatureOverrideEnabled = signatureOverrideEnabled;
    }

    public byte[] getSignature() {
        return signature;
    }

    public void setSignature(byte[] signature) {
        this.signature = signature;
    }

    public boolean isCollectedClientDataOverrideEnabled() {
        return collectedClientDataOverrideEnabled;
    }

    public void setCollectedClientDataOverrideEnabled(boolean collectedClientDataOverrideEnabled) {
        this.collectedClientDataOverrideEnabled = collectedClientDataOverrideEnabled;
    }

    public CollectedClientData getCollectedClientData() {
        return collectedClientData;
    }

    public void setCollectedClientData(CollectedClientData collectedClientData) {
        this.collectedClientData = collectedClientData;
    }
}
