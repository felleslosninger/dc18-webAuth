
// Store
const localStorage = () => {
    const $ = jQuery.noConflict();
    $(document).on('webauthn:register-success', (event, data) => {
        console.log('test')
        window.localStorage.setItem("webauthn-device", JSON.stringify(data));
    })
}

localStorage();

