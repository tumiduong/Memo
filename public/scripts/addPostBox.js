//adding the post to collection by updating the post_id
const addPostToCollection = (url, method, dataObj) => {
  $.ajax({url, method, data: dataObj })
    .then(data => {
      res.status(200).send();
    })
    .fail(err => {
      console.log(err);
    });
};

$(() => {
  $('.collectionDropDown').hide()

  //shows the drop down menu to select which collection to add the post to
  $('.addPostButton').on('click', function(e) {
    e.preventDefault()
    $(this).next().animate({width:'toggle'},150 )
  });

  //sends the ajax request to add the post to the selected collection
  $('.dropDown').on('change', function(e) {
    const post_id = e.target.dataset.post_id;
    const collection_id = e.target.options[e.target.selectedIndex].value;
    addPostToCollection(`/posts/${post_id}`, 'POST', { collection_id, post_id})
    $(this).animate({width:'toggle'},150 )
  })
})
