

class ArticleHolder extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { liked: false,article:this.props.article,usebig:this.props.usebig };
  }

  checkstate(){
    var set = this.state.liked;
    this.setState({liked:!set});
  }

  render() {
    console.log("rendering artile");
    let jsmeta = JSON.parse(this.props.article.json_metadata);
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
    if(this.props.usebig){
      classname = "featured-article-big";
    }

    console.log(divStyle);
      return (

        <a key={this.props.article.id} href="#">
          <div className={classname}
            style={divStyle}
          >
            <div className="featured-article-tag">
              <span className="label">in {this.props.article.category}</span>
            </div>
            <div className="featured-article-text">
              <p className="featured-article-title">{this.props.article.title} <span className="author">by {this.props.article.author}</span></p>



            </div>
          </div>
        </a>

      );
  }
}