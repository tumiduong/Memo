//only text in comments
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}  

//create comment
const createComment = (comment) => {
  let $comment =
  `<p class='user'><img src="https://i.imgur.com/saXHsyd.png"> Username</p>
  <p class='user-comment'>${escape(comment.content)}</p>`;
  $('.all-comments').append($comment);
}

//load comment
const loadNewComment = (method, url) => {
  $.ajax({
    method,
    url
  })
  .then(response => { createComment(response[response.length - 1]) })
  .fail(error => console.log(error))
}

//post a comment
$('.new-comment').on("submit", (event) => {
  event.preventDefault();

  $.ajax({
    method,
    url,
    data: comment
  })
})
