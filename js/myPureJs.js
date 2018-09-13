var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
function removeTags(html) {
  var oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}


function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function convertDate(date) {
  var dat = new Date(date + "+0000");
  var datn = new Date();
  if (datn.getFullYear != dat.getFullYear) {
    return dat.toLocaleString();
  } else {
    return checkForLessThanTen(dat.getDate()) + "/" + checkForLessThanTen(dat.getMonth()) + " at " + checkForLessThanTen(dat.getHours()) + ":" + checkForLessThanTen(dat.getMinutes());
  }
}

function checkForLessThanTen(data) {
  return data < 10 ? "0" + data : data;
}

function getProfileImageUrl(username){
  return "https://cdn.steemitimages.com/u/"+username+"/avatar/medium";
}


$('#loadiehere').loadie();
$('#loadiehere').loadie(loadieStartPercent);

// $(window).bind('popstate', function(event) {
//   console.log(window.event.state);
//   alert(window.event.state);
// });

// console.log(history);