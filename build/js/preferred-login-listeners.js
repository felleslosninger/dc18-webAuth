(function() {
    let $ = jQuery.noConflict();

    $("button[type='submit']").on("click", e => {
        $("input[type='radio']").each((index, elem) => {
            if (elem.checked) {
                window.localStorage.setItem("auth-type", elem.value);
            }
        });
    });
})();
