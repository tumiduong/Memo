//comments
//only text in comments
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}  

//create comment
const createComment = comment => {
  let $comment =
  `<div class='comments'>
  <p class='user'><img src="https://i.imgur.com/saXHsyd.png"> Username</p>
  <p class='user-comment'>${escape(comment.content)}</p></div>`;
  return $comment;
}

//render comment
const renderNewComment = comment => {
  const $comment = createComment(comment);
  $('.all-comments').prepend($comment);
}

//comment load
const commentLoad = (method, url, cb) => {
  $.ajax({
    url,
    method
  })
    .then(comments => { cb(comments[comments.length - 1]) })
    .fail(error => console.log(error))
}

//likes
const $likeimg = 
  `<img class="like-img" src="https://i.imgur.com/ay6oIRr.png" data-id="<%= post.id %>" >`;
const $likedimg = 
  `<img class="liked-img" src="https://i.imgur.com/diEl516.png" data-id="<%= post.id %>">`;

//doc.ready
$( () => {
  $('.new-comment').on("submit", (event) => {
    event.preventDefault();
    const post_id = $(event.target).find('input[name="post_id"]').val();
    $.ajax({
      method: 'POST',
      url: `/actions/comment/api/${post_id}`,
      data: { content: $('#comment').val() }
    })
      .then(response => {
        commentLoad('GET', `/actions/comment/api/${post_id}`, renderNewComment);
        $('.new-comment')[0].reset();
      })
      .fail(error => res.json({ error: error.message }))
    })
})

//ratings send value in and display the html of spans button.click