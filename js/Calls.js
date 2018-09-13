"use strict";

function getArticle(username, tag, permlink) {

  var q = tag + "/@" + username + "/" + permlink;
  var userget = username + "/" + permlink;
  var commentList = [];
  steem.api.getState(q, function (err, result) {
    $('#loadiehere').loadie(0.4);
    var content = result.content;
    console.log(userget, content);
    var arts = result.content[userget];
    var domContainer = document.querySelector('#root');

    var pending_payout = parsePayoutAmount(arts.pending_payout_value);
    var total_payout = parsePayoutAmount(arts.total_payout_value);
    var high_quality_post = pending_payout + total_payout > 10.0;
    var full_power = arts.percent_steem_dollars === 0;
    console.log(pending_payout, total_payout, high_quality_post, full_power);
    //   ReactDOM.render(
    //     <MarkdownViewer
    //       formId={arts.id + '-viewer'}
    //       text={arts.body}
    //       jsonMetadata={JSON.parse(arts.json_metadata)}
    //       large
    //       highQualityPost={high_quality_post}
    //       noImage={false}
    //       hideImages={false}
    //     />,
    //     domContainer
    //   );
    ReactDOM.render(React.createElement(PostAndCommentHolder, {
      key: arts.id,
      article: arts,
      isComment: false
    }), domContainer);
    $('#loadiehere').loadie(0.6);
    console.log(arts);
    if (arts.replies) {
      var comments = document.querySelector('#comments');

      var ncom = replies(arts, result, commentList, 1);
      console.log(ncom);

      ReactDOM.render(ncom, comments);
    }
    $('#loadiehere').loadie(1);
  });
}

function replies(art, result, commentList, margin) {
  console.log("rep reached");
  for (var i = 0; i < art.replies.length; i++) {
    var userget = art.replies[i];
    var arts = result.content[userget];
    var oa = React.createElement(PostAndCommentHolder, {
      key: arts.id,
      article: arts,
      result: result,
      isComment: true,
      margin: margin
    });
    commentList.push(oa);
    if (arts.replies) {
      margin++;
      replies(arts, result, commentList, margin);
    }
  }
  return commentList;
}