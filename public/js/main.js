if (location.protocol === "http:") location.protocol = "https:";

$(() => {
   /* Clickable Div(s) *//* ClickDiv */
  $(".clickDiv").click(function(){
    location.href = $(this).attr("data-href");
  });
});
