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

  /**
   * Function to be called after the Webauthn device is removed.
   */
  const resetPreferredAuthType = () => {
    window.localStorage.removeItem('auth-type');
  };

};

localStorage();
