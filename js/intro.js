"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Intro = function (_React$Component) {
    _inherits(Intro, _React$Component);

    function Intro(props) {
        _classCallCheck(this, Intro);

        var _this = _possibleConstructorReturn(this, (Intro.__proto__ || Object.getPrototypeOf(Intro)).call(this, props));

        _this.state = {
            image: _this.props.image,
            name: _this.props.name,
            sp: _this.props.sp,
            website: _this.props.website,
            status: _this.props.status,
            follower_count: _this.props.follower_count,
            following_count: _this.props.following_count
        };
        return _this;
    }

    _createClass(Intro, [{
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
            return true;
        }
    }, {
        key: "render",
        value: function render() {

            console.log("spn", this.props.sp);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "a",
                    { href: "#", className: "logo" },
                    React.createElement("img", { id: "ppic", className: "themePrimaryShadow", src: this.props.image, alt: "logo" })
                ),
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h2",
                        { id: "pname" },
                        this.props.name
                    ),
                    React.createElement(
                        "blockquote",
                        { id: "sp" },
                        this.props.sp
                    ),
                    React.createElement(
                        "p",
                        { id: "website" },
                        this.props.website
                    ),
                    React.createElement(
                        "p",
                        { id: "pstatus" },
                        this.props.status
                    ),
                    React.createElement(
                        "ul",
                        { id: "follow", className: "actions" },
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", className: "button" },
                                "Followers: ",
                                this.props.follower_count
                            )
                        ),
                        React.createElement(
                            "li",
                            null,
                            React.createElement(
                                "a",
                                { href: "#", className: "button" },
                                "Following: ",
                                this.props.following_count
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Intro;
}(React.Component);