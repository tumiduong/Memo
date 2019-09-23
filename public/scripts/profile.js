// const createCollectionElement = function(collectionData) {
//   console.log('collection')
//   let $collection = $('<article>').addClass('collection');

//   //creates and appends maain content div and text
//   let $content = $("<div>");
//   $('<p>')
//     .text(collectionData["title"])
//     .appendTo($content);
//   $('<p>')
//     .text(collectionData["description"])
//     .appendTo($content);
//   $('<p>')
//     .text(collectionData["created_at"])
//     .appendTo($content);

//   $collection.append($content);
//   return $collection;
// };

// const renderCollections = function(collections) {
//   for (let collection of collections) {
//     let $collection = createCollectionElement(collection)
//     $("#collection-container").prepend($collection)
//   }
// }

// const loadCollections = url => {
//   $.ajax({url, method: 'GET'})
//     .then(collections => {
//       renderCollections(collections);
//     })
//     .fail(err => {
//       console.log(err);
//     });
// };
// const username = $('#username').text()

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
})
