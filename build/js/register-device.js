const $ = jQuery.noConflict();

function hideInfo() {
    $(document).on('webauthn:register-success', (event, data) => {
        $('#webauthn-info').hide();
        $('#nextbtn').html("Lagre");
    })
}

hideInfo();
