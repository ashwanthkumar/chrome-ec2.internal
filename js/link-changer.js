// Regex that matches and extracts the ip segments out of - ip-10-181-31-23.ec2.internal
var LINK_MATCHER = /ip-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3}).ec2.internal/ig;

chrome.extension.sendMessage({}, function(response) {
  $(document).ready(function() {
    $.each(jQuery("a[href*='.ec2.internal']"), function(idx, data) {
      var href = $(data).attr('href');
      var newHref = href.replace(LINK_MATCHER, "$1.$2.$3.$4");
      $(data).attr('href', newHref);
    });
  });
});
