"use strict";

//This is where we the trending, new, hot and other feeds using the steem library. The tag is filtered to comedyopenmic.
//The limit is set to 20. Pagination will be added later.
var query = { "tag": tagToUse, "limit": "20" };
var mainList = [];
var bList = [];
var username;

//comes via constants.js
if (useAsPersonalWebsite) {

  //remove the hot and trending sections as they are not 
  var sec = document.getElementById("sidebar");
  for (var i = 0; i < sec.childNodes.length; i++) {
    var curch = sec.childNodes[i];
    if (curch.id == "trendingSection" || curch.id == "hotSection") {
      sec.removeChild(curch);
    }
  }

  //load the profile picture, json_metadata and render a component
  getProfile(personalWebsiteUsernameSteem);
  var q = { "tag": personalWebsiteUsernameSteem, "limit": "20" };
  loadcreatedP(q);
} else {
  loadcreated(query);
  getTrending();
  getHot();
  getProfile(tagAccountname);
}

function getTrending() {
  steem.api.getDiscussionsByTrending(query, function (err, result) {
    $('#loadiehere').loadie(0.5);
    if (result) {
      //this.setState({articles:result,numbergot:20,usebig:true});
      //AddTheStuff(result);
      //let domContainer = document.querySelector('#root');
      var articlebig = document.querySelector('#trending');
      //let articlesmall = document.querySelector('#articlesmall');
      //AddArticles(result);
      ReactDOM.render(React.createElement(App, {
        articles: result,
        numbergot: 20,
        usenewlayout: "trending",
        usebig: true }), articlebig);

      //  ReactDOM.render(<App

      //    articles = {result.splice(1,3) }
      //    numbergot = {20}
      //    usebig = {false}/>,articlesmall);
    }
  });
}

function getHot() {
  steem.api.getDiscussionsByHot(query, function (err, result) {
    $('#loadiehere').loadie(0.8);
    var domContainer = document.querySelector('#hot');
    ReactDOM.render(React.createElement(App, {
      articles: result,
      usenewlayout: "hot",
      numbergot: 20,
      usebig: false }), domContainer);
  });
}

function loadcreated(q) {
  $('#loadiehere').loadie(0.75);
  steem.api.getDiscussionsByCreated(q, function (err, result) {
    $('#loadiehere').loadie(1);
    var domContainer = document.querySelector('#main');
    mainList = mainList.concat(result);
    console.log("mainlist", mainList);
    ReactDOM.render(React.createElement(App, {
      articles: mainList,
      usenewlayout: "created",
      numbergot: 20,
      usebig: false }), domContainer);
  });
}

function loadMoreNow() {
  console.log("loading more");

  if (useAsPersonalWebsite) {
    console.log("redirecting");
    loadMoreNowP();
    return;
  }
  console.log("notreachedhere");
  var a = mainList;
  var al = a.pop();
  //a.push(al);
  $('#loadiehere').loadie(0.25);
  console.log("last", al.id, mainList.length);
  var q = { "tag": "comedyopenmic", "limit": "20", "start_author": al.root_author, "start_permlink": al.root_permlink };
  loadcreated(q);
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

function AddArticles(result) {
  //console.log(result);
  //console.log(this.state.numbergot);

  var articlebig = document.querySelector('#articlebig');
  var articlesmall = document.querySelector('#articlesmall');
  var usesh = articlesmall;
  var usebig = false;
  for (var i = 0; i < 3; i++) {
    if (i == 0) {
      usesh = articlebig;
      usebig = true;
    } else {
      usesh = articlesmall;
      usebig = false;
    }
    //var usesh = (i === 0) ? articlebig : articlesmall;

    console.log(usebig);
    console.log(usesh);
    console.log(i);
    //console.log(result[i]);
    //return(ReactDOM.render());
    renderArticles(result[i], usebig, usesh, i);
  }
}

function renderArticle(article, usebig, usesh, valueofi) {
  ReactDOM.render(React.createElement(ArticleHolder, { article: article,
    usebig: usebig,
    iIs: valueofi
  }), usesh);
}