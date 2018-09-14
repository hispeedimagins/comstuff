'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostAndCommentHolder = function (_React$Component) {
    _inherits(PostAndCommentHolder, _React$Component);

    function PostAndCommentHolder(props) {
        _classCallCheck(this, PostAndCommentHolder);

        //console.log(this.state);
        var _this = _possibleConstructorReturn(this, (PostAndCommentHolder.__proto__ || Object.getPrototypeOf(PostAndCommentHolder)).call(this, props));

        _this.state = {
            article: _this.props.article,
            result: _this.props.result,
            isComment: _this.props.isComment,
            margin: _this.props.margin
        };

        return _this;
    }

    //Render an article or a comment.


    _createClass(PostAndCommentHolder, [{
        key: 'render',
        value: function render() {

            var arts = this.props.article;
            var margin = this.props.margin;
            var meta = void 0;
            try {
                meta = JSON.parse(arts.json_metadata);
            } catch (exception) {
                console.log(exception, arts.json_metadata);
            }

            var pending_payout = parsePayoutAmount(arts.pending_payout_value);
            var total_payout = parsePayoutAmount(arts.total_payout_value);
            var high_quality_post = pending_payout + total_payout > 10.0;
            var full_power = arts.percent_steem_dollars === 0;

            var contentbody = React.createElement(MarkdownViewer, {
                formId: arts.id + '-viewer',
                text: arts.body,
                jsonMetadata: meta,
                large: true,
                highQualityPost: high_quality_post,
                noImage: false,
                hideImages: false
            });

            var lik = 0;

            var divStyle = {
                //color: 'white',
                paddingLeft: margin + 'em'
                //WebkitTransition: 'all', // note the capital 'W' here
                //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
            };

            var collapse = {
                //color: 'white',
                visibility: 'collapse'
                //WebkitTransition: 'all', // note the capital 'W' here
                //msTransition: 'all' // 'ms' is the only lowercase vendor prefix
            };

            var payout = arts.total_payout_value;
            if (payout == "0.000 SBD") {
                payout = arts.pending_payout_value;
            }
            var aure = repLog10(arts.author_reputation);

            if (this.props.isComment) {
                return React.createElement(
                    'div',
                    { style: divStyle, key: arts.id },
                    React.createElement(
                        'article',
                        { className: 'post themeMarginOnlyTop' },
                        React.createElement(
                            'header',
                            null,
                            React.createElement(
                                'div',
                                { style: collapse, className: 'title' },
                                React.createElement(
                                    'h2',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '#' },
                                        arts.title
                                    )
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    'More shit to add over here'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'meta' },
                                React.createElement(
                                    'time',
                                    { className: 'published', dateTime: arts.created },
                                    convertDate(arts.created)
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#', className: 'author' },
                                    React.createElement(
                                        'span',
                                        { className: 'name' },
                                        arts.author,
                                        ' (',
                                        aure,
                                        ')'
                                    ),
                                    React.createElement('img', { src: getProfileImageUrl(arts.author), alt: '' })
                                )
                            )
                        ),
                        contentbody,
                        React.createElement(
                            'footer',
                            null,
                            React.createElement(
                                'ul',
                                { className: 'stats' },
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
                                        arts.net_votes
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '#', className: 'icon fa-comment' },
                                        arts.children
                                    )
                                ),
                                meta && meta.tags ? meta.tags.map(function (item) {
                                    return React.createElement(
                                        'li',
                                        { key: lik++ },
                                        React.createElement(
                                            'a',
                                            { href: '#' },
                                            item
                                        )
                                    );
                                }) : React.createElement(
                                    'li',
                                    { key: lik++ },
                                    React.createElement(
                                        'a',
                                        { href: '#' },
                                        arts.category
                                    )
                                )
                            )
                        )
                    )
                );
            } else {

                return React.createElement(
                    'div',
                    { key: arts.id, id: 'main' },
                    React.createElement(
                        'article',
                        { className: 'post' },
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
                                        { href: '#' },
                                        arts.title
                                    )
                                ),
                                React.createElement(
                                    'p',
                                    null,
                                    'More shit to add over here'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'meta' },
                                React.createElement(
                                    'time',
                                    { className: 'published', dateTime: arts.created },
                                    convertDate(arts.created)
                                ),
                                React.createElement(
                                    'a',
                                    { href: '#', className: 'author' },
                                    React.createElement(
                                        'span',
                                        { className: 'name' },
                                        arts.author,
                                        ' (',
                                        aure,
                                        ')'
                                    ),
                                    React.createElement('img', { src: getProfileImageUrl(arts.author), alt: '' })
                                )
                            )
                        ),
                        contentbody,
                        React.createElement(
                            'footer',
                            null,
                            React.createElement(
                                'ul',
                                { className: 'stats' },
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
                                        arts.net_votes
                                    )
                                ),
                                React.createElement(
                                    'li',
                                    null,
                                    React.createElement(
                                        'a',
                                        { href: '#', className: 'icon fa-comment' },
                                        arts.children
                                    )
                                ),
                                meta && meta.tags ? meta.tags.map(function (item) {
                                    return React.createElement(
                                        'li',
                                        { key: lik++ },
                                        React.createElement(
                                            'a',
                                            { href: '#' },
                                            item
                                        )
                                    );
                                }) : React.createElement(
                                    'li',
                                    { key: lik++ },
                                    React.createElement(
                                        'a',
                                        { href: '#' },
                                        arts.category
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }
    }]);

    return PostAndCommentHolder;
}(React.Component);