var query = {"tag":"comedyopenmic","limit":"20"};
steem.api.getDiscussionsByTrending(query, function(err, result) {
  $('#loadiehere').loadie(0.5);
  if(result){
    //this.setState({articles:result,numbergot:20,usebig:true});
     //AddTheStuff(result);
     //let domContainer = document.querySelector('#root');
     let articlebig = document.querySelector('#trending');
     //let articlesmall = document.querySelector('#articlesmall');
     //AddArticles(result);
     ReactDOM.render(<App
       articles = {result }
       numbergot = {20}
       usenewlayout="trending"
       usebig = {true}/>,articlebig);

      //  ReactDOM.render(<App

      //    articles = {result.splice(1,3) }
      //    numbergot = {20}
      //    usebig = {false}/>,articlesmall);

  }
  });

steem.api.getDiscussionsByHot(query, function(err, result) {
  $('#loadiehere').loadie(0.8);
  let domContainer = document.querySelector('#hot');
  ReactDOM.render(<App
    articles = {result }
    usenewlayout="hot"
    numbergot = {20}
    usebig = {false}/>,domContainer);
});

steem.api.getDiscussionsByCreated(query, function(err, result) {
  $('#loadiehere').loadie(1);
  let domContainer = document.querySelector('#main');
  ReactDOM.render(<App
    articles = {result }
    usenewlayout="created"
    numbergot = {20}
    usebig = {false}/>,domContainer);
});





function convertDate(date){
  var dat = new Date(date + "+0000");
  var datn = new Date();
  if(datn.getFullYear != dat.getFullYear){
    return dat.toLocaleString();
  } else{
    return checkForLessThanTen(dat.getDate()) + "/" + checkForLessThanTen(dat.getMonth()) + " at "+ checkForLessThanTen(dat.getHours())+":"+ checkForLessThanTen(dat.getMinutes());
  }
}

function checkForLessThanTen(data){
  return (data < 10 ? "0"+data : data);
}

function  AddArticles(result){
    //console.log(result);
    //console.log(this.state.numbergot);

    let articlebig = document.querySelector('#articlebig');
    let articlesmall = document.querySelector('#articlesmall');
    let usesh = articlesmall;
    let usebig = false;
    for(var i = 0;i < 3;i++){
      if(i == 0){
        usesh = articlebig;
        usebig = true;
      } else{
        usesh = articlesmall;
        usebig = false;
      }
      //var usesh = (i === 0) ? articlebig : articlesmall;

      console.log(usebig);
      console.log(usesh);
      console.log(i);
      //console.log(result[i]);
      //return(ReactDOM.render());
      renderArticles(result[i],usebig,usesh,i);
    }
  }




 function renderArticle(article,usebig,usesh,valueofi){
      ReactDOM.render(
        <ArticleHolder article={article}
        usebig = {usebig}
        iIs = {valueofi}
        />,usesh
      );

  }
