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
    // Using .text function Define elements
    // let $tweet = $("<div>").addClass("posted-area");
    // let $header = $("<header>").addClass("flex-hor");
    // let $flexRow = $("<div>").addClass("flex-row");
    // let $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
    // let $name = $("<span>").addClass("user-name").text(tweet.user.name);
    // let $userID = $("<span>")
    //   .addClass("user-id hidden")
    //   .text(tweet.user.handle);
    // let $postTweet = $("<h3>")
    //   .addClass("posted-tweet")
    //   .text(tweet.content.text);
    // let $hr = $("<hr>").addClass("flex-hor");
    // let $footer = $("<footer>").addClass("flex-hor");
    // let $daysAgo = $("<span>").addClass("posted-date").text(tweet.created_at);
    // let $iconDiv = $("<div>").addClass("flex-hor tweet-icon");
    // let $flagIcon = $("<i>").addClass("fa fa-flag");
    // let $heartIcon = $("<i>").addClass("fa fa-heart");
    // let $retweetIcon = $("<i>").addClass("fa fa-retweet");

    // //Append elements into the HTML
    // $tweet.append($header);
    // $header.append($flexRow);
    // $flexRow.append($avatar);
    // $flexRow.append($name);
    // $header.append($userID);
    // $tweet.append($postTweet);
    // $tweet.append($hr);
    // $tweet.append($footer);
    // $footer.append($daysAgo);
    // $footer.append($iconDiv);
    // $iconDiv.append($flagIcon);
    // $iconDiv.append($heartIcon);
    // $iconDiv.append($retweetIcon);

    //Using Escape function
    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //Helper function to calculate the day since created
    function ago(date) {
      const minutes = Math.ceil((Date.now() - date) / 60000);
      const hours = Math.ceil((Date.now() - date) / 60000 / 60);
      const days = Math.ceil((Date.now() - date) / 60000 / 60 / 24);
      const months = Math.ceil((Date.now() - date) / 60000 / 60 / 24 / 30);
      const years = Math.ceil((Date.now() - date) / 60000 / 60 / 24 / 365);
      if (minutes < 60) {
        return `${minutes} minutes ago`;
      }
      if (hours < 24) {
        return `${hours} hours ago`;
      }
      if (days < 31) {
        return `${days} days ago`;
      }
      if (months < 12) {
        return `${months} months ago`;
      }
      return `${years} years ago`;
    }

    let $tweet = `
              <div class="posted-area">
            <header class="flex-hor">
              <div class="flex-row">
                <img src=${tweet.user.avatars} width="50" alt="" />
                <div class="user-name">${tweet.user.name}</div>
              </div>
              <div class="user-id hidden">${tweet.user.handle}</div>
            </header>
            <h3 class="posted-tweet">${escape(tweet.content.text)}</h3>
            <hr class="flex-hor" />
            <footer class="flex-hor footer">
              <p class="posted-date">${ago(tweet.created_at)}</p>
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

  //New Tweet Compose Display
  $(".tweetBtn").click(function () {
    if ($("form").first().is(":hidden")) {
      $("form").show("slow");
    } else {
      $("form").slideUp();
    }
  });

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
      $errorBox.slideUp("fast");
      $.ajax({
        url: $("form").attr("action"),
        type: "POST",
        data: $("form").serialize(),
        complete: function () {
          loadTweets();
          $("#tweet-text").val("");
          $("#counter").text("140").removeClass("warning");
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
