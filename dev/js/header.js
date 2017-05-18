const mobileMenu  = () => {
  const $ = jQuery.noConflict();

  const $menuContainer = $('.h-Menu_Container');
  const $menuBtn = $('.h-Menu_Trigger-mobile');
  $menuBtn.on('click', () => {
    $menuBtn.toggleClass('active');
    $menuContainer.toggleClass('h-Menu_Container-open');
    if ($menuContainer.hasClass('h-Menu_Container-open')) {
      $('.h-Menu_Trigger').on('click', (event) => {
        const $selectedMenu = $(event.target).parent('.h-Menu');
        if ($selectedMenu.hasClass('h-Menu-open')) { // menu is open
          $selectedMenu.removeClass('h-Menu-open'); // close it
        } else {
          $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
          $selectedMenu.addClass('h-Menu-open'); // open selected menu
        }
      });
    } else {
      $('.h-Menu_Trigger').off('click');
    }
  });
};

mobileMenu();
