'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import React from 'react';
//import PropTypes from 'prop-types';
//import { connect } from 'react-redux';
//import { Component } from 'react';
//import Remarkable from 'remarkable';
//import YoutubePreview from 'app/components/elements/YoutubePreview';
//import sanitizeConfig, { noImageText } from 'app/utils/SanitizeConfig';
//import sanitize from 'sanitize-html';
//import HtmlReady from 'shared/HtmlReady';
//import tt from 'counterpart';

var remarkableM = new Remarkable({
    html: true, // remarkable renders first then sanitize runs...
    breaks: true,
    linkify: false, // linkify is done locally
    typographer: false, // https://github.com/jonschlinkert/remarkable/issues/142#issuecomment-221546793
    quotes: '“”‘’'
});

var remarkableToSpecM = new Remarkable({
    html: true,
    breaks: false, // real markdown uses \n\n for paragraph breaks
    linkify: false,
    typographer: false,
    quotes: '“”‘’'
});

var MarkdownViewer = function (_React$Component) {
    _inherits(MarkdownViewer, _React$Component);

    function MarkdownViewer() {
        _classCallCheck(this, MarkdownViewer);

        var _this = _possibleConstructorReturn(this, (MarkdownViewer.__proto__ || Object.getPrototypeOf(MarkdownViewer)).call(this));

        _this.onAllowNoImage = function () {
            _this.setState({ allowNoImage: false });
        };

        _this.state = { allowNoImage: true };
        return _this;
    }

    _createClass(MarkdownViewer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(np, ns) {
            return np.text !== this.props.text || np.large !== this.props.large ||
            // np.formId !== this.props.formId ||
            np.canEdit !== this.props.canEdit || ns.allowNoImage !== this.state.allowNoImage;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                noImage = _props.noImage,
                hideImages = _props.hideImages;
            var allowNoImage = this.state.allowNoImage;
            var text = this.props.text;

            if (!text) text = ''; // text can be empty, still view the link meta data
            var _props2 = this.props,
                large = _props2.large,
                highQualityPost = _props2.highQualityPost;


            var html = false;
            // See also ReplyEditor isHtmlTest
            var m = text.match(/^<html>([\S\s]*)<\/html>$/);
            if (m && m.length === 2) {
                html = true;
                text = m[1];
            } else {
                // See also ReplyEditor isHtmlTest
                html = /^<p>[\S\s]*<\/p>/.test(text);
            }

            // Strip out HTML comments. "JS-DOS" bug.
            text = text.replace(/<!--([\s\S]+?)(-->|$)/g, '(html comment removed: $1)');

            var renderer = remarkableToSpecM;
            if (this.props.breaks === true) {
                renderer = remarkableM;
            }

            var renderedText = html ? text : renderer.render(text);

            // If content isn't wrapped with an html element at this point, add it.
            if (!renderedText.indexOf('<html>') !== 0) {
                renderedText = '<html>' + renderedText + '</html>';
            }

            // Embed videos, link mentions and hashtags, etc...
            if (renderedText) renderedText = HtmlReady(renderedText, { hideImages: hideImages }).html;

            // Complete removal of javascript and other dangerous tags..
            // The must remain as close as possible to dangerouslySetInnerHTML
            var cleanText = renderedText;
            if (this.props.allowDangerousHTML === true) {
                console.log('WARN\tMarkdownViewer rendering unsanitized content');
            } else {
                // cleanText = sanitize(
                //     renderedText,
                //     sanitizeConfig({
                //         large,
                //         highQualityPost,
                //         noImage: noImage && allowNoImage,
                //     })
                // );
            }

            if (/<\s*script/gi.test(cleanText)) {
                // Not meant to be complete checking, just a secondary trap and red flag (code can change)
                console.error('Refusing to render script tag in post text', cleanText);
                return React.createElement('div', null);
            }

            var noImageActive = cleanText.indexOf(noImageText) !== -1;

            // In addition to inserting the youtube component, this allows
            // react to compare separately preventing excessive re-rendering.
            var idx = 0;
            var sections = [];

            // HtmlReady inserts ~~~ embed:${id} type ~~~
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = cleanText.split('~~~ embed:')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var section = _step.value;

                    var match = section.match(/^([A-Za-z0-9\_\-]+) (youtube|vimeo) ~~~/);
                    if (match && match.length >= 3) {
                        var id = match[1];
                        var type = match[2];
                        var w = large ? 640 : 480,
                            h = large ? 360 : 270;
                        if (type === 'youtube') {
                            sections.push(React.createElement(YoutubePreview, {
                                key: idx++,
                                width: w,
                                height: h,
                                youTubeId: id,
                                frameBorder: '0',
                                allowFullScreen: 'true'
                            }));
                        } else if (type === 'vimeo') {
                            var url = 'https://player.vimeo.com/video/' + id;
                            sections.push(React.createElement(
                                'div',
                                { className: 'videoWrapper' },
                                React.createElement('iframe', {
                                    key: idx++,
                                    src: url,
                                    width: w,
                                    height: h,
                                    frameBorder: '0',
                                    webkitallowfullscreen: true,
                                    mozallowfullscreen: true,
                                    allowFullScreen: true
                                })
                            ));
                        } else {
                            console.error('MarkdownViewer unknown embed type', type);
                        }
                        section = section.substring((id + ' ' + type + ' ~~~').length);
                        if (section === '') continue;
                    }
                    sections.push(React.createElement('div', {
                        key: idx++,
                        dangerouslySetInnerHTML: { __html: section }
                    }));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            var cn = 'Markdown' + (this.props.className ? ' ' + this.props.className : '') + (html ? ' html' : '') + (large ? '' : ' MarkdownViewer--small');
            return React.createElement(
                'div',
                { className: 'MarkdownViewer ' + cn },
                sections,
                noImageActive && allowNoImage && React.createElement(
                    'div',
                    {
                        onClick: this.onAllowNoImage,
                        className: 'MarkdownViewer__negative_group'
                    },
                    React.createElement('button', {
                        style: { marginBottom: 0 },
                        className: 'button hollow tiny float-right'
                    })
                )
            );
        }
    }]);

    return MarkdownViewer;
}(React.Component);

// export default connect((state, ownProps) => {
//     return { ...ownProps };
// })(MarkdownViewer);


MarkdownViewer.propTypes = {
    // HTML properties
    text: PropTypes.string,
    className: PropTypes.string,
    large: PropTypes.bool,
    // formId: PropTypes.string, // This is unique for every editor of every post (including reply or edit)
    canEdit: PropTypes.bool,
    jsonMetadata: PropTypes.object,
    highQualityPost: PropTypes.bool,
    noImage: PropTypes.bool,
    allowDangerousHTML: PropTypes.bool,
    hideImages: PropTypes.bool, // whether to replace images with just a span containing the src url
    breaks: PropTypes.bool // true to use bastardized markdown that cares about newlines
    // used for the ImageUserBlockList
};
MarkdownViewer.defaultProps = {
    allowDangerousHTML: false,
    breaks: true,
    className: '',
    hideImages: false,
    large: false
};