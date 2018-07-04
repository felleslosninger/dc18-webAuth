const radioEnableSave = () => {

    const $ = jQuery.noConflict();

    $('.fm-RadioButtons input').on('change', (e) => {
        let $radioBtn = $(e.currentTarget);
        if ($radioBtn.prop('checked')) {
            $('.btn-Action').prop('disabled', false);
        }
    });

};

radioEnableSave();