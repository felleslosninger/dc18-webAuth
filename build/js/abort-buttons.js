(function() {
    let $ = jQuery.noConflict();
    $(".btn-Abort.partially").on("click", e => {
        e.preventDefault();
        window.location.href = document.referrer;
    });
    $(".btn-Abort.fully").on("click", e => {
        e.preventDefault();
        window.location.href = "index.html";
    });
    $(".btn-Abort.landing").on("click", e => {
        e.preventDefault();
        window.location.href = "../common/index-login.html";
    });
    $(".btn-Abort.landing2").on("click", e => {
        e.preventDefault();
        window.location.href = "../common/index-webauthn.html";
    });
})();