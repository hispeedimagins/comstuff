'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint react/prop-types: 0 */
// import React from 'react';
// import PropTypes from 'prop-types';
// import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';

var _PropTypes = PropTypes,
    string = _PropTypes.string,
    number = _PropTypes.number;

/** Lots of iframes in a post can be very slow.  This component only inserts the iframe when it is actually needed. */
//This too has been taken from steems condenser.

var YoutubePreview = function (_React$Component) {
    _inherits(YoutubePreview, _React$Component);

    function YoutubePreview() {
        _classCallCheck(this, YoutubePreview);

        var _this = _possibleConstructorReturn(this, (YoutubePreview.__proto__ || Object.getPrototypeOf(YoutubePreview)).call(this));

        _this.shouldComponentUpdate = shouldComponentUpdate(_this, 'YoutubePreview');

        _this.onPlay = function () {
            _this.setState({ play: true });
        };

        _this.state = {};
        return _this;
    }

    _createClass(YoutubePreview, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                youTubeId = _props.youTubeId,
                width = _props.width,
                height = _props.height,
                dataParams = _props.dataParams;
            var play = this.state.play;

            if (!play) {
                // mqdefault.jpg (medium quality version, 320px × 180px)
                // hqdefault.jpg (high quality version, 480px × 360px
                // sddefault.jpg (standard definition version, 640px × 480px)
                var thumbnail = width <= 320 ? 'mqdefault.jpg' : width <= 480 ? 'hqdefault.jpg' : '0.jpg';
                var previewLink = 'https://img.youtube.com/vi/' + youTubeId + '/' + thumbnail;
                return React.createElement(
                    'div',
                    {
                        className: 'videoWrapper youtube',
                        onClick: this.onPlay,
                        style: { backgroundImage: 'url(' + previewLink + ')' }
                    },
                    React.createElement('div', { className: 'play' })
                );
            }
            var autoPlaySrc = 'https://www.youtube.com/embed/' + youTubeId + '?autoplay=1&autohide=1&' + dataParams;
            return React.createElement(
                'div',
                { className: 'videoWrapper' },
                React.createElement('iframe', {
                    width: width,
                    height: height,
                    src: autoPlaySrc,
                    frameBorder: '0',
                    allowFullScreen: 'true'
                })
            );
        }
    }]);

    return YoutubePreview;
}(React.Component);

YoutubePreview.propTypes = {
    youTubeId: string.isRequired,
    width: number,
    height: number,
    dataParams: string
};
YoutubePreview.defaultProps = {
    width: 640,
    height: 360,
    dataParams: 'enablejsapi=0&rel=0&origin=https://steemit.com'
};