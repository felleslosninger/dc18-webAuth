const handleSaveWebauthnDevice = () => {
  const $ = jQuery.noConflict();

  /**
   * Save Webauthn device name to localstorage on form submit.
   */
  $('#webauthn-device-form').on('submit', (event) => {
    console.log('#webauthn-device-form::submit');
    const newDeviceName = $('.securitykey-name').val();
    const deviceObject = JSON.parse(window.localStorage.getItem('webauthn-device') || '');
    if (newDeviceName && deviceObject) {
      window.localStorage.setItem('webauthn-device', JSON.stringify({
        ...deviceObject,
        name: newDeviceName,
      }));
    }
  });
};


handleSaveWebauthnDevice();
