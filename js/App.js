'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { articles: _this.props.articles,
      usenewlayout: _this.props.usenewlayout,
      numbergot: _this.props.numbergot,
      usebig: false };

    return _this;
  }

  _createClass(App, [{
    key: 'AddTheStuff',
    value: function AddTheStuff(result) {
      var articlebig = document.querySelector('#articlebig');
      var articlesmall = document.querySelector('#articlesmall');
      var usesh = articlesmall;
      var usebig = false;
      for (var i = 0; i < result.length; i++) {

        console.log(usebig);
        console.log(usesh);
      }
    }
  }, {
    key: 'renderOtherOnes',
    value: function renderOtherOnes(article, usebig) {
      console.log("rendering artile");
      var jsmeta = JSON.parse(article.json_metadata);
      console.log(jsmeta);
      var fimage = "";
      if (jsmeta.image) {
        fimage = jsmeta.image[0];
      } else if (jsmeta.thumbnail) {
        fimage = jsmeta.thumbnail;
      }

      var divStyle = {
        //color: 'white',
        background: 'url(' + fimage + ') no-repeat center center'
        //WebkitTransition: 'all', // note the capital 'W' here
        //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
      };
      var classname = "featured-article-small";
      if (usebig) {
        classname = "featured-article-big";
      }

      return React.createElement(
        'a',
        { key: article.permlink, href: '#' },
        React.createElement(
          'div',
          { className: classname,
            style: divStyle
          },
          React.createElement(
            'div',
            { className: 'featured-article-tag' },
            React.createElement(
              'span',
              { className: 'label' },
              'in ',
              article.category
            )
          ),
          React.createElement(
            'div',
            { className: 'featured-article-text' },
            React.createElement(
              'p',
              { className: 'featured-article-title' },
              article.title,
              ' ',
              React.createElement(
                'span',
                { className: 'author' },
                'by ',
                article.author
              )
            )
          )
        )
      );
    }
  }, {
    key: 'renderArticle',
    value: function renderArticle(article, usebig, usesh, valueofi) {
      ReactDOM.render(React.createElement(ArticleHolder, { article: article,
        usebig: usebig,
        iIs: valueofi
      }), usesh);
    }
  }, {
    key: 'checkstate',
    value: function checkstate() {
      var set = this.state.liked;
      this.setState({ liked: !set });
    }
  }, {
    key: 'setItsState',
    value: function setItsState(props) {
      var num = props.numbergot;
      num += 20;
      console.log(num);
      this.setState({ articles: props.articles, numbergot: num, usebig: true });
      console.log("state set");
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      console.log("ns ", nextProps, nextState);
      if (nextProps.articles.length > this.state.articles.length) {
        this.setState({ articles: nextProps.articles,
          usenewlayout: nextProps.usenewlayout,
          numbergot: nextProps.numbergot,
          usebig: false });
        return true;
      }
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      // if (this.state.liked) {
      //   return 'You liked this.';
      // }

      var usebigs = this.props.usebig;
      var useNewLayout = this.props.usenewlayout;
      //console.log(article);
      //let descrip = extractContent(immutableAccessor, article.body).desc;
      //console.log(descrip);


      //for returning we first map all the articles,
      //then for each one we decide who called it and
      //then return a layout for that one. 
      //It would have been efficient a different way but I was 
      //just learning and did this. 
      return this.state.articles.map(function (article) {
        //check for weird cases where article was null
        if (!article) {
          return;
        }
        console.log("rendering artile");
        var jsmeta = JSON.parse(article.json_metadata);
        //console.log(jsmeta);
        var mydesc = extractContent(immutableAccessor, article).desc;
        var fimage = "";
        if (jsmeta.image) {
          fimage = jsmeta.image[0];
        } else if (jsmeta.thumbnail) {
          fimage = jsmeta.thumbnail;
        }

        var payout = article.total_payout_value;
        if (payout == "0.000 SBD") {
          payout = article.pending_payout_value;
        }

        //for calculating the rep using steems js file
        var aure = repLog10(article.author_reputation);

        //we use this to set the style if needed as the image background. Not being used atm.
        var divStyle = {
          //color: 'white',
          background: 'url(' + fimage + ') no-repeat center center'
          //WebkitTransition: 'all', // note the capital 'W' here
          //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
        };

        //class name changes according to the layout, if big or small.
        var classname = "themePrimaryShadow featured-article-small";
        if (usebigs) {
          classname = "themePrimaryShadow featured-article-big";
        }

        //The article url is put into this variable and used throughout
        var arturl = "article.html?username=" + article.author + "&tag=" + article.category + "&permlink=" + article.permlink; // encodeURI(article.category+"/@"+article.author+"/"+article.permlink);
        //author url
        var authurl = "profile.html?username=" + article.author; // encodeURI(article.category+"/@"+article.author+"/"+article.permlink);

        //add the key to make them unique
        if (useNewLayout == "trending") {
          return React.createElement(
            'article',
            { key: article.id, className: 'mini-post' },
            React.createElement(
              'header',
              null,
              React.createElement(
                'h3',
                null,
                React.createElement(
                  'a',
                  { href: arturl },
                  article.title
                )
              ),
              React.createElement(
                'h6',
                null,
                React.createElement(
                  'a',
                  null,
                  'By ',
                  article.author,
                  ' (',
                  aure,
                  ')'
                )
              ),
              React.createElement(
                'time',
                { className: 'published', dateTime: convertDate(article.created) },
                convertDate(article.created)
              ),
              React.createElement(
                'a',
                { href: '#', className: 'author' },
                React.createElement('img', { src: getProfileImageUrl(article.author), alt: '' })
              )
            ),
            React.createElement(
              'a',
              { href: arturl, className: 'image' },
              React.createElement('img', { src: fimage, alt: '' })
            )
          );
        } else if (useNewLayout == "hot") {

          return React.createElement(
            'li',
            { key: article.id },
            React.createElement(
              'article',
              null,
              React.createElement(
                'header',
                null,
                React.createElement(
                  'h3',
                  null,
                  React.createElement(
                    'a',
                    { href: arturl },
                    article.title
                  )
                ),
                React.createElement(
                  'h6',
                  null,
                  React.createElement(
                    'a',
                    null,
                    'By ',
                    article.author,
                    ' (',
                    aure,
                    ')'
                  )
                ),
                React.createElement(
                  'time',
                  { className: 'published', dateTime: convertDate(article.created) },
                  convertDate(article.created)
                )
              ),
              React.createElement(
                'a',
                { href: arturl, className: 'image' },
                React.createElement('img', { src: fimage, alt: '' })
              )
            )
          );
        } else if (useNewLayout == "created") {
          return React.createElement(
            'article',
            { key: article.id, className: 'post' },
            React.createElement(
              'header',
              null,
              React.createElement(
                'div',
                { className: 'title' },
                React.createElement(
                  'h2',
                  null,
                  React.createElement(
                    'a',
                    { href: arturl },
                    article.title
                  )
                )
              ),
              React.createElement(
                'div',
                { className: 'meta' },
                React.createElement(
                  'time',
                  { className: 'published', dateTime: convertDate(article.created) },
                  convertDate(article.created)
                ),
                React.createElement(
                  'a',
                  { href: authurl, className: 'author' },
                  React.createElement(
                    'span',
                    { className: 'name' },
                    article.author,
                    ' (',
                    aure,
                    ')'
                  ),
                  React.createElement('img', { src: getProfileImageUrl(article.author), alt: '' })
                )
              )
            ),
            React.createElement(
              'a',
              { href: arturl, className: 'image featured' },
              React.createElement('img', { src: fimage, alt: '' })
            ),
            React.createElement(
              'p',
              null,
              mydesc
            ),
            React.createElement(
              'footer',
              null,
              React.createElement(
                'ul',
                { className: 'actions' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: arturl, className: 'button large' },
                    'Continue Reading'
                  )
                )
              ),
              React.createElement(
                'ul',
                { className: 'stats' },
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#' },
                    article.category
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', className: 'icon fa-dollar payoutanchor' },
                    payout
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', className: 'icon fa-heart' },
                    article.net_votes
                  )
                ),
                React.createElement(
                  'li',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', className: 'icon fa-comment' },
                    article.children
                  )
                )
              )
            )
          );
        }
      })
      // <a href="#0" class="button" onClick={() => this.checkstate() }>
      //   {this.state.liked.toString()}
      // </a>
      ;
    }
  }]);

  return App;
}(React.Component);