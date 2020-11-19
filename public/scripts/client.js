$(document).ready(function () {
  // Mapping the tweets
  const renderTweets = function (tweets) {
    $(".tweets-container").empty();
    return tweets.map((tweet) =>
      $(".tweets-container").append(createTweetElement(tweet))
    );
  };

  // Tweet elements
  const createTweetElement = function (tweet) {
    let $tweet = `
              <div class="posted-area">
            <header class="flex-hor">
              <div class="flex-row">
                <img src=${tweet.user.avatars} width="50" alt="" />
                <div class="user-name">${tweet.user.name}</div>
              </div>
              <div class="user-id hidden">${tweet.user.handle}</div>
            </header>
            <h3 class="posted-tweet">${tweet.content.text}</h3>
            <hr class="flex-hor" />
            <footer class="flex-hor footer">
              <p class="posted-date">${tweet.created_at}</p>
              <div class="flex-hor tweet-icon">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </footer>
          </div>
    `;
    return $tweet;
  };

  // Form Submitting action / POST
  $("form").submit(function (event) {
    event.preventDefault();
    if (!$("#tweet-text").val()) {
      alert("You cannot tweet empty tweet.");
    }
    if ($("#tweet-text").val().length > 140) {
      alert("Sorry your tweet exceeds the 140 character limit");
    } else {
      $.ajax({
        url: $("form").attr("action"),
        type: "POST",
        data: $("form").serialize(),
        success: function () {
          loadTweets();
          $("#tweet-text").val("");
          $("#counter").text("140");
        },
        error: function () {
          console.log("An error occur.");
        },
      }).then((res) => console.log(res));
    }
  });

  //Fetch data from /tweets
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      type: "GET",
      data: $("form").serialize(),
      success: function (data) {
        renderTweets(data);
      },
      error: function () {
        console.log("An error occur.");
      },
    }).then((res) => console.log(res));
  };
  loadTweets();
});
