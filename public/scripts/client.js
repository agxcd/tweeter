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
    //Define elements
    let $tweet = $("<div>").addClass("posted-area");
    let $header = $("<header>").addClass("flex-hor");
    let $flexRow = $("<div>").addClass("flex-row");
    let $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
    let $name = $("<span>").addClass("user-name").text(tweet.user.name);
    let $userID = $("<span>")
      .addClass("user-id hidden")
      .text(tweet.user.handle);
    let $postTweet = $("<h3>")
      .addClass("posted-tweet")
      .text(tweet.content.text);
    let $hr = $("<hr>").addClass("flex-hor");
    let $footer = $("<footer>").addClass("flex-hor");
    let $daysAgo = $("<span>").addClass("posted-date").text(tweet.created_at);
    let $iconDiv = $("<div>").addClass("flex-hor tweet-icon");
    let $flagIcon = $("<i>").addClass("fa fa-flag");
    let $heartIcon = $("<i>").addClass("fa fa-heart");
    let $retweetIcon = $("<i>").addClass("fa fa-retweet");

    //Append elements into the HTML
    $tweet.append($header);
    $header.append($flexRow);
    $flexRow.append($avatar);
    $flexRow.append($name);
    $header.append($userID);
    $tweet.append($postTweet);
    $tweet.append($hr);
    $tweet.append($footer);
    $footer.append($daysAgo);
    $footer.append($iconDiv);
    $iconDiv.append($flagIcon);
    $iconDiv.append($heartIcon);
    $iconDiv.append($retweetIcon);

    console.log($tweet);

    return $tweet;
  };

  // Error Message Box
  const $errorBox = $(".errorBox");
  const $errorMsg = $(".errorMsg");

  // Form Submitting Action / POST
  $("form").submit(function (event) {
    event.preventDefault();
    if (!$("#tweet-text").val()) {
      $errorBox.show();
      $errorMsg.text("You cannot tweet empty tweet.");
      return;
    }
    if ($("#tweet-text").val().length > 140) {
      $errorBox.show();
      $errorMsg.text("Sorry your tweet exceeds the 140 character limit");
      return;
    } else {
      $errorBox.slideUp();
      $.ajax({
        url: $("form").attr("action"),
        type: "POST",
        data: $("form").serialize(),
        success: function () {
          loadTweets();
          $("#tweet-text").val("");
          $("#counter").text("140").removeClass("warning");
        },
        error: function () {
          console.log("An error occur.");
        },
      });
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
    });
  };
  loadTweets();
});
