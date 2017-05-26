const disabledLinks = () => {
  const $ = jQuery.noConflict();

  $('a.disabled').on('click', (e) => {
    e.preventDefault();
  });
}

export default disabledLinks;
