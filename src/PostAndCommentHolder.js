class PostAndCommentHolder extends React.Component{
    constructor(props) {
        super(props);
        //console.log(this.state);
        this.state = { 
            article: this.props.article,
            result:this.props.result,
            isComment : this.props.isComment,
            margin:this.props.margin
        };
         
      }


    

      //Render an article or a comment.
      render(){

                
                 var arts = this.props.article;
                 var margin = this.props.margin;
                let meta;
                try{
                    meta = JSON.parse(arts.json_metadata);
                } catch(exception){
                    console.log(exception,arts.json_metadata);
                }
                
                const pending_payout = parsePayoutAmount(arts.pending_payout_value);
                const total_payout = parsePayoutAmount(arts.total_payout_value);
                const high_quality_post = pending_payout + total_payout > 10.0;
                const full_power = arts.percent_steem_dollars === 0;

                var contentbody = (<MarkdownViewer
                    formId={arts.id + '-viewer'}
                    text={arts.body}
                    jsonMetadata={meta}
                    large
                    highQualityPost={high_quality_post}
                    noImage={false}
                    hideImages={false}
                />);

      
                 var lik = 0;

                 //if the margin is only one we shall use initial as the padding, this is the correct behaviour
                 var divStyle = {
                    //color: 'white',
                    paddingLeft: (margin == 1) ? "initial": (margin - 1)+'em'
                    //WebkitTransition: 'all', // note the capital 'W' here
                    //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
                  };

                  var collapse = {
                    //color: 'white',
                    visibility: 'collapse'
                    //WebkitTransition: 'all', // note the capital 'W' here
                    //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
                  };

                  //for making the flex to the start
                  var jus = {
                    mozJustifyContent: "-moz-flex-start",
                    webkitJustifyContent: "-webkit-flex-start",
                    msJustifyContent: "-ms-flex-start",
                    justifyContent: "flex-start",
                  };

                  let payout = arts.total_payout_value;
                if(payout == "0.000 SBD"){
                    payout = arts.pending_payout_value;
                }
                let aure = repLog10(arts.author_reputation);
                
        
            if(this.props.isComment){
                return(
                    <div style={divStyle} key={arts.id} >
                         <article className="post themeMarginOnlyTop">
                            {/* the old bulky header for comments is replaced with this one */}
                            <div className="meta">
                                <time className="published" dateTime={arts.created}>{convertDate(arts.created)}</time>
                                <a href="#" className="author" style={jus}>
                                    <span className="name">{arts.author} ({aure})</span>
                                    <img src={getProfileImageUrl(arts.author)} alt="" />
                                </a>
                            </div>
                            <hr/>
                                         {/* <span class="image featured"><img src="images/pic01.jpg" alt="" /></span> */}
                            {contentbody}
                            <footer>
                                 <ul className="stats">
                                 
                                 <li><a href="#" className="icon fa-dollar payoutanchor">{payout}</a></li>
                                     <li><a href="#" className="icon fa-heart">{arts.net_votes}</a></li>
                                     <li><a href="#" className="icon fa-comment">{arts.children}</a></li>
                                 { meta && meta.tags ? meta.tags.map(item => <li key={lik++} ><a href="#">{item}</a></li>) : <li key={lik++} ><a href="#">{arts.category}</a></li> } 
                                     
                                 </ul>
                            </footer>
                         </article>
                     </div>
                );



                
            } else{

                return(
                    <div key={arts.id} id="main">
                        <article className="post">
                            <header>
                                <div className="title">
                                    <h2><a href="#">{arts.title}</a></h2>
                                    <p>More shit to add over here</p>
                                </div>
                                <div className="meta">
                                    <time className="published" dateTime={arts.created}>{convertDate(arts.created)}</time>
                                    <a href="#" className="author">
                                        <span className="name">{arts.author} ({aure})</span>
                                        <img src={getProfileImageUrl(arts.author)} alt="" />
                                    </a>
                                </div>
                            </header>
                            {/* <span class="image featured"><img src="images/pic01.jpg" alt="" /></span> */}
                            {contentbody}
                            <footer>
                                <ul className="stats">
                                    <li><a href="#" className="icon fa-dollar payoutanchor">{payout}</a></li>
                                    <li><a href="#" className="icon fa-heart">{arts.net_votes}</a></li>
                                    <li><a href="#" className="icon fa-comment">{arts.children}</a></li>
                                    { meta && meta.tags ? meta.tags.map(item => <li key={lik++} ><a href="#">{item}</a></li>) : <li key={lik++} ><a href="#">{arts.category}</a></li> } 
                                   
                                </ul>
                            </footer>
                        </article>
        
                </div>
                  );
            }
          
      }
}