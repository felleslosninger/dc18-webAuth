const $ = jQuery.noConflict();

function hideInfo() {
    $(document).on('webauthn:register-success', (event, data) => {
        $('#webauthn-info').hide();
        $('#nextbtn').html("Lagre og Forsett til DIFI");
        $('#registerSuccess').attr('action', "MinID-2D.html");
    })
}

hideInfo();
