// getters
var getSecurityKeyName = () => (JSON.parse(window.localStorage.getItem("webauthn-device")) || {}).name;
var getSecurityKeyCreationTime = () => (JSON.parse(window.localStorage.getItem("webauthn-device")) || {}).date;
var getSecurityKeyCreationDate = () => {
  const webauthnDevice = JSON.parse(window.localStorage.getItem("webauthn-device"));
  if (webauthnDevice) {
    return new Date(webauthnDevice.date).toLocaleDateString();
  } else {
    return '';
  }
};
var getAuthType = () => window.localStorage.getItem("auth-type") || "letter";
var getPhoneNumber = () => "93282061"; // dummy value
var hasSecurityKey = () => {
  if (getSecurityKeyName() === (null || undefined)) {
    return false;
  } else {
    return true;
  }
}
var getAuthTypeHumanReadable = () => {
  switch (getAuthType()) {
    case "letter":
      return "Pinkode fra brev";
    case "sms":
      return "Kode fra SMS (" + getPhoneNumber() + ")";
    case "webauthn":
      return "Smartenhet som sikkerhetsnøkkel";
    default:
      console.log("Error: not supported auth type", getAuthType());
      return null;
  }
};
// ...

(function () {
  let $ = jQuery.noConflict();

  let updateFields = () => {
    console.log('Updating fields');
    if (window.localStorage.getItem('webauthn-device') && JSON.parse(window.localStorage.getItem('webauthn-device'))) {
      $(".securitykey-name").html(getSecurityKeyName());
      $('.securitykey-time').html(getSecurityKeyCreationTime());
      $('.securitykey-info').html(`<strong>${getSecurityKeyName()}</strong><span>, registrert ${getSecurityKeyCreationDate()}</span>`);
      // specifically input[text] needs to put this as the value instead of setting
      // the inner html
      // Yes, this is horrible
      $("input[type='text'].securitykey-name").val(getSecurityKeyName());
      $("input[type='text'].securitykey-time").val(getSecurityKeyCreationTime());
      // ...
    }
    $('.auth-type').html(getAuthTypeHumanReadable());
  };

  const renderButtons = () => {
    if (getSecurityKeyCreationTime()) {
      $('#webauthn-add-device-box').hide();
    } else {
      $('#remove-security-key-dialog').hide();
    }
  };

  const updateFieldsWithDevice = (event, data) => {
    console.log('updateFieldsWithDevice');
    console.log(data);
    if (!data) return;

    let dt = data.date;
    if (!dt) {
      console.log("ERROR: data.date not found");
      return;
    }
    if (typeof dt === "string")
      dt = new Date(Date.parse(dt)); // try to convert the data to a date
    // NOTE: The above may cause an error. This indicates a programming error.
    // It should be graciously handled, but let's not worry about it for now.

    $(".securitykey-name").html(data.name);
    $('.securitykey-time').html(dt.toISOString());
    $('.securitykey-info').html(`<strong>${getSecurityKeyName()}</strong><span>, registrert ${getSecurityKeyCreationDate()}</span>`);
    $("input[type='text'].securitykey-name").val(data.name);
    $("input[type='text'].securitykey-time").val(dt.toISOString());
  };
  const clearFields = () => {
    console.log('clearFields');
    $(".securitykey-name").html('');
    $('.securitykey-time').html('');
    $('.securitykey-info').html('');
    $("input[type='text'].securitykey-name").val('');
    $("input[type='text'].securitykey-time").val('');
  };

  // add event listener on storage change
  $(window).on('storage', e => {
    console.log("Storage changed"); // test output
    // TODO: check storage change type?
    updateFields();
  });


  // update fields on register and remove device
  $(document).on('webauthn:register-success', (event, data) => {
    updateFieldsWithDevice(event, data);
    $('#webauthn-device-info-settings').show();
    $('#add-webauthn-message').text('Smartenheten er lagt til din bruker');
    $('#remove-security-key-dialog').show();
    $('#webauthn-add-device-box').hide();
  });
  $(document).on('webauthn:remove-device', (event) => {
    clearFields(event);
    $('#webauthn-device-info-settings').hide();
    $('#add-webauthn-message').text('Smartenheten er nå fjernet');
    $('#remove-security-key-dialog').hide();
    $('#webauthn-add-device-box').show();
  });
  $(document).on('webauthn:update-device', (event, data) => {
    console.log("webauthn:update-device in update-localstorage-fields.js");
    updateFieldsWithDevice(event, data);
  });
  $(document).on('webauthn:update-auth-type', (event, data) => {
    // TODO
  });

  // update fields initially
  updateFields();
  renderButtons();
})();
