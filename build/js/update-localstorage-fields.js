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

(function() {
    let $ = jQuery.noConflict();

    let updateFields = () => {
        $(".securitykey-name").html(getSecurityKeyName());
        $('.securitykey-time').html(getSecurityKeyCreationTime());
        // specifically input[text] needs to put this as the value instead of setting
        // the inner html
        // Yes, this is horrible
        $("input[type='text'].securitykey-name").val(getSecurityKeyName());
        $("input[type='text'].securitykey-time").val(getSecurityKeyCreationTime());
        $('.auth-type').html(getAuthTypeHumanReadable());
        // ...
    }

    // add event listener on storage change
    $(window).on('storage', e => {
        console.log("Storage changed"); // test output
        // TODO: check storage change type?
        updateFields();
    });

    // update fields initially
    updateFields();
})();