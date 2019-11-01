// if (window.location.protocol === "http:") window.location.protocol = "https:";

$(() => {
  /* Lemuel's clickDiv Code (i.e NOT MINES) */
  $(".clickDiv").each(function(i) {
    const div = $(this);
    div.attr("tabindex", i);
    div.click(() => (window.location.href = div.attr("data-href")));
  });
});
