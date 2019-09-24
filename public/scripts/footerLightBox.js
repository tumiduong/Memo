$(() => {
  $('#lightbox-background').hide();
  $('#form').hide();

  $('#lightBoxBtn').on('click', () => {
    $('#lightbox-background').show(400, 'swing')
    $('#form').show()
  });

  $('#form').on('click', (event) => {
    event.stopPropagation()
  });

  $('#lightbox-background').on('click', () => {
    $('#lightbox-background').hide()
    $('#form').hide()
  });
})
