const loadPage = url => {
  $.ajx({url, method: 'GET'})
}

const submitCollection = (url, method, collection) => {
  $.ajax({url, method, data: { text: collection } })
    .then(() => {
      loadPage('/whateverPage');
    })
    .fail(err => {
      console.log(err);
    });
};

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

  $('#submitCollectionBtn').on('click', () => {
    let collection = $('#form').val();
    submitCollection('/collection', 'POST', collection)
  })
})
