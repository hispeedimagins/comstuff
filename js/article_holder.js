"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Not in use atm I think, was used earlier.
var ArticleHolder = function (_React$Component) {
  _inherits(ArticleHolder, _React$Component);

  function ArticleHolder(props) {
    _classCallCheck(this, ArticleHolder);

    var _this = _possibleConstructorReturn(this, (ArticleHolder.__proto__ || Object.getPrototypeOf(ArticleHolder)).call(this, props));

    console.log(props);
    _this.state = { liked: false, article: _this.props.article, usebig: _this.props.usebig };
    return _this;
  }

  _createClass(ArticleHolder, [{
    key: "checkstate",
    value: function checkstate() {
      var set = this.state.liked;
      this.setState({ liked: !set });
    }
  }, {
    key: "render",
    value: function render() {
      console.log("rendering artile");
      var jsmeta = JSON.parse(this.props.article.json_metadata);
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
      if (this.props.usebig) {
        classname = "featured-article-big";
      }

      console.log(divStyle);
      return React.createElement(
        "a",
        { key: this.props.article.id, href: "#" },
        React.createElement(
          "div",
          { className: classname,
            style: divStyle
          },
          React.createElement(
            "div",
            { className: "featured-article-tag" },
            React.createElement(
              "span",
              { className: "label" },
              "in ",
              this.props.article.category
            )
          ),
          React.createElement(
            "div",
            { className: "featured-article-text" },
            React.createElement(
              "p",
              { className: "featured-article-title" },
              this.props.article.title,
              " ",
              React.createElement(
                "span",
                { className: "author" },
                "by ",
                this.props.article.author
              )
            )
          )
        )
      );
    }
  }]);

  return ArticleHolder;
}(React.Component);