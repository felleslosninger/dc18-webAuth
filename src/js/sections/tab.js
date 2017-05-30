const menuEvents  = () => {
  const $ = jQuery.noConflict();

  $('.tb-Header a').on('click', (event) => {
    event.preventDefault();

    const $el = $(event.currentTarget);
    const $target = $el.data('target');
    $el.addClass('active')
    .siblings()
    .removeClass('active')
    .end()
    .closest('.tb-Container')
    .find('.tb-Tab')
    .hide()
    .end()
    .find('[data-id=' + $target + ']')
    .show()
    ;
  });

  $('.tb-Header a').on('mouseout', (event) => {
    const $el = $(event.currentTarget);
    $el.blur();
    console.log('here');
  });

};

export default menuEvents;
