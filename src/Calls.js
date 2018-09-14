

//This gets one specific article. Uses the tag, permlink and username.
//Can be made sleeker and better.
function getArticle(username,tag,permlink){
  
    var q = tag+"/@"+username +"/"+permlink;
    var userget = username+"/"+permlink;
    var commentList = [];

    //Use the steemapi to fetch the article
    steem.api.getState(q, function(err, result) {
      //set loadie to display progress
      $('#loadiehere').loadie(0.4);
      var content = result.content;
      console.log(userget,content);
      var arts = result.content[userget];
      let domContainer = document.querySelector('#root');
  
      const pending_payout = parsePayoutAmount(arts.pending_payout_value);
      const total_payout = parsePayoutAmount(arts.total_payout_value);
      const high_quality_post = pending_payout + total_payout > 10.0;
      const full_power = arts.percent_steem_dollars === 0;
      console.log(pending_payout,total_payout,high_quality_post,full_power);

      //Render the article. We set is comment false for an article. Duh.
    ReactDOM.render(
        <PostAndCommentHolder
          key={arts.id}
          article={arts}
          isComment={false}
        />,
        domContainer
      );
      //increase the loadie progress.
      $('#loadiehere').loadie(0.6);
      console.log(arts);

      //Check if replies aka comments exist.
      if(arts.replies){
        let comments = document.querySelector('#comments');
        var ncom = replies(arts,result,commentList,1);
        console.log(ncom);
        
        //Render the list of comments here.
        ReactDOM.render(
          ncom,
          comments
        );

      }
      //Set loadie to indicate full progress.
      $('#loadiehere').loadie(1);
    });
  }


  //Builds a list of React elements
  function replies(art,result,commentList,margin){
    console.log("rep reached");
    for(var i = 0; i < art.replies.length;i++){
      var userget = art.replies[i];
      var arts = result.content[userget];
      var oa = (<PostAndCommentHolder
        key={arts.id}
        article={arts}
        result={result}
        isComment={true}
        margin={margin}
      />);
      commentList.push(oa);
      if(arts.replies){
        //increase the margin if the comment is a reply.
        margin++;
        replies(arts,result,commentList,margin);
      }
    }
    return commentList;
  }
  