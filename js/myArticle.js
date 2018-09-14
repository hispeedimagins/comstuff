//Starts the get article process.
var username = getParameterByName('username');
var tag = getParameterByName('tag');
var permlink = getParameterByName('permlink');
var q = tag+"/@"+username +"/"+permlink;
var userget = username+"/"+permlink;

console.log(username);
console.log(tag);
console.log(permlink);
console.log(q);

getArticle(username,tag,permlink);

