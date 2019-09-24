const createCollectionElement = function(collectionData) {
  console.log('collection')
  let $collection = $('<article>').addClass('collection');

  //creates and appends maain content div and text
  let $content = $("<div>");
  $('<p>')
    .text(collectionData["title"])
    .appendTo($content);
  $('<p>')
    .text(collectionData["description"])
    .appendTo($content);
  $('<p>')
    .text(collectionData["created_at"])
    .appendTo($content);

  $collection.append($content);
  return $collection;
};

const renderCollections = function(collections) {
  for (let collection of collections) {
    let $collection = createCollectionElement(collection)
    $("#collection-container").prepend($collection)
  }
}

const loadCollections = url => {
  $.ajax({url, method: 'GET'})
    .then(collections => {
      renderCollections(collections);
    })
    .fail(err => {
      console.log(err);
    });
};

const username = $('#username').text()

(() => {
  $('#addCollectionBtn').on('click', () => {
    addCollectionData()
  })
})
