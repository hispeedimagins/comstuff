"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//react element used for a header. So it is common all around.
var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Header, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    { id: "header" },
                    React.createElement(
                        "h1",
                        null,
                        React.createElement(
                            "a",
                            { href: "index.html" },
                            "Comedy Open Mic"
                        )
                    ),
                    React.createElement(
                        "nav",
                        { className: "links" },
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "Team"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "About"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    "Witness"
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-twitter" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        "Twitter"
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-facebook" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        "Facebook"
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-instagram" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        "Instagram"
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-500px" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        "500px"
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-envelope-o" },
                                    React.createElement(
                                        "span",
                                        { className: "label" },
                                        "Email"
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "nav",
                        { className: "main" },
                        React.createElement(
                            "ul",
                            null,
                            React.createElement(
                                "li",
                                { className: "search" },
                                React.createElement(
                                    "a",
                                    { className: "fa-search", href: "#search" },
                                    "Search"
                                ),
                                React.createElement(
                                    "form",
                                    { id: "search", method: "get", action: "#" },
                                    React.createElement("input", { type: "text", name: "query", placeholder: "Search" })
                                )
                            ),
                            React.createElement(
                                "li",
                                { className: "menu" },
                                React.createElement(
                                    "a",
                                    { className: "fa-bars", href: "#menu" },
                                    "Menu"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "section",
                    { id: "menu" },
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "form",
                            { className: "search", method: "get", action: "#" },
                            React.createElement("input", { type: "text", name: "query", placeholder: "Search" })
                        )
                    ),
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "ul",
                            { className: "links" },
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        "Team"
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "All for one. One for all."
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        "About"
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "What is comedy open mic?"
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        "Witness"
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "For the blockchain. Not snitches."
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-twitter" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "label" },
                                            "Twitter"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-facebook" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "label" },
                                            "Facebook"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-instagram" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "label" },
                                            "Instagram"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-500px" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "label" },
                                            "500px"
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "icon style2 fa-envelope-o" },
                                    React.createElement(
                                        "h3",
                                        null,
                                        React.createElement(
                                            "span",
                                            { className: "label" },
                                            "Email"
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "section",
                        null,
                        React.createElement(
                            "ul",
                            { className: "actions vertical" },
                            React.createElement(
                                "li",
                                null,
                                React.createElement(
                                    "a",
                                    { href: "#", className: "button big fit" },
                                    "Log In"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

//let domContainer =;


ReactDOM.render(React.createElement(Header, null), document.querySelector('#headercomeshere'));