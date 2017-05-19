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
    event.preventDefault();
    const $selectedMenu = $(event.currentTarget).parent('.h-Menu');
    if ($selectedMenu.hasClass('h-Menu-open')) { // menu is open
      $selectedMenu.removeClass('h-Menu-open'); // close it
    } else {
      $('.h-Menu-open').removeClass('h-Menu-open'); // close the other menu if open
      $selectedMenu.addClass('h-Menu-open'); // open selected menu
    }
  });
  $(document).on('click', (event) => {
    if (!(document.getElementById('js-menues').contains(event.target))) {
      $('.h-Menu').removeClass('h-Menu-open');
    }
  });
};

export default menuEvents;
