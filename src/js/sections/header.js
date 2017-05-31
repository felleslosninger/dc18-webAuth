const menuEvents  = () => {
  const $ = jQuery.noConflict();

  const $menuContainer = $('.h-Menu_Container');
  if ($menuContainer.length === 0) {
    return;
  }
  const $mobileMenuBtn = $('.h-Menu_Trigger-mobile');
  const $subMenuBtn = $('.h-Menu_Trigger');
  const $lastElement = $('.js-last');

  $mobileMenuBtn.on('click', (event) => {
    event.preventDefault();
    $mobileMenuBtn.toggleClass('active');
    $menuContainer.toggleClass('h-Menu_Container-open');
  });

  $subMenuBtn.on('click', (event) => {
    event.preventDefault();
    const $currentTrigger = $(event.currentTarget);
    const $selectedMenu = $currentTrigger.parent('.h-Menu');
    if ($selectedMenu.hasClass('h-Menu-open')) { // menu is open
      $selectedMenu.removeClass('h-Menu-open'); // close it
      $currentTrigger.attr('aria-expanded', 'false');
    } else {
      $('.h-Menu-open').find('.h-Menu_Trigger').attr('aria-expanded', 'false');
      $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
      $selectedMenu.addClass('h-Menu-open'); // open selected menu
      $currentTrigger.attr('aria-expanded', 'true');
    }
  });

  $subMenuBtn.on('keydown', (event) => {
    // Shift+tab, go to last element in list if list open
    if (event.keyCode === 9 &&
        event.shiftKey &&
        $(event.currentTarget).parent('.h-Menu').hasClass('h-Menu-open')) {
          event.preventDefault();
          $lastElement.focus();
    }
  });

  $lastElement.on('keydown', (event) => {
    if (event.keyCode === 9 && !event.shiftKey) { // Tab, go to menu trigger
      event.preventDefault();
      $('.h-Menu-open').find('.h-Menu_Trigger').focus();
    }
  });

  $(document).on('click', (event) => {
    if (!(document.getElementById('js-menues').contains(event.target))) {
      if (!($(event.currentTarget).hasClass('h-Menu_Trigger-mobile'))) {
        $('.h-Menu_Trigger').attr('aria-expanded', 'false');
        $('.h-Menu').removeClass('h-Menu-open');
      }
    }
  });
};

export default menuEvents;
