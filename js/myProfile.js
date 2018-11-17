"use strict";

//Starts the get article process.
// var username = getParameterByName('username');
// var pro;
// console.log(username);

// var bList = [];
// document.getElementById("ppic").src = getProfileImageUrl(username);
// document.getElementById("pname").innerText = username;

//getProfile(username);
//getBlog(username);
var imagep;
var uname;
var website;
var status;
var sp;
var follower_count;
var following_count;
var pro;

//console.log(domContainer);
function getProfile(username) {
    console.log("gprojcalled", username);
    steem.api.getAccounts([username], function (err, response) {
        var z = response[0];
        pro = z;
        console.log(z);
        getDynamicProps(username);
        var rep = z.reputation;
        var js = JSON.parse(z.json_metadata);
        var names = (js.profile.name ? js.profile.name : z.name) + " (" + steem.formatter.reputation(rep) + ")";
        uname = names;
        website = js.profile.website ? js.profile.website : "";
        status = js.profile.about ? js.profile.about : "";
        imagep = getProfileImageUrl(username);
        console.log("pr ", uname, website, status, imagep);
        renderTheIntro();
    });
}

function getDynamicProps(username) {
    steem.api.getDynamicGlobalProperties(function (err, result) {
        console.log(err, result);
        var totalVestingShares = result.total_vesting_shares;
        var totalVestingFundSteem = result.total_vesting_fund_steem;
        var vs = Number(pro.vesting_shares.replace("VESTS", "").trim());
        var rs = Number(pro.received_vesting_shares.replace("VESTS", "").trim());
        var ds = Number(pro.delegated_vesting_shares.replace("VESTS", "").trim());
        var vss = vs + rs - ds;
        console.log("vss", vss);
        var steemPower = steem.formatter.vestToSteem(vss, totalVestingShares, totalVestingFundSteem);
        steemPower = parseInt(steemPower);
        console.log(steemPower);
        //document.getElementById("sp").innerHTML = steemPower + " SP";
        sp = steemPower + " SP";
        renderTheIntro();
        getFollowCount(username);
    });
}

function getBlog(username) {
    steem.api.getState('/@' + username + '/blog', function (err, result) {
        console.log(err, result);

        var blog = result.accounts[username].blog;
        var jsme = JSON.parse(result.accounts[username].json_metadata);
        var rep = result.accounts[username].reputation;
        console.log("blog", blog, jsme);
        document.getElementById("pname").innerText = jsme.profile.name + " (" + steem.formatter.reputation(rep) + ")";
        document.getElementById("website").innerText = jsme.profile.website ? jsme.profile.website : "";
        document.getElementById("pstatus").innerText = jsme.profile.about ? jsme.profile.about : "";
        var content = result.content;
    });
}

function getFollowCount(username) {
    steem.api.getFollowCount(username, function (err, result) {
        console.log(err, result);
        // var i = "<p>"+"Followers: "+result.follower_count+"</p>";
        // var io = "<p>"+"Followers: "+result.following_count+"</p>";
        React.createElement(
            "li",
            null,
            React.createElement(
                "a",
                { href: "#", "class": "button" },
                "Learn More"
            )
        );
        var i = "<li>" + "<a href='#' class='button'>" + "Followers: " + result.follower_count + "</a>" + "</li>";
        var io = "<li>" + "<a href='#' class='button'>" + "Following: " + result.following_count + "</a>" + "</li>";
        //document.getElementById("follow").innerHTML = i + io;
        follower_count = result.follower_count;
        following_count = result.following_count;
        renderTheIntro();
    });
}

//loadcreatedP(queryi);
function loadcreatedP(q) {
    console.log("loading blog", q);
    $('#loadiehere').loadie(0.75);
    steem.api.getDiscussionsByBlog(q, function (err, result) {
        $('#loadiehere').loadie(1);
        var domContainer = document.querySelector('#main');
        bList = bList.concat(result);
        console.log("mainlist", bList);
        ReactDOM.render(React.createElement(App, {
            articles: bList,
            usenewlayout: "created",
            numbergot: 20,
            usebig: false }), domContainer);
    });
}

function loadMoreNowP() {
    var a = bList;
    var al = a.pop();
    //a.push(al);
    $('#loadiehere').loadie(0.25);
    console.log("last", al.id, bList.length);
    var na = useAsPersonalWebsite ? personalWebsiteUsernameSteem : username;
    var q = { "tag": na, "limit": "20", "start_author": al.root_author, "start_permlink": al.root_permlink };
    loadcreatedP(q);
}

function renderTheIntro() {
    var domContainer = document.getElementById("intro");
    console.log("sp ", sp);
    ReactDOM.render(React.createElement(Intro, {
        image: imagep,
        name: uname,
        website: website,
        sp: sp,
        follower_count: follower_count,
        following_count: following_count,
        status: status }), domContainer);
}