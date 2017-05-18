const menuEvents  = () => {
  const $ = jQuery.noConflict();

  const $menuContainer = $('.h-Menu_Container');
  const $mobileMenuBtn = $('.h-Menu_Trigger-mobile');
  const $subMenuBtn = $('.h-Menu_Trigger');
  $mobileMenuBtn.on('click', () => {
    $mobileMenuBtn.toggleClass('active');
    $menuContainer.toggleClass('h-Menu_Container-open');
  });
  $subMenuBtn.on('click', (event) => {
    const $selectedMenu = $(event.target).parent('.h-Menu');
    if ($selectedMenu.hasClass('h-Menu-open')) { // menu is open
      $selectedMenu.removeClass('h-Menu-open'); // close it
    } else {
      $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
      $selectedMenu.addClass('h-Menu-open'); // open selected menu
    }
  });
};

export default menuEvents;
