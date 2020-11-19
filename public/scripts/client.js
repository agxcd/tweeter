$(document).ready(function () {
  const renderTweets = function (tweets) {
    return tweets.map((tweet) =>
      $(".tweets-container").append(createTweetElement(tweet))
    );
  };

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

  $("form").submit(function (event) {
    if (!$("#tweet-text").val()) {
      alert("You cannot tweet empty tweet.");
    }
    if ($("#tweet-text").val().length > 140) {
      alert("Sorry your tweet exceeds the 140 character limit");
    }
    event.preventDefault();
  });

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
