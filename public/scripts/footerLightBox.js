const createCollectionElement = function(collectionData) {
  console.log('collection')
  let $collection = $('<article>').addClass('collection');

  $('<a>')
    .text(collectionData["title"])
    .attr('href', `/collection/${collectionData["id"]}`)
    .appendTo($collection);

  $("#collection-list").append($collection);
};

const loadLastCollection = url => {
  $.ajax({url, method: 'GET'})
     .then(collections => {
       createCollectionElement(collections[collections.length - 1])
     })
     .fail(err => {
       console.log(err)
     })
}

const submitCollection = (url, method, collection) => {
  $.ajax({url, method, data: { text: collection } })
    .then(() => {
      loadLastCollection('/whateverPage');
    })
    .fail(err => {
      console.log(err);
    });
};

$(() => {
  $('#lightbox-background').hide();
  $('#form').hide();

  $('#lightBoxBtn').on('click', () => {
    $('#lightbox-background').fadeIn()
    $('#form').slideDown()
  });

  $('#form form').on('click', (event) => {
    event.stopPropagation()
  });

  $('#lightbox-background').on('click', () => {
    $('#lightbox-background').fadeOut()
    $('#form').slideUp()
  });

  $('#submitCollectionBtn').on('click', (event) => {
    event.preventDefault()
    let collection = {
      title: $('#collectionTitle').val(),
      description: $('#collectionDescription').val()
    }
    console.log(collection)
    // submitCollection('/collection', 'POST', collection)
  })
})
