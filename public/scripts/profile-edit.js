
$(() => {
  $('.edit-profile').fadeIn(250)

  $('.preview').on('click', (e) => {
    e.preventDefault()
    const originalURL = $('#iconURL').attr('placeholder')
    const newURL = $('#iconURL').val()
    if (newURL) {
      $('#edit-profile-icon').attr('src', newURL)
    } else {
      $('#edit-profile-icon').attr('src', originalURL)
      $('#iconURL').val(originalURL);
    }
  })
})
