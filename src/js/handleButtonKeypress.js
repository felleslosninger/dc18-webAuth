window.handleButtonKeyPress = (event) => {

  const $ = jQuery.noConflict();

  if (event.keyCode === 32) {
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault();
    // Act as native button, trig action when space button pressed
    $(event.target)[0].click();

  }
}
