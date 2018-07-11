const localStorage = () => {
    const $ = jQuery.noConflict();

    /**
     * Saves a Webauthn device to local storage.
     */
    $(document).on('webauthn:register-success', (event, data) => {
        console.log('webauthn:register-success in localStorage.js');
        window.localStorage.setItem("webauthn-device", JSON.stringify(data));

        // For the best user experience, ensure that the 2FA type is webauthn
        // after just registering device, since usually when registering a
        // device it's because you wanna use it
        selectWebAuthnPreferredAuthType();
        console.log('newly registered webauthn device set as preferred ' +
            '2nd factor authentication');
    });

    /**
     * Removes the Webauthn device from local storage and changes settings so that Webauthn is not the preferred 2fa.
     */
    $(document).on('webauthn:remove-device', (event) => {
        event.preventDefault();
        window.localStorage.removeItem('webauthn-device');
        console.log('webauthn-device cleared from local storage');
        resetPreferredAuthType();
    });

    $(document).on('webauthn:update-device', (event, data) => {
        console.log('webauthn:update-device in localStorage.js');
        let norm = normalizeWebAuthnDeviceData(data);
        if (norm.error) {
            console.log("ERROR updating device: data not in compatible format");
            console.log("Error message:", error);
        }
        window.localStorage.setItem("webauthn-device", JSON.stringify(norm));
    });

    $(document).on('redirect:create-referrer', (event, data) => {
        console.log('redirect:create-referrer in localStorage.js');
        console.log("Setting referrer of " + data.referree + " to " + data.refererrer);
        window.localStorage.setItem("referrer:" + data.referree, data.referrer);
    });

    $(document).on('redirect:remove-referrer', (event, data) => {
        console.log('redirect:remove-referrer in localStorage.js');
        console.log("Removing referrer of " + data);
        window.localStorage.removeItem("referrer:" + data);
    });

    $(document).on('auth-type:set', (event, data) => {
        console.log('auth-type:set in localStorage.js');
        console.log("Setting auth-type to " + data);
        window.localStorage.setItem('auth-type', data);
    });

    $(document).on('auth-type:remove', (event) => {
        console.log('auth-type:remove in localStorage.js')
        console.log("Resetting auth-type to default");
        window.localStorage.removeItem('auth-type');
    });

    /**
     * Function to be called after the Webauthn device is removed.
     */
    const resetPreferredAuthType = () => {
        // if auth-type is not webauthn, do not modify, because it would be
        // confusing to the user if, for instance, their second factor
        // authentication type changed from SMS to letter PIN codes when
        // removing the unrelated WebAuthn device
        if (window.localStorage.getItem('auth-type') === 'webauthn')
            window.localStorage.removeItem('auth-type');
    };

    /**
     * Function to be called after the Webauthn device has been registered.
     */
    const selectWebAuthnPreferredAuthType = () => {
        window.localStorage.setItem('auth-type', 'webauthn');
    };

    /**
     * Function normalizing event data.
     */
    const normalizeWebAuthnDeviceData = data => {
        if (!data)
            return { error: "Device data not found" };
        if (!data.name)
            return { error: "Device name not in data" };
        if (!data.date)
            return { error: "Device registration date not in data" };
        let dt = data.date;
        if (typeof dt === "string") {
            dt = Date.parse(data.date)
            if (!dt)
                return {
                    error: "Device registration date not in valid date format:" +
                        " non-parseable string"
                };
        } else if (dt instanceof Date) {
            dt = dt.getTime();
        } else if (typeof dt !== "number") {
            return {
                error: "Device registration date not in valid date format:" +
                    " not a date string, date object or timestamp"
            };
        }
        return { name: data.name, date: new Date(dt) };
    };
};

localStorage();