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
const $likeImg =
  `<img class="like-img" onclick="like(this)" src="https://i.imgur.com/ay6oIRr.png" data-id="<%= post.id %>" >`;
const $likedImg =
  `<img class="liked-img" onclick="dislike(this)" src="https://i.imgur.com/diEl516.png" data-id="<%= post.id %>">`;

const like = function(element) {
  const div = element.closest(".user-like")
  const post_id = $(event.target).closest(".user-like").data('id');
  $.post(`/actions/like/api/${post_id}`)
    .then(() => {
      div.innerHTML = '';
      div.innerHTML = $likedImg;
    })
    .fail(error => {
      res.json({ error: error.message })
    })
};

const dislike = function(element) {
  const div = element.closest(".user-like")
  const post_id = $(event.target).closest(".user-like").data('id');
  $.post(`/actions/like/api/${post_id}/delete`)
  .then(() => {
    div.innerHTML = '';
    div.innerHTML = $likeImg;
  })
  .fail(error => {
    res.json({ error: error.message })
  })
};

//doc.ready
$( () => {
  $('.new-comment').on("submit", (event) => {
    event.preventDefault();
    const post_id = $(event.target).find('input[name="post_id"]').val();

    if ($('#comment').val().length !== 0) {
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
      } else {
        console.log("comment empty");
      }
    })

  $('.star-rating').on("click", (event) => {
    event.preventDefault();
    const post_id = $('.rate-post').find('input[name="post_id"]').val();
    const rateValue = parseInt($(event.target).attr("value"));

    $.ajax({
      method: 'POST',
      url: `/actions/rating/api/${post_id}`,
      data: {rating: rateValue}
    })
      .then((data) => {
        if (rateValue === 1) {
          $('.rate-post').replaceWith(`
            <span class="star">★</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>
            <span>☆</span>`)
        } else if (rateValue === 2) {
          $('.rate-post').replaceWith(`
          <span class="star">★</span>
          <span class="star">★</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>`)
        } else if (rateValue === 3) {
          $('.rate-post').replaceWith(`
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span>☆</span>
            <span>☆</span>`)
        } else if (rateValue === 4) {
          $('.rate-post').replaceWith(`
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span>☆</span>`)
        } else if (rateValue === 5) {
          $('.rate-post').replaceWith(`
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>`)
        }
      })
    .fail(error => res.json({ error: error.message }))
  })

}) //end of doc ready
