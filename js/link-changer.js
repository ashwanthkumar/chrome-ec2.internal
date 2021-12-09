// Regex that matches and extracts the ip segments out of - ip-10-181-31-23.ec2.internal
const LINK_MATCHER = /ip-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3}).ec2.internal/ig;

// Ref - https://stackoverflow.com/a/7053197/11474419
function ready(callback) {
  // in case the document is already rendered
  if (document.readyState != 'loading') callback();
  // modern browsers
  else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
  // IE <= 8
  else document.attachEvent('onreadystatechange', function () {
    if (document.readyState == 'complete') callback();
  });
}

chrome.extension.sendMessage({}, function (response) {
  ready(function () {
    let observer = new MutationObserver(function (mutations) {
      const nodes = document.querySelectorAll("a[href*='.ec2.internal']");
      nodes.forEach(function (element) {
        let href = element.getAttribute('href');
        let newHref = href.replace(LINK_MATCHER, "$1.$2.$3.$4");
        element.setAttribute('href', newHref);
      })
    });

    observer.observe(document, { attributes: false, childList: true, characterData: false, subtree: true });
  });
});
