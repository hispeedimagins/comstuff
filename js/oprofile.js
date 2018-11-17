
//this file is used only on the profile page and starts the process to get the profile,sp and follow count, then renders it
var username = getParameterByName('username');
var pro;
console.log(username);

var bList = [];
var queryi = {"tag":username,"limit":"20"};
getProfile(username);
loadcreatedP(queryi);