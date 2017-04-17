const page = require('webpage').create();
const fs = require('fs');

page.settings.loadImages = false;
page.viewportSize = { width: 1014, height: 800 };

page.onConsoleMessage = function (msg, lineNum, sourceId) {
  console.log('CONSOLE: ' + msg + ' (from line #' + lineNum + ' in "' + sourceId + '")');
};

page.onLoadFinished = function () {
  const href = page.evaluate(function () {
    return window.location.href;
  });

  console.log('Page loaded, current url is: ', href);
};

console.log('starting');
page.open('https://www.facebook.com/login.php', function (status) {
  console.log('open login status', status, document);
  if (status === 'success') {
    const result = page.evaluate(function () {
        //fill your facebook acccount and password here.
        document.getElementById('email').value = '';
        document.getElementById('pass').value = '';
        return document.querySelector('form').submit();
      });

    console.log('evaluate result', result);

    window.setTimeout(function () {
      // fill your friend's facebook id here
      crawlFriendList('');
    }, 2000);
  }
});

// function crawlFriendList(userid) {
//   console.log('crawlFriendList', userid);
// }

function crawlFriendList(userid) {
  console.log('crawlFriendList', userid);
  const url = 'https://m.facebook.com/' + userid + '/friends';
  page.open(url, function (status) {
    console.log('open friend page', url, status);
    if (status === 'success') {
      const friendNodes = page.evaluate(function () {
        const nodes = document.querySelectorAll('a.darkTouch > i[role="img"]');
        var counter = 0;
        while(counter < nodes.length) {
          console.log(nodes[counter].getAttribute('aria-label'));
          counter = counter + 1;
        }
      });
    }
  });
}

