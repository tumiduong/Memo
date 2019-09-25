const deleteCollection = (url, method, collection_id) => {
  $.ajax({url, method, data: collection_id})
    .then(collection_id => {
       $(`.${collection_id}`).remove();
    })
    .catch(err => {
       console.log(err.stack);
    })
}

$(() => {
  $('#collection-container').hide();
  $('#post-container').hide();
  $('#like-container').hide();
  $('#comment-container').hide();

  $('#overview-access').on('click', () => {
    $('#card-container').show();
    $('#collection-container').hide();
    $('#post-container').hide();
    $('#like-container').hide();
    $('#comment-container').hide();
  });

  $('#collection-access').on('click', () => {
    $('#card-container').hide();
    $('#collection-container').show();
    $('#post-container').hide();
    $('#like-container').hide();
    $('#comment-container').hide();
  });

  $('#post-access').on('click', () => {
    $('#card-container').hide();
    $('#collection-container').hide();
    $('#post-container').show();
    $('#like-container').hide();
    $('#comment-container').hide();
  });

  $('#like-access').on('click', () => {
    $('#card-container').hide();
    $('#collection-container').hide();
    $('#post-container').hide();
    $('#like-container').show();
    $('#comment-container').hide();
  });

  $('#comment-access').on('click', () => {
    $('#card-container').hide();
    $('#collection-container').hide();
    $('#post-container').hide();
    $('#like-container').hide();
    $('#comment-container').show();
  });

  $('.deleteBtn').on('click', (e) => {
    e.preventDefault()
    const collection_id = $(e.target).closest('.deleteCollection').attr('action')
    deleteCollection(`/collection/delete/${collection_id}`, 'POST', collection_id)
  })
})
