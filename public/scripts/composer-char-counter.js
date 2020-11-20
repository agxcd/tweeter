$(document).ready(function() {
  $("#tweet-text").on("keyup", function() {
    let remaining = 140 - $(this).val().length;
    const counter = $("#counter");
    counter.text(remaining);
    if (remaining > 10) {
      counter.removeClass("warning");
    } else if (remaining <= 10) {
      counter.addClass("warning");
    }
  });
});
