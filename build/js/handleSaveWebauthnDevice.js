const handleSaveWebauthnDevice = () => {
  const $ = jQuery.noConflict();

  /**
   * Triggers an event that updates
   */
  $('#webauthn-device-form').on('submit', (event) => {
    console.log('#webauthn-device-form::submit');
    const newDeviceName = $('.securitykey-name').val();
    const deviceObject = JSON.parse(window.localStorage.getItem('webauthn-device') || '');
    if (newDeviceName && deviceObject) {
      $(document).trigger('webauthn:update-device', {
        ...deviceObject,
        name: newDeviceName,
      });
    }
  });
};


handleSaveWebauthnDevice();
