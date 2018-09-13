//import xmldom from 'xmldom';
//import tt from 'counterpart';
//import linksRe, { any as linksAny } from 'app/utils/Links';
//import { validate_account_name } from 'app/utils/ChainValidation';
//import proxifyImageUrl from 'app/utils/ProxifyUrl';
//import * as Phishing from 'app/utils/Phishing';

const getPhishingWarningMessage = () => "phishy message";
const getExternalLinkWarningMessage = () =>
    "External link warning";

//const noop = () => {};
let DOMParserm;
let XMLSerializerm;

window.addEventListener('DOMContentLoaded', function() {
    DOMParserm = new DOMParser();
    XMLSerializerm = new XMLSerializer(); // 1st
  }, true);

/** Embed videos, link mentions and hashtags, etc...
    If hideImages and mutate is set to true all images will be replaced
    by <pre> elements containing just the image url.
*/
function HtmlReady (html, { mutate = true, hideImages = false } = {}) {
    const state = { mutate };
    state.hashtags = new Set();
    state.usertags = new Set();
    state.htmltags = new Set();
    state.images = new Set();
    state.links = new Set();
    try {
        const doc = DOMParserm.parseFromString(html, 'text/html');
        traverse(doc, state);
        if (mutate) {
            if (hideImages) {
                for (const image of Array.from(
                    doc.getElementsByTagName('img')
                )) {
                    const pre = doc.createElement('pre');
                    pre.setAttribute('class', 'image-url-only');
                    pre.appendChild(
                        doc.createTextNode(image.getAttribute('src'))
                    );
                    image.parentNode.replaceChild(pre, image);
                }
            } else {
                proxifyImages(doc);
            }
        }
        // console.log('state', state)
        if (!mutate) return state;
        return {
            html: doc ? XMLSerializerm.serializeToString(doc) : '',
            ...state,
        };
    } catch (error) {
        // xmldom error is bad
        console.log(
            'rendering error',
            JSON.stringify({ error: error.message, html })
        );
        return { html: '' };
    }
}

function traverse(node, state, depth = 0) {
    if (!node || !node.childNodes) return;
    Array(...node.childNodes).forEach(child => {
        // console.log(depth, 'child.tag,data', child.tagName, child.data)
        const tag = child.tagName ? child.tagName.toLowerCase() : null;
        if (tag) state.htmltags.add(tag);

        if (tag === 'img') img(state, child);
        else if (tag === 'iframe') iframe(state, child);
        else if (tag === 'a') link(state, child);
        else if (child.nodeName === '#text') linkifyNode(child, state);

        traverse(child, state, depth + 1);
    });
}

function link(state, child) {
    const url = child.getAttribute('href');
    if (url) {
        state.links.add(url);
        if (state.mutate) {
            // If this link is not relative, http, https, or steem -- add https.
            if (!/^((#)|(\/(?!\/))|(((steem|https?):)?\/\/))/.test(url)) {
                child.setAttribute('href', 'https://' + url);
            }

            // Unlink potential phishing attempts
            if (
                (url.indexOf('#') !== 0 && // Allow in-page links
                    (child.textContent.match(/(www\.)?steemit\.com/i) &&
                        !url.match(
                            /https?:\/\/(.*@)?(www\.)?steemit\.com/i
                        ))) ||
                looksPhishy(url)
            ) {
                const phishyDiv = child.ownerDocument.createElement('div');
                phishyDiv.textContent = `${child.textContent} / ${url}`;
                phishyDiv.setAttribute('title', getPhishingWarningMessage());
                phishyDiv.setAttribute('class', 'phishy');
                child.parentNode.replaceChild(phishyDiv, child);
            }
        }
    }
}

// wrap iframes in div.videoWrapper to control size/aspect ratio
function iframe(state, child) {
    const url = child.getAttribute('src');
    if (url) {
        const { images, links } = state;
        const yt = youTubeId(url);
        if (yt && images && links) {
            links.add(yt.url);
            images.add('https://img.youtube.com/vi/' + yt.id + '/0.jpg');
        }
    }

    const { mutate } = state;
    if (!mutate) return;

    const tag = child.parentNode.tagName
        ? child.parentNode.tagName.toLowerCase()
        : child.parentNode.tagName;
    if (
        tag == 'div' &&
        child.parentNode.getAttribute('class') == 'videoWrapper'
    )
        return;
    const html = XMLSerializerm.serializeToString(child);
    child.parentNode.replaceChild(
        DOMParserm.parseFromString(`<div class="videoWrapper">${html}</div>`),
        child
    );
}

function img(state, child) {
    const url = child.getAttribute('src');
    if (url) {
        state.images.add(url);
        if (state.mutate) {
            let url2 = ipfsPrefix(url);
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
    [...doc.getElementsByTagName('img')].forEach(node => {
        const url = node.getAttribute('src');
        if (!linksRe.local.test(url))
            node.setAttribute('src', proxifyImageUrl(url, true));
    });
}

function linkifyNode(child, state) {
    try {
        const tag = child.parentNode.tagName
            ? child.parentNode.tagName.toLowerCase()
            : child.parentNode.tagName;
        if (tag === 'code') return;
        if (tag === 'a') return;

        const { mutate } = state;
        if (!child.data) return;
        child = embedYouTubeNode(child, state.links, state.images);
        child = embedVimeoNode(child, state.links, state.images);

        const data = XMLSerializerm.serializeToString(child);
        const content = linkify(
            data,
            state.mutate,
            state.hashtags,
            state.usertags,
            state.images,
            state.links
        );
        if (mutate && content !== data) {
            // const newChild = DOMParserm.parseFromString(
            //     `<span>${content}</span>`,"text/html"
            // );
            const nch = document.createElement("span");
            nch.innerHTML = content;
            //console.log(newChild);
            //var pno = child.parentNode;
            //console.log(pno);
            //console.log(child);
            child.parentNode.replaceChild(nch,child);
            //pno.replaceChild(newChild, child);
            return nch;
        }
    } catch (error) {
        console.log(error,"inlinkify");
    }
}

function linkify(content, mutate, hashtags, usertags, images, links) {
    // hashtag
    content = content.replace(/(^|\s)(#[-a-z\d]+)/gi, tag => {
        if (/#[\d]+$/.test(tag)) return tag; // Don't allow numbers to be tags
        const space = /^\s/.test(tag) ? tag[0] : '';
        const tag2 = tag.trim().substring(1);
        const tagLower = tag2.toLowerCase();
        if (hashtags) hashtags.add(tagLower);
        if (!mutate) return tag;
        return space + `<a href="/trending/${tagLower}">${tag}</a>`;
    });

    // usertag (mention)
    // Cribbed from https://github.com/twitter/twitter-text/blob/v1.14.7/js/twitter-text.js#L90
    content = content.replace(
        /(^|[^a-zA-Z0-9_!#$%&*@＠\/]|(^|[^a-zA-Z0-9_+~.-\/#]))[@＠]([a-z][-\.a-z\d]+[a-z\d])/gi,
        (match, preceeding1, preceeding2, user) => {
            const userLower = user.toLowerCase();
            const valid = validate_account_name(userLower) == null;

            if (valid && usertags) usertags.add(userLower);

            const preceedings = (preceeding1 || '') + (preceeding2 || ''); // include the preceeding matches if they exist

            if (!mutate) return `${preceedings}${user}`;

            return valid
                ? `${preceedings}<a href="/@${userLower}">@${user}</a>`
                : `${preceedings}@${user}`;
        }
    );

    content = content.replace(any('gi'), ln => {
        if (linksRe.image.test(ln)) {
            if (images) images.add(ln);
            return `<img src="${ipfsPrefix(ln)}" />`;
        }

        // do not linkify .exe or .zip urls
        if (/\.(zip|exe)$/i.test(ln)) return ln;

        // do not linkify phishy links
        if (Phishing.looksPhishy(ln))
            return `<div title='${getPhishingWarningMessage()}' class='phishy'>${
                ln
            }</div>`;

        if (links) links.add(ln);
        return `<a href="${ipfsPrefix(ln)}">${ln}</a>`;
    });
    return content;
}

function embedYouTubeNode(child, links, images) {
    try {
        const data = child.data;
        const yt = youTubeId(data);
        if (!yt) return child;

        child.data = data.replace(yt.url, `~~~ embed:${yt.id} youtube ~~~`);

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

    const m1 = data.match(linksRe.youTube);
    const url = m1 ? m1[0] : null;
    if (!url) return null;

    const m2 = url.match(linksRe.youTubeId);
    const id = m2 && m2.length >= 2 ? m2[1] : null;
    if (!id) return null;

    return {
        id,
        url,
        thumbnail: 'https://img.youtube.com/vi/' + id + '/0.jpg',
    };
}

function embedVimeoNode(child, links /*images*/) {
    try {
        const data = child.data;
        const vimeo = vimeoId(data);
        if (!vimeo) return child;

        child.data = data.replace(vimeo.url, `~~~ embed:${vimeo.id} vimeo ~~~`);

        if (links) links.add(vimeo.canonical);
        // if(images) images.add(vimeo.thumbnail) // not available
    } catch (error) {
        console.log(error);
    }
    return child;
}

function vimeoId(data) {
    if (!data) return null;
    const m = data.match(linksRe.vimeo);
    if (!m || m.length < 2) return null;

    return {
        id: m[1],
        url: m[0],
        canonical: `https://player.vimeo.com/video/${m[1]}`,
        // thumbnail: requires a callback - http://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo
    };
}

function ipfsPrefix(url) {
    if ($STM_Config.ipfs_prefix) {
        // Convert //ipfs/xxx  or /ipfs/xxx  into  https://steemit.com/ipfs/xxxxx
        if (/^\/?\/ipfs\//.test(url)) {
            const slash = url.charAt(1) === '/' ? 1 : 0;
            url = url.substring(slash + '/ipfs/'.length); // start with only 1 /
            return $STM_Config.ipfs_prefix + '/' + url;
        }
    }
    return url;
}