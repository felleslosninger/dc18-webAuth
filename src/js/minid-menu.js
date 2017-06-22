const minidMenu = () => {
  const $ = jQuery.noConflict();

  const $miMenu = $('#js-mi-menu');
  if ($miMenu.length === 0) {
    // Current page has no minID menu, no need to add event handlers
    return;
  }

  const $miMenuTrigger = $('.mi-Menu_Trigger');
  const $lastMenuElement = $miMenu.find('.js-last');

  $miMenuTrigger.on('click', (e) => {
    e.preventDefault();
    $miMenu.toggleClass('mi-Menu-open');
    if ($miMenu.hasClass('mi-Menu-open')) {
      $miMenuTrigger.attr('aria-expanded', 'true');
    } else {
      $miMenuTrigger.attr('aria-expanded', 'false');
    }
  });

  $miMenuTrigger.on('keydown', (e) => {
    if (e.keyCode === 9 && e.shiftKey ) { // Shift+tab, go to last element in list if list open
      e.preventDefault();
      if ($miMenu.hasClass('mi-Menu-open')) {
        $lastMenuElement.focus();
      }
    }
  });

  $lastMenuElement.on('keydown', (e) => {
    if (e.keyCode === 9 && !e.shiftKey) { // Tab, go to menu trigger
      e.preventDefault();
      $miMenuTrigger.focus();
    }
  });

  $(document).on('click', (event) => {
    if (!(document.getElementById('js-mi-menu').contains(event.target))) {
      $miMenuTrigger.attr('aria-expanded', 'false');
      $miMenu.removeClass('mi-Menu-open');
    }
  });
};

minidMenu();
