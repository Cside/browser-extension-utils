"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewUrl = exports.validateIds = exports.getSubmissionUrlForGreasyFork = exports.getSubmissionUrlForFirefoxStore = exports.getSubmissionUrlForEdgeStore = exports.getSubmissionUrlForChromeStore = exports.getGreasyForkUrl = exports.getFirefoxStoreUrl = exports.getEdgeStoreUrl = exports.getChromeStoreUrl = void 0;
const zod_1 = require("zod");
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
const IdsSchema = zod_1.z.object({
    chrome: zod_1.z.object({
        id: zod_1.z.string(),
        developerId: zod_1.z.string(),
    }),
    edge: zod_1.z
        .object({
        crxId: zod_1.z.string(),
        productId: zod_1.z.string(),
    })
        .optional(),
    firefox: zod_1.z
        .object({
        id: zod_1.z.string(),
        slug: zod_1.z.string(),
    })
        .optional(),
    greasyFork: zod_1.z
        .object({
        id: zod_1.z.number(),
    })
        .optional(),
});
const validateIds = (ids) => IdsSchema.parse(ids);
exports.validateIds = validateIds;
const getReviewUrl = (id, ids) => {
    const parsed = IdsSchema.parse(ids);
    if (parsed.firefox && id === parsed.firefox.id) {
        return (0, exports.getFirefoxStoreUrl)(parsed.firefox.slug);
    }
    else if (parsed.edge && id === parsed.edge.crxId) {
        return (0, exports.getEdgeStoreUrl)(parsed.edge.crxId);
    }
    // in development mode in Edge, the url will be as follows.
    return (0, exports.getChromeStoreUrl)(parsed.chrome.id) + '/reviews';
};
exports.getReviewUrl = getReviewUrl;
