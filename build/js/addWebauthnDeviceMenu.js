const addWebauthnDeviceMenu = () => {
  const $ = jQuery.noConflict();

  $(document).on('webauthn:register-success', (event) => {
    event.preventDefault();
    $('#webauthn-added-device').toggle();
    $('#add-webauthn-message').show();
    $('#add-webauthn-message').text('Smartenheten er registrert');
    $('#webauthn-hide-warning').toggle();
    $('#webauthn-add-device-box').toggle();
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
};


addWebauthnDeviceMenu();
