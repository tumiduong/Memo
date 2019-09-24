// The search bar redirects to the appropriate path/url depending of the input
$(() => {
  $("#search-form").submit(function(e) {
    e.preventDefault();
    location = "http://localhost:8080/posts/search/" + $('#search-bar').val();
  });
});
