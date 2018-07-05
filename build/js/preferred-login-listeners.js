(function() {
    let $ = jQuery.noConflict();

    $("button[type='submit']").on("click", e => {
        $("input[type='radio']").each((index, elem) => {
            if (elem.checked) {
                window.localStorage.setItem("auth-type", elem.value);
            }
        });
    });

    let selectedValue = getAuthType(); // currently preferred login type

    // check the option that is the currently preferred login type by default
    $("input[type='radio']").each((index, elem) => {
        if (elem.value === selectedValue) {
            elem.checked = true;
        }
    });
})();

(function() {
    let $ = jQuery.noConflict();

    if (getSecurityKeyName() === (null || undefined)) {
        $("#webauthn").attr('disabled', true);
    } else {
        $("#webauthn").attr('disabled', false);
    }

})();
