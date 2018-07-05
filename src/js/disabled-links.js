const disabledLinks = () => {
    const $ = jQuery.noConflict();

    $('a.disabled').on('click', (e) => {
        e.preventDefault();
    });

    // Focusable elements are not accessible by tab button
    $('.disabled:focusable').attr('tabindex', -1);
    $('.disabled *:focusable').attr('tabindex', -1);

}

disabledLinks();