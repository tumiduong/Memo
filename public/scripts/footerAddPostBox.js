$(() => {
  $('.collectionDropDown').hide()

  $('.post .addPostButton').on('click', (e) => {
    e.preventDefault()
    $('.collectionDropDown').animate({width:'toggle'},150 )
  });
})
