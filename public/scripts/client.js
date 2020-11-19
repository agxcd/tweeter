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
    // let $tweet = `
    //           <div class="posted-area">
    //         <header class="flex-hor">
    //           <div class="flex-row">
    //             <img src=${tweet.user.avatars} width="50" alt="" />
    //             <div class="user-name">${tweet.user.name}</div>
    //           </div>
    //           <div class="user-id hidden">${tweet.user.handle}</div>
    //         </header>
    //         <h3 class="posted-tweet">${tweet.content.text}</h3>
    //         <hr class="flex-hor" />
    //         <footer class="flex-hor">
    //           <p class="posted-date">${tweet.created_at}</p>
    //           <div class="flex-hor tweet-icon">
    //             <i class="fa fa-flag"></i>
    //             <i class="fa fa-retweet"></i>
    //             <i class="fa fa-heart"></i>
    //           </div>
    //         </footer>
    //       </div>
    // `;

    //Define elements
    let $tweet = $("<div>").addClass("posted-area");
    let $header = $("<header>").addClass("flex-hor");
    let $flexRow = $("<div>").addClass("flex-row");
    let $avatar = $("<img>").addClass("avatar").attr("src", tweet.user.avatars);
    let $name = $("<div>").addClass("user-name").text(tweet.user.name);
    let $userID = $("<div>").addClass("user-id hidden").text(tweet.user.handle);
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
