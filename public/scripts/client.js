$(document).ready(function () {
  // Mapping the tweets
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    return tweets.map((tweet) =>
      $("#tweets-container").append(createTweetElement(tweet))
    );
  };

  // Tweet elements
  const createTweetElement = function (tweet) {
    //Using Escape function
    const escape = function (str) {
      const div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    //Helper function to calculate the day since created
    const ago = function (date) {
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
    };

    let $tweet = `
              <article class="tweet-box">
            <header class="flex-hor">
              <div class="flex-row marginL">
                <img src=${tweet.user.avatars} width="50" alt="" />
                <span class="name">${tweet.user.name}</span>
              </div>
              <span class="handle hidden">${tweet.user.handle}</span>
            </header>
            <h3>${escape(tweet.content.text)}</h3>
            <hr class="flex-hor" />
            <footer class="flex-hor marginL">
              <p >${ago(tweet.created_at)}</p>
              <div class="flex-hor hidden">
                <i class="fa fa-flag" aria-hidden="true"></i>
                <i class="fa fa-retweet" aria-hidden="true"></i>
                <i class="fa fa-heart" aria-hidden="true"></i>
              </div>
            </footer>
          </article>
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
  const $errorBox = $(".error-box");
  const $errorMsg = $(".error-msg");

  //

  // Form Submitting Action / POST
  $("form").submit(function (event) {
    event.preventDefault();
    if (!$("#new-text").val()) {
      $errorBox.show();
      $errorMsg.text("You cannot tweet empty tweet.");
      return;
    }
    if ($("#new-text").val().length > 140) {
      $errorBox.show();
      $errorMsg.text("Sorry your tweet exceeds the 140 character limit");
      return;
    } else {
      $errorBox.slideUp("fast");
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $(this).serialize(),
        complete: function () {
          loadTweets();
          $("#new-text").val("");
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

  //Score button to the top
  const $btnTop = $("#toTop");

  window.onscroll = function () {
    scrollFunction();
  };

  // When the user scrolls down 20px from the top of the document, show the button
  const scrollFunction = function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $btnTop.addClass("visible");
    } else {
      $btnTop.addClass("hidden").removeClass("visible");
    }
  };

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  $btnTop.click(function () {
    topFunction();
    $("form").show("fast");
  });
});
