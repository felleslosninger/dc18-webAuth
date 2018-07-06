const addWebauthnDeviceMenu = () => {
  const $ = jQuery.noConflict();

  const showWebauthnDevice = (message) => {
    $('#webauthn-added-device').toggle();
    if (message) {
      $('#add-webauthn-message').show();
      $('#add-webauthn-message').text(message);
    } else {
      $('#add-webauthn-message').hide();
    }
    $('#webauthn-hide-warning').toggle();
    $('#webauthn-add-device-box').toggle();
  };

  $(document).on('webauthn:register-success', (event) => {
    event.preventDefault();
    showWebauthnDevice('Smartenheten er registrert');
  });

  $(document).on('webauthn:prompt-user-presence', (event) => {
    event.preventDefault();
    $('#add-webauthn-message').show();
    $('#add-webauthn-message').text('Trykk på smartenheten');
  });


  $('#undo-webauthn-device-btn').on('click', (event) => {
    $(document).trigger('webauthn:remove-device', {});
    $('#webauthn-hide-warning').toggle();
    $('#add-webauthn-message').show();
    $('#add-webauthn-message').text('Smartenheten er fjernet');
    $('#webauthn-added-device').toggle();
    $('#add-devices-controls').toggle();
    $('#webauthn-add-device-box').toggle();
  });


  const webauthnDevice = JSON.parse(window.localStorage.getItem('webauthn-device'));
  if (webauthnDevice) {
    showWebauthnDevice();
  }
};


addWebauthnDeviceMenu();
