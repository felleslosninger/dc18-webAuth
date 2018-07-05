// getters
var getSecurityKeyName = () => (JSON.parse(window.localStorage.getItem("webauthn-device")) || {}).name;
var getSecurityKeyCreationTime = () => (JSON.parse(window.localStorage.getItem("webauthn-device")) || {}).date;
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
      let ret = "Smartenhet som sikkerhetsnøkkel";
      let keyname = getSecurityKeyName();
      if (keyname)
        ret += " (" + keyname + ")";
      return ret;
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
    $(".securitykey-name").html(getSecurityKeyName());
    $('.securitykey-time').html(getSecurityKeyCreationTime());
    // specifically input[text] needs to put this as the value instead of setting
    // the inner html
    // Yes, this is horrible
    $("input[type='text'].securitykey-name").val(getSecurityKeyName());
    $("input[type='text'].securitykey-time").val(getSecurityKeyCreationTime());
    $('.auth-type').html(getAuthTypeHumanReadable());
    // ...
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
    $(".securitykey-name").html(data.name);
    $('.securitykey-time').html(data.date.toISOString());
    $("input[type='text'].securitykey-name").val(data.name);
    $("input[type='text'].securitykey-time").val(data.date.toISOString());
  };
  const clearFields = () => {
    console.log('clearFields');
    $(".securitykey-name").html('');
    $('.securitykey-time').html('');
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
    $('#add-webauthn-message').text('Smartenheten er lagt til din bruker');
    $('#remove-security-key-dialog').show();
    $('#webauthn-add-device-box').hide();
  });
  $(document).on('webauthn:remove-device', (event) => {
    clearFields(event);
    $('#add-webauthn-message').text('Smartenheten er nå fjernet');
    $('#remove-security-key-dialog').hide();
    $('#webauthn-add-device-box').show();
  });

  // update fields initially
  updateFields();
  renderButtons();
})();
