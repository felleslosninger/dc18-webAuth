const localStorage = () => {
  const $ = jQuery.noConflict();

  $(document).on('webauthn:register-success', (event, data) => {
    console.log('webauthn:register-success in localStorage.js');
    window.localStorage.setItem("webauthn-device", JSON.stringify(data));
  });

  $(document).on('webauthn:remove-device', (event) => {
    event.preventDefault();
    window.localStorage.removeItem('webauthn-device');
    console.log('webauthn-device cleared from local storage');
  });

};

localStorage();
