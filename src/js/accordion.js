const accordion = () => {

  const $ = jQuery.noConflict();

  $('.la-List_Element').on('click', (e) => {
    e.preventDefault();
    let $target = $(e.currentTarget);
    let $list = $(document.getElementById($target.attr('aria-controls')));
    // addAnimation class used to prevent animation on page load. Safe to add now:
    $target.find('.fa-angle-down').addClass('addAnimation');
    // There are two animations. They must run simultaneously:
    if ($list.hasClass('open')) {
      // about to close, aria attribute is updated and this triggers arrow animation
      $target.attr('aria-expanded', 'false');
    } else {
      // about to open, aria attribute is updated and this triggers arrow animation
      $target.attr('aria-expanded', 'true');
    }
    // List open / close with animation
    $list.slideToggle(300, () => {
      $list.toggleClass('open');
    });

  });
};

accordion();
