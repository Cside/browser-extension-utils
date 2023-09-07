"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewUrl = exports.getSubmissionUrlForGreasyFork = exports.getSubmissionUrlForFirefoxStore = exports.getSubmissionUrlForEdgeStore = exports.getSubmissionUrlForChromeStore = exports.getGreasyForkUrl = exports.getFirefoxStoreUrl = exports.getEdgeStoreUrl = exports.getChromeStoreUrl = void 0;
const getChromeStoreUrl = (id) => 'https://chrome.google.com/webstore/detail/' + id;
exports.getChromeStoreUrl = getChromeStoreUrl;
const getEdgeStoreUrl = (crxId) => 'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
exports.getEdgeStoreUrl = getEdgeStoreUrl;
const getFirefoxStoreUrl = (slug) => `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
exports.getFirefoxStoreUrl = getFirefoxStoreUrl;
const getGreasyForkUrl = (id) => 'https://greasyfork.org/ja/scripts/' + id;
exports.getGreasyForkUrl = getGreasyForkUrl;
const getSubmissionUrlForChromeStore = (id, developerId) => `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
exports.getSubmissionUrlForChromeStore = getSubmissionUrlForChromeStore;
const getSubmissionUrlForEdgeStore = (productId) => `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages/dashboard`;
exports.getSubmissionUrlForEdgeStore = getSubmissionUrlForEdgeStore;
const getSubmissionUrlForFirefoxStore = (slug) => `https://addons.mozilla.org/ja/developers/addon/${encodeURIComponent(slug)}/versions/submit/`;
exports.getSubmissionUrlForFirefoxStore = getSubmissionUrlForFirefoxStore;
const getSubmissionUrlForGreasyFork = (id) => `https://greasyfork.org/scripts/${id}/versions/new`;
exports.getSubmissionUrlForGreasyFork = getSubmissionUrlForGreasyFork;
const getReviewUrl = (id, ids) => {
    if (ids.firefox && id === ids.firefox.id) {
        return (0, exports.getFirefoxStoreUrl)(ids.firefox.slug);
    }
    else if (ids.edge && id === ids.edge.crxId) {
        return (0, exports.getEdgeStoreUrl)(ids.edge.crxId);
    }
    // in development mode in Edge, the url will be as follows.
    return (0, exports.getChromeStoreUrl)(ids.chrome.id);
};
exports.getReviewUrl = getReviewUrl;
