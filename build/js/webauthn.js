const webauthn = () => {
  const $ = jQuery.noConflict();
  const name = $('#security-key-name').val() || $('#security-key-name').attr('placeholder');

  $('#webAuthn').on('click', (event) => {
    event.preventDefault();
    console.log('test');
    if (!navigator.credentials) {
      window.alert('You need a browser that supports Webauthn');
      return;
    }
    $(document).trigger('webauthn:prompt-user-presence');
    navigator.credentials.create(credentialCreationOptionsRegister)
      .then((credentials) => {
        console.log(credentials);
        $(document).trigger('webauthn:register-success', {name, date: new Date()})
      })
      .catch(console.error);
  });

  $('#webauthn-login').on('click', (event) => {
    event.preventDefault();
    if (!navigator.credentials) {
      window.alert('You need a browser that supports Webauthn');
      return;
    }
    $(document).trigger('webauthn:prompt-user-presence');
    navigator.credentials.get(credentialCreationOptionsLogin)
      .then((credentials) => {
        console.log(credentials);
        $(document).trigger('webauthn:login-success')
          window.location.href = "../landing-page/min-side.html";
      })
      .catch((error) => {
          console.error(error);
          window.location.href = "../landing-page/min-side.html";
      });
  });

  $(document).on('webauthn:register-success', (event) => {
    console.log('webauthn:register-success');
    console.log(event);
  });

  const credentialCreationOptionsRegister = {
    publicKey: {
      rp: {
        name: 'difi',
      },
      user: {
        name: 'difi',
        id: new Uint8Array(16),
        displayName: 'difi',
      },
      pubKeyCredParams: [{
        type: 'public-key',
        alg: -7,
      },
        {
          type: 'public-key',
          alg: -36,
        },
        {
          type: 'public-key',
          alg: -257,
        },
      ],
      challenge: new Uint8Array(16),
      timeout: 60 * 1000,
    },
  };
  const credentialCreationOptionsLogin = {
    mediation: 'required',
    publicKey: {
      userVerification: 'required',
      challenge: new Uint8Array(16),
      timeout: 60 * 1000,
    },
  };
};


webauthn();
