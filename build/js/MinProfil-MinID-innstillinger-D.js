(function() {
    let $ = jQuery.noConflict();
    let done = false;

    // User-facing button for removing the security key
    // The button must be clicked twice to actually do anything, and is
    // functionally a confirmation dialog. It calls a hidden button that removes
    // the key and submits the form on the second click.
    //
    // After a three-second window of clicking the button again, it returns to
    // the state of "being unclicked".
    //
    // This is a cool feature, but the implications for UU is unexplored. It may
    // need to be done differently in future.
    $("#btn-remove").on("click", function(event) {
        if (done) {
            document.getElementById("btn-submit-remove").click();
            return;
        }

        // custom action
        event.preventDefault();

        let hint = document.getElementById("confirm-remove");
        let btn = document.getElementById("btn-remove");

        let oldtxt = btn.innerHTML; // save for restoration later

        // I must use innerHTML here because outerHTML has the class
        // "visuallyHidden"
        btn.innerHTML = "<span>" + hint.innerHTML + "</span>";

        // give user a 3 second window to confirm the action
        setTimeout(() => {
            btn.innerHTML = oldtxt;
            done = false; // prevent default again next time
        }, 3000);

        done = true; // don't prevent default next time
    });

    // Actually remove the security key
    // Form is submitted when this function returns
    $("#btn-submit-remove").on("click", function(event) {
        $(document).trigger('webauthn:remove-device');
    });

    // Decide whether to show device info or not
    const webauthnDevice = window.localStorage.getItem('webauthn-device');
    if (webauthnDevice && JSON.parse(webauthnDevice)) {
        $('#webauthn-device-info-settings').show();
    } else {
        $('#webauthn-device-info-settings').hide();
    }

})();