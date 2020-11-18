// Fake data taken from initial-tweets.json
$(document).ready(function () {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];

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

  renderTweets(data);
});
