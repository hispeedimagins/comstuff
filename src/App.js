
//import extractContent from '/js/ExtractContent';
//import { immutableAccessor } from '/js/Accessor';
//'use strict';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: this.props.articles,
      usenewlayout:this.props.usenewlayout,
    numbergot:this.props.numbergot,
     usebig:false };
     // steem.api.getDiscussionsByTrending(query, function(err, result) {
     //   if(result){
     //     this.setState({articles:result,numbergot:20,usebig:true});
     //      AddTheStuff(result);
     //
     //   }
     // });
     //this.setItsState(this.props);
     //this.AddTheStuff(this.props.articles);
  }

  AddTheStuff(result){
    //console.log(result);
    //console.log(this.state.numbergot);

    let articlebig = document.querySelector('#articlebig');
    let articlesmall = document.querySelector('#articlesmall');
    let usesh = articlesmall;
    let usebig = false;
    for(var i = 0;i < result.length;i++){
      // if(i == 0){
      //   usesh = articlebig;
      //   usebig = true;
      //   this.renderArticle(result[i],usebig,usesh,i);
      // } else{
      //   usesh = articlesmall;
      //   usebig = false;
      //   this.renderOtherOnes(result[i],usebig,usesh,i);
      // }
      //var usesh = (i === 0) ? articlebig : articlesmall;

      console.log(usebig);
      console.log(usesh);
      //console.log(result[i]);
      //return(ReactDOM.render());

    }
  }

  renderOtherOnes(article,usebig){
    console.log("rendering artile");
    let jsmeta = JSON.parse(article.json_metadata);
    console.log(jsmeta);
    let fimage = "";
    if(jsmeta.image){
        fimage = jsmeta.image[0];
    } else if(jsmeta.thumbnail){
        fimage = jsmeta.thumbnail;
    }

    var divStyle = {
      //color: 'white',
      background: 'url(' + fimage + ') no-repeat center center'
      //WebkitTransition: 'all', // note the capital 'W' here
      //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
    };
    let classname = "featured-article-small";
    if(usebig){
      classname = "featured-article-big";
    }

    return (

      <a key={article.permlink} href="#">
        <div className={classname}
          style={divStyle}
        >
          <div className="featured-article-tag">
            <span className="label">in {article.category}</span>
          </div>
          <div className="featured-article-text">
            <p className="featured-article-title">{article.title} <span className="author">by {article.author}</span></p>



          </div>
        </div>
      </a>

    );
  }

   renderArticle(article,usebig,usesh,valueofi){
      ReactDOM.render(
        <ArticleHolder article={article}
        usebig = {usebig}
        iIs = {valueofi}
        />,usesh
      );

  }

  checkstate(){
    var set = this.state.liked;
    this.setState({liked:!set});
  }

  setItsState(props){
    var num = props.numbergot;
    num += 20;
    console.log(num);
    this.setState({articles:props.articles,numbergot:num,usebig:true});
    console.log("state set");
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    let usebigs = this.props.usebig;
    let useNewLayout = this.props.usenewlayout;
    //console.log(article);
    //let descrip = extractContent(immutableAccessor, article.body).desc;
    //console.log(descrip);
    return (
      this.props.articles.map(function(article){
        console.log("rendering artile");
        let jsmeta = JSON.parse(article.json_metadata);
        //console.log(jsmeta);
        let mydesc = extractContent(immutableAccessor, article).desc;
        let fimage = "";
        if(jsmeta.image){
            fimage = jsmeta.image[0];
        } else if(jsmeta.thumbnail){
            fimage = jsmeta.thumbnail;
        }

        let payout = article.total_payout_value;
        if(payout == "0.000 SBD"){
          payout = article.pending_payout_value;
        }

        let aure = repLog10(article.author_reputation);
        var divStyle = {
          //color: 'white',
          background: 'url(' + fimage + ') no-repeat center center'
          //WebkitTransition: 'all', // note the capital 'W' here
          //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };
        let classname = "themePrimaryShadow featured-article-small";
        if(usebigs){
          classname = "themePrimaryShadow featured-article-big";
        }

        var arturl = "article.html?username="+article.author +"&tag="+article.category +"&permlink="+article.permlink;// encodeURI(article.category+"/@"+article.author+"/"+article.permlink);



        if(useNewLayout == "trending"){
          return(
            <article className="mini-post">
											<header>
												<h3><a href={arturl}>{article.title}</a></h3>
                        <h6><a>By {article.author} ({aure})</a></h6>
												<time className="published" dateTime={convertDate(article.created)}>{convertDate(article.created)}</time>
												<a href="#" className="author"><img src={getProfileImageUrl(article.author)} alt="" /></a>
											</header>
											<a href={arturl} className="image"><img src={fimage} alt="" /></a>
										</article>
          );

        } else if(useNewLayout == "hot"){

          return(
            <li>
										<article>
											<header>
												<h3><a href={arturl}>{article.title}</a></h3>
                        <h6><a>By {article.author} ({aure})</a></h6>
												<time className="published" dateTime={convertDate(article.created)}>{convertDate(article.created)}</time>
											</header>
											<a href={arturl} className="image"><img src={fimage} alt="" /></a>
										</article>
									</li>
          );

        } else if(useNewLayout == "created"){
          return(
            <article className="post">
								<header>
									<div className="title">
										<h2><a href={arturl}>{article.title}</a></h2>
										<p>Lorem ipsum dolor amet nullam consequat etiam feugiat</p>
									</div>
									<div className="meta">
										<time className="published" dateTime={convertDate(article.created)}>{convertDate(article.created)}</time>
										<a href="#" className="author"><span className="name">{article.author} ({aure})</span><img src={getProfileImageUrl(article.author)} alt="" /></a>
									</div>
								</header>
								<a href={arturl} className="image featured"><img src={fimage} alt="" /></a>
								<p>{mydesc}</p>
								<footer>
									<ul className="actions">
										<li><a href={arturl} className="button large">Continue Reading</a></li>
									</ul>
									<ul className="stats">
										<li><a href="#">{article.category}</a></li>
                    <li><a href="#" className="icon fa-dollar payoutanchor">{payout}</a></li>
										<li><a href="#" className="icon fa-heart">{article.net_votes}</a></li>
										<li><a href="#" className="icon fa-comment">{article.children}</a></li>
									</ul>
								</footer>
							</article>
          );
        }

        // if(useNewLayout){
        //   return(
        //     <div key={article.id} className="grid-x grid-margin-x themePrimaryShadow themeMarginOnlyTop themePrimaryglassfull themepadding">
        //       <div className="large-6 cell">
        //         <p><img src={fimage} alt="image for article" alt="article preview image"/></p>
        //       </div>
        //       <div className="large-6 cell">
        //         <h5><a href={arturl}>{article.title}</a></h5>
        //          <p>
        //            <span><i className="fi-torso"> By {article.author} &nbsp;&nbsp;</i></span>
        //            <span><i className="fi-calendar"> {convertDate(article.created)} &nbsp;&nbsp;</i></span>
        //            <span><i className="fi-comments"> {article.children}</i></span>
        //            </p>
        //           <p>{mydesc}</p>
        //       </div>
        //     </div>
            
        //   );
        // } else{
        //   return (
        //     <div key={article.id} className="cell">
        //       {/* <a key={article.permlink} href="#"> */}
        //         <div className={classname}
        //           style={divStyle}
        //         >
        //           <div className="featured-article-tag">
        //             <span className="label">in {article.category}</span>
        //           </div>
        //           <div className="featured-article-text">
        //             <p className="featured-article-title themepadding">
        //             <a href={arturl}>{article.title}</a>  
        //             <span className="author">by {article.author}</span></p>
    
    
    
        //           </div>
        //         </div>
        //       {/* </a> */}
        //     </div>
        //     );
        // }
        
      })
      // <a href="#0" class="button" onClick={() => this.checkstate() }>
      //   {this.state.liked.toString()}
      // </a>
    );
  }
}
