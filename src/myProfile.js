//declare variables needed
var imagep;
var uname;
var website;
var status;
var sp;
var follower_count;
var following_count;
var pro;


//fetch a users profile
function getProfile(username){
    console.log("gprojcalled",username);
    steem.api.getAccounts([username], function(err, response){
        var z = response[0];
        pro = z;
        //fetch the dynamic properties of steem and pass the username to use to it
        getDynamicProps(username);

        //extranct reputation
        var rep = z.reputation;
        //extranct json data and parse it
        var js = JSON.parse(z.json_metadata);
        //if the profile in json has a name use that or use the username, format the rep using steem.js
        var names = ((js.profile.name)?js.profile.name:z.name) + " ("+steem.formatter.reputation(rep)+")";
        uname = names;

        //extract other data
        website = (js.profile.website)?js.profile.website:"";
        status = (js.profile.about)?js.profile.about:"";
        imagep = getProfileImageUrl(username);
        //render the profile with what we have for now
        renderTheIntro();
        });
}

function getDynamicProps(username){
    steem.api.getDynamicGlobalProperties(function(err, result) {
        console.log(err, result);
        //extract data
        var totalVestingShares = result.total_vesting_shares;
        var totalVestingFundSteem = result.total_vesting_fund_steem;
        
        //convert the vesting,received and delegated shares to a number by the built in number function
        //remove out the vests from the end and reply with a blank, trim the result
        var vs = Number(pro.vesting_shares.replace("VESTS","").trim());
        var rs = Number(pro.received_vesting_shares.replace("VESTS","").trim());
        var ds = Number(pro.delegated_vesting_shares.replace("VESTS","").trim());
        
        //the final vests are vesting + received - delegated
        var vss = (vs + rs) - ds;
        //console.log("vss",vss);
        //calculate the steem power via the library
        var steemPower = steem.formatter.vestToSteem(vss, totalVestingShares, totalVestingFundSteem);
        //we do not need the points so get rid of them
        steemPower = parseInt(steemPower);
        //console.log(steemPower);
        //document.getElementById("sp").innerHTML = steemPower + " SP";
        sp = steemPower + " SP";
        //render what we have again in the intro
        renderTheIntro();
        getFollowCount(username);
    });
}

function getBlog(username){
    steem.api.getState('/@'+username+'/blog', function(err, result) {
        console.log(err, result);

        var blog = result.accounts[username].blog;
        var jsme = JSON.parse(result.accounts[username].json_metadata);
        var rep =  result.accounts[username].reputation;
        console.log("blog",blog,jsme);
        document.getElementById("pname").innerText = jsme.profile.name + " ("+steem.formatter.reputation(rep)+")";
        document.getElementById("website").innerText = (jsme.profile.website)?jsme.profile.website:"";
        document.getElementById("pstatus").innerText = (jsme.profile.about)?jsme.profile.about:"";
        var content = result.content;

    });
}

//fetch the follow count of the user
function getFollowCount(username){
    steem.api.getFollowCount(username, function(err, result) {
        console.log(err, result);
        follower_count = result.follower_count;
        following_count = result.following_count;
        //render the intro again
        renderTheIntro();

      });
}


//for laoding the users posts
function loadcreatedP(q){
    console.log("loading blog",q);
  $('#loadiehere').loadie(0.75);
  steem.api.getDiscussionsByBlog(q, function(err, result) {
    $('#loadiehere').loadie(1);
    let domContainer = document.querySelector('#main');
    //concact the results to the list and re-render them
    bList = bList.concat(result);
    //console.log("mainlist",bList);
    ReactDOM.render(<App
      articles = {bList }
      usenewlayout="created"
      numbergot = {20}
      usebig = {false}/>,domContainer);
  });
}

//load more of the users posts
function loadMoreNowP(){
    
    var a = bList;
    //get the last one from the list
    var al = a.pop();
    $('#loadiehere').loadie(0.25);
    console.log("last",al.id,bList.length);
    var na = (useAsPersonalWebsite) ? personalWebsiteUsernameSteem : username;
    //create the object using the last item from the list, 
    //we do nto need to push as steem returns the last one as well included in the results
    var q = {"tag":na,"limit":"20","start_author":al.root_author,"start_permlink":al.root_permlink};
    loadcreatedP(q);
  }


  //for rendering the intro profile
  function renderTheIntro(){
    var domContainer = document.getElementById("intro");
    console.log("sp ",sp);
    ReactDOM.render(<Intro
        image = { imagep }
        name={uname}
        website = {website}
        sp = {sp}
        follower_count = {follower_count}
        following_count = {following_count}
        status = {status}/>,domContainer);
  }