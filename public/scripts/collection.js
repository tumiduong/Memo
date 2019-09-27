//shows the post being removed from the collection
const deletePostFromCollection = (url, method, post_id) => {
  $.ajax({url, method, data: post_id})
    .then(post_id => {
       console.log(post_id)
       $(`#${post_id}`).remove();
    })
    .catch(err => {
       console.log(err.stack);
    })
}

$(() => {
  $('.delete-post-from-collection').on('click', (e) => {
    e.preventDefault()
    const post_id = $(e.target).closest('.collection-post').attr('id')
    deletePostFromCollection(`/collection/edit/${post_id}`, 'POST', post_id)
  })
})

