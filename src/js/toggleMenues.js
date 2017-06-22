/*
* To avoid double hamburger menu on pages with MinID menu,
* we have MinID menu elements in main menu too.
* The MinID elements are hidden by default (CSS settings)
* This script adds a class to make the elements visible on mobile sized screens,
* if and only if the pages contains a MinID menu.
* The MinID menu is then hidden.
*
* Result:
* For desktop the MinID menu choices are found in the MinID menu to the right of the page title.
* For mobile the MinID menu choices are found in the top menu (hamburger).
*/

const toggleMenues = () => {
  const $ = jQuery.noConflict();

  const $miMenu = $('#js-mi-menu');
  if ($miMenu.length === 0) {
    // Current page has no minID menu, nothing to toggle.
    return;
  }

  let isMobile = $('.h-Menu_Trigger-mobile').is(':visible');

  if (isMobile) {
    $('.mi-Menu_Trigger').addClass('mi-Menu_Trigger-disabled');
    $('.h-Menu-MinID').addClass('h-Menu-MinID-active');
  } else {
    $('.mi-Menu_Trigger').removeClass('mi-Menu_Trigger-disabled');
    $('.h-Menu-MinID').removeClass('h-Menu-MinID-active');
  }
}

toggleMenues();

jQuery(window).on('resize', () => {
  toggleMenues();
});
