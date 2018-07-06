const localStorage = () => {
    const $ = jQuery.noConflict();

    /**
     * Saves a Webauthn device to local storage.
     */
    $(document).on('webauthn:register-success', (event, data) => {
        console.log('webauthn:register-success in localStorage.js');
        window.localStorage.setItem("webauthn-device", JSON.stringify(data));
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

    /**
     * Function to be called after the Webauthn device is removed.
     */
    const resetPreferredAuthType = () => {
        window.localStorage.removeItem('auth-type');
    };

    /**
     * Function normalizing event data.
     */
    const normalizeWebAuthnDeviceData = data => {
        if (!data)
          return {error: "Device data not found"};
        if (!data.name)
          return {error: "Device name not in data"};
        if (!data.date)
          return {error: "Device registration date not in data"};
        let dt = data.date;
        if (typeof dt === "string") {
          dt = Date.parse(data.date)
          if (!dt)
            return {error: "Device registration date not in valid date format:" +
                " non-parseable string"};
        }
        else if (dt instanceof Date) {
            dt = dt.getTime();
        }
        else if (typeof dt !== "number") {
            return {error: "Device registration date not in valid date format:" +
                " not a date string, date object or timestamp"};
        }
        return {name: data.name, date: new Date(dt)};
    };
};

localStorage();
