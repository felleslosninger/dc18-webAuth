const checkEnableSave = () => {

    const $ = jQuery.noConflict();

    $('.fm-Checkbox input').on('change', (e) => {
        let $checkbox = $(e.currentTarget);
        if ($checkbox.prop('checked')) {
            $('.btn-Action').prop('disabled', false);
        } else {
            $('.btn-Action').prop('disabled', true);
        }
    });

};

checkEnableSave();