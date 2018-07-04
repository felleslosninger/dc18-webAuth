const addWebauthnDeviceMenu = () => {
  const $ = jQuery.noConflict();

  $(document).on('webauthn:register-success', (event) => {
    event.preventDefault();
    $('#webauthn-added-device').toggle();
    $('#add-webauthn-message').show();
    $('#add-webauthn-message').text('Smartenheten er nå lagt til din bruker');
    $('#webauthn-hide-warning').toggle();
    $('#webauthn-add-device-box').toggle();
  });


  $('#undo-webauthn-device-btn').on('click', (event) => {
    event.preventDefault();
    $(document).trigger('webauthn:remove-device', {});
    $('#webauthn-hide-warning').toggle();
    $('#add-webauthn-message').show();
    $('#add-webauthn-message').text('Smartenheten er fjernet');
    $('#webauthn-added-device').toggle();
    $('#webauthn-add-device-box').toggle();
  });
};


addWebauthnDeviceMenu();
