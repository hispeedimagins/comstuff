"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//import xmldom from 'xmldom';
//import tt from 'counterpart';
//import linksRe, { any as linksAny } from 'app/utils/Links';
//import { validate_account_name } from 'app/utils/ChainValidation';
//import proxifyImageUrl from 'app/utils/ProxifyUrl';
//import * as Phishing from 'app/utils/Phishing';

var getPhishingWarningMessage = function getPhishingWarningMessage() {
    return "phishy message";
};
var getExternalLinkWarningMessage = function getExternalLinkWarningMessage() {
    return "External link warning";
};

//const noop = () => {};
var DOMParserm = void 0;
var XMLSerializerm = void 0;

window.addEventListener('DOMContentLoaded', function () {
    DOMParserm = new DOMParser();
    XMLSerializerm = new XMLSerializer(); // 1st
}, true);

/** Embed videos, link mentions and hashtags, etc...
    If hideImages and mutate is set to true all images will be replaced
    by <pre> elements containing just the image url.
*/
function HtmlReady(html) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$mutate = _ref.mutate,
        mutate = _ref$mutate === undefined ? true : _ref$mutate,
        _ref$hideImages = _ref.hideImages,
        hideImages = _ref$hideImages === undefined ? false : _ref$hideImages;

    var state = { mutate: mutate };
    state.hashtags = new Set();
    state.usertags = new Set();
    state.htmltags = new Set();
    state.images = new Set();
    state.links = new Set();
    try {
        var doc = DOMParserm.parseFromString(html, 'text/html');
        traverse(doc, state);
        if (mutate) {
            if (hideImages) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = Array.from(doc.getElementsByTagName('img'))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var image = _step.value;

                        var pre = doc.createElement('pre');
                        pre.setAttribute('class', 'image-url-only');
                        pre.appendChild(doc.createTextNode(image.getAttribute('src')));
                        image.parentNode.replaceChild(pre, image);
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
            } else {
                proxifyImages(doc);
            }
        }
        // console.log('state', state)
        if (!mutate) return state;
        return Object.assign({
            html: doc ? XMLSerializerm.serializeToString(doc) : ''
        }, state);
    } catch (error) {
        // xmldom error is bad
        console.log('rendering error', JSON.stringify({ error: error.message, html: html }));
        return { html: '' };
    }
}

function traverse(node, state) {
    var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (!node || !node.childNodes) return;
    Array.apply(undefined, _toConsumableArray(node.childNodes)).forEach(function (child) {
        // console.log(depth, 'child.tag,data', child.tagName, child.data)
        var tag = child.tagName ? child.tagName.toLowerCase() : null;
        if (tag) state.htmltags.add(tag);

        if (tag === 'img') img(state, child);else if (tag === 'iframe') iframe(state, child);else if (tag === 'a') link(state, child);else if (child.nodeName === '#text') linkifyNode(child, state);

        traverse(child, state, depth + 1);
    });
}

function link(state, child) {
    var url = child.getAttribute('href');
    if (url) {
        state.links.add(url);
        if (state.mutate) {
            // If this link is not relative, http, https, or steem -- add https.
            if (!/^((#)|(\/(?!\/))|(((steem|https?):)?\/\/))/.test(url)) {
                child.setAttribute('href', 'https://' + url);
            }

            // Unlink potential phishing attempts
            if (url.indexOf('#') !== 0 && // Allow in-page links
            child.textContent.match(/(www\.)?steemit\.com/i) && !url.match(/https?:\/\/(.*@)?(www\.)?steemit\.com/i) || looksPhishy(url)) {
                var phishyDiv = child.ownerDocument.createElement('div');
                phishyDiv.textContent = child.textContent + " / " + url;
                phishyDiv.setAttribute('title', getPhishingWarningMessage());
                phishyDiv.setAttribute('class', 'phishy');
                child.parentNode.replaceChild(phishyDiv, child);
            }
        }
    }
}

// wrap iframes in div.videoWrapper to control size/aspect ratio
function iframe(state, child) {
    var url = child.getAttribute('src');
    if (url) {
        var images = state.images,
            links = state.links;

        var yt = youTubeId(url);
        if (yt && images && links) {
            links.add(yt.url);
            images.add('https://img.youtube.com/vi/' + yt.id + '/0.jpg');
        }
    }

    var mutate = state.mutate;

    if (!mutate) return;

    var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
    if (tag == 'div' && child.parentNode.getAttribute('class') == 'videoWrapper') return;
    var html = XMLSerializerm.serializeToString(child);
    child.parentNode.replaceChild(DOMParserm.parseFromString("<div class=\"videoWrapper\">" + html + "</div>"), child);
}

function img(state, child) {
    var url = child.getAttribute('src');
    if (url) {
        state.images.add(url);
        if (state.mutate) {
            var url2 = ipfsPrefix(url);
            if (/^\/\//.test(url2)) {
                // Change relative protocol imgs to https
                url2 = 'https:' + url2;
            }
            if (url2 !== url) {
                child.setAttribute('src', url2);
            }
        }
    }
}

// For all img elements with non-local URLs, prepend the proxy URL (e.g. `https://img0.steemit.com/0x0/`)
function proxifyImages(doc) {
    if (!doc) return;
    [].concat(_toConsumableArray(doc.getElementsByTagName('img'))).forEach(function (node) {
        var url = node.getAttribute('src');
        if (!linksRe.local.test(url)) node.setAttribute('src', proxifyImageUrl(url, true));
    });
}

function linkifyNode(child, state) {
    try {
        var tag = child.parentNode.tagName ? child.parentNode.tagName.toLowerCase() : child.parentNode.tagName;
        if (tag === 'code') return;
        if (tag === 'a') return;

        var mutate = state.mutate;

        if (!child.data) return;
        child = embedYouTubeNode(child, state.links, state.images);
        child = embedVimeoNode(child, state.links, state.images);

        var data = XMLSerializerm.serializeToString(child);
        var content = linkify(data, state.mutate, state.hashtags, state.usertags, state.images, state.links);
        if (mutate && content !== data) {
            // const newChild = DOMParserm.parseFromString(
            //     `<span>${content}</span>`,"text/html"
            // );
            var nch = document.createElement("span");
            nch.innerHTML = content;
            //console.log(newChild);
            //var pno = child.parentNode;
            //console.log(pno);
            //console.log(child);
            child.parentNode.replaceChild(nch, child);
            //pno.replaceChild(newChild, child);
            return nch;
        }
    } catch (error) {
        console.log(error, "inlinkify");
    }
}

function linkify(content, mutate, hashtags, usertags, images, links) {
    // hashtag
    content = content.replace(/(^|\s)(#[-a-z\d]+)/gi, function (tag) {
        if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags
        var space = /^\s/.test(tag) ? tag[0] : '';
        var tag2 = tag.trim().substring(1);
        var tagLower = tag2.toLowerCase();
        if (hashtags) hashtags.add(tagLower);
        if (!mutate) return tag;
        return space + ("<a href=\"/trending/" + tagLower + "\">" + tag + "</a>");
    });

    // usertag (mention)
    // Cribbed from https://github.com/twitter/twitter-text/blob/v1.14.7/js/twitter-text.js#L90
    content = content.replace(/(^|[^a-zA-Z0-9_!#$%&*@＠\/]|(^|[^a-zA-Z0-9_+~.-\/#]))[@＠]([a-z][-\.a-z\d]+[a-z\d])/gi, function (match, preceeding1, preceeding2, user) {
        var userLower = user.toLowerCase();
        var valid = validate_account_name(userLower) == null;

        if (valid && usertags) usertags.add(userLower);

        var preceedings = (preceeding1 || '') + (preceeding2 || ''); // include the preceeding matches if they exist

        if (!mutate) return "" + preceedings + user;

        return valid ? preceedings + "<a href=\"/@" + userLower + "\">@" + user + "</a>" : preceedings + "@" + user;
    });

    content = content.replace(any('gi'), function (ln) {
        if (linksRe.image.test(ln)) {
            if (images) images.add(ln);
            return "<img src=\"" + ipfsPrefix(ln) + "\" />";
        }

        // do not linkify .exe or .zip urls
        if (/\.(zip|exe)$/i.test(ln)) return ln;

        // do not linkify phishy links
        if (Phishing.looksPhishy(ln)) return "<div title='" + getPhishingWarningMessage() + "' class='phishy'>" + ln + "</div>";

        if (links) links.add(ln);
        return "<a href=\"" + ipfsPrefix(ln) + "\">" + ln + "</a>";
    });
    return content;
}

function embedYouTubeNode(child, links, images) {
    try {
        var data = child.data;
        var yt = youTubeId(data);
        if (!yt) return child;

        child.data = data.replace(yt.url, "~~~ embed:" + yt.id + " youtube ~~~");

        if (links) links.add(yt.url);
        if (images) images.add(yt.thumbnail);
    } catch (error) {
        console.log(error);
    }
    return child;
}

/** @return {id, url} or <b>null</b> */
function youTubeId(data) {
    if (!data) return null;

    var m1 = data.match(linksRe.youTube);
    var url = m1 ? m1[0] : null;
    if (!url) return null;

    var m2 = url.match(linksRe.youTubeId);
    var id = m2 && m2.length >= 2 ? m2[1] : null;
    if (!id) return null;

    return {
        id: id,
        url: url,
        thumbnail: 'https://img.youtube.com/vi/' + id + '/0.jpg'
    };
}

function embedVimeoNode(child, links /*images*/) {
    try {
        var data = child.data;
        var vimeo = vimeoId(data);
        if (!vimeo) return child;

        child.data = data.replace(vimeo.url, "~~~ embed:" + vimeo.id + " vimeo ~~~");

        if (links) links.add(vimeo.canonical);
        // if(images) images.add(vimeo.thumbnail) // not available
    } catch (error) {
        console.log(error);
    }
    return child;
}

function vimeoId(data) {
    if (!data) return null;
    var m = data.match(linksRe.vimeo);
    if (!m || m.length < 2) return null;

    return {
        id: m[1],
        url: m[0],
        canonical: "https://player.vimeo.com/video/" + m[1]
        // thumbnail: requires a callback - http://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo
    };
}

function ipfsPrefix(url) {
    if ($STM_Config.ipfs_prefix) {
        // Convert //ipfs/xxx  or /ipfs/xxx  into  https://steemit.com/ipfs/xxxxx
        if (/^\/?\/ipfs\//.test(url)) {
            var slash = url.charAt(1) === '/' ? 1 : 0;
            url = url.substring(slash + '/ipfs/'.length); // start with only 1 /
            return $STM_Config.ipfs_prefix + '/' + url;
        }
    }
    return url;
}