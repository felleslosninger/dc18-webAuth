/* Used on kontaktinfomodul-1F where there are two forms, one enabled and one disabled.
* When user has filled out first form and presses the button, next form is enabled
* and current disabled.
* Step indicator is updated
*/

const toggleForm = () => {
  const $ = jQuery.noConflict();

  const $formToggler = $('.js-toggleForm');
  const progressDots = $('.fm-Progress_Dot');

  $formToggler.on('click', (e) => {
    e.preventDefault();
    $('form.disabled').removeClass('disabled');
    $formToggler.closest('form').addClass('disabled');
    $(progressDots[0]).removeClass('active');
    $(progressDots[1]).addClass('active');
  });
}

toggleForm();
