// adds onclick listeners that setup localStorage according to test requirements
(function() {
    const $ = jQuery.noConflict()
    // test 1: webauthn device is not registered
    $("#test1").on("click", event => {
        console.log("test 1 button clicked");
        $(document).trigger("webauthn:remove-device");
        $(document).trigger("auth-type:set", "sms");
    });

    // test 2: webauthn device is not registered
    $("#test2").on("click", event => {
        console.log("test 2 button clicked");
        $(document).trigger("webauthn:remove-device");
        $(document).trigger("auth-type:set", "sms");
    });

    // test 3: webauthn device is registered
    $("#test3").on("click", event => {
        console.log("test 3 button clicked");
        $(document).trigger("webauthn:register-success", {name: "Yubikey", date: new Date()});
        $(document).trigger("auth-type:set", "webauthn");
    });

    // test 4: webauthn device is not registered
    $("#test4").on("click", event => {
        console.log("test 4 button clicked");
        $(document).trigger("webauthn:remove-device");
        $(document).trigger("auth-type:remove");
    });

    // test 5: webauthn device is not registered
    $("#test5").on("click", event => {
        console.log("test 5 button clicked");
        $(document).trigger("webauthn:remove-device");
        $(document).trigger("auth-type:remove");
    });

    // test 6: webauthn device is registered
    $("#test6").on("click", event => {
        console.log("test 6 button clicked");
        $(document).trigger("webauthn:register-success", {name: "Yubikey", date: new Date()});
        $(document).trigger("auth-type:set", "webauthn");
    });

    // test 7: webauthn device is not registered
    $("#test7").on("click", event => {
        console.log("test 7 button clicked");
        $(document).trigger("webauthn:remove-device");
        $(document).trigger("auth-type:set", "sms");
    });

    // test 8: webauthn device is registered
    $("#test8").on("click", event => {
        console.log("test 8 button clicked");
        $(document).trigger("webauthn:register-success", {name: "Yubikey", date: new Date()});
        $(document).trigger("auth-type:set", "webauthn");
    });
})();
