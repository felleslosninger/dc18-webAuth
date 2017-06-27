/* Used on kontaktinfomodul-1F where there are two forms, one enabled and one disabled.
* When user has filled out first form and presses the button, next form is enabled
* and current disabled.
* Step indicator is updated
*/

const toggleForm = () => {
  const $ = jQuery.noConflict();

  const $formToggler = $('.js-toggleForm');
  const progressDots = $('.fm-Progress_Dot');
  const $secondForm = $('.dpb-Custom');

  $formToggler.on('click', (e) => {
    console.log("trykker på knappen");
    e.preventDefault();
    // Enable next form:
    $secondForm.removeClass('disabled');
    $secondForm.find('a').attr('tabindex', '0');
    $secondForm.find('button').attr('tabindex', '0');

    // Disalbe current form:
    $formToggler.closest('form').addClass('disabled');
    $formToggler.attr('tabindex', '-1');
    $('.with-icon').find('a').attr('tabindex', '-1');

    // Advance progress
    $(progressDots[0]).removeClass('active');
    $(progressDots[1]).addClass('active');

  });
}

toggleForm();
