//create collection element to be displayed in the sidebar
const createCollectionElement = function(collectionData) {
  console.log(collectionData)
  let $collection = $('<a>')
    .text(collectionData["title"])
    .attr('href', `/collection/${collectionData["id"]}`)

  $(".collection-list").append($collection);
};

//load the last collection onto the sidebar
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
  $.ajax({url, method, data: collection })
    .then(user_id => {
      loadLastCollection(`/collection/sidebar/api/${user_id}`);
    })
    .fail(err => {
      console.log(err);
    });
};

$(() => {
  //both the background and form are hidden on load
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
    submitCollection('/collection', 'POST', collection)
    $('#lightbox-background').fadeOut()
    $('#form').slideUp()
  })
})
