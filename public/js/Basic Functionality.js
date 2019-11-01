/* Clickable Div(s) */ /* ClickDiv */
$(".clickDiv").click(function() {
  location.href = $(this).attr("data-href");
});
