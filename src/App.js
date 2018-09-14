

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: this.props.articles,
      usenewlayout:this.props.usenewlayout,
    numbergot:this.props.numbergot,
     usebig:false };

  }

  AddTheStuff(result){
    let articlebig = document.querySelector('#articlebig');
    let articlesmall = document.querySelector('#articlesmall');
    let usesh = articlesmall;
    let usebig = false;
    for(var i = 0;i < result.length;i++){


      console.log(usebig);
      console.log(usesh);


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


    //for returning we first map all the articles,
    //then for each one we decide who called it and
    //then return a layout for that one. 
    //It would have been efficient a different way but I was 
    //just learning and did this. 
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

        //for calculating the rep using steems js file
        let aure = repLog10(article.author_reputation);

        //we use this to set the style if needed as the image background. Not being used atm.
        var divStyle = {
          //color: 'white',
          background: 'url(' + fimage + ') no-repeat center center'
          //WebkitTransition: 'all', // note the capital 'W' here
          //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

        //class name changes according to the layout, if big or small.
        let classname = "themePrimaryShadow featured-article-small";
        if(usebigs){
          classname = "themePrimaryShadow featured-article-big";
        }

        //The article url is put into this variable and used throughout
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

        
        
      })
      // <a href="#0" class="button" onClick={() => this.checkstate() }>
      //   {this.state.liked.toString()}
      // </a>
    );
  }
}
