"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewUrls = exports.getReviewUrl = exports.validateIds = exports.getSubmissionUrlForGreasyFork = exports.getSubmissionUrlForFirefoxStore = exports.getSubmissionUrlForEdgeStore = exports.getSubmissionUrlForChromeStore = exports.getGreasyForkUrl = void 0;
const zod_1 = require("zod");
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
const getChromeStoreUrl = (id) => 'https://chrome.google.com/webstore/detail/' + id;
const getEdgeStoreUrl = (crxId) => 'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
const getFirefoxStoreUrl = (slug) => `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
const getGreasyForkUrl = (id) => 'https://greasyfork.org/ja/scripts/' + id;
exports.getGreasyForkUrl = getGreasyForkUrl;
const getSubmissionUrlForChromeStore = (id, developerId) => `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
exports.getSubmissionUrlForChromeStore = getSubmissionUrlForChromeStore;
const getSubmissionUrlForEdgeStore = (productId) => `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages`;
exports.getSubmissionUrlForEdgeStore = getSubmissionUrlForEdgeStore;
const getSubmissionUrlForFirefoxStore = (slug) => `https://addons.mozilla.org/ja/developers/addon/${encodeURIComponent(slug)}/versions/submit/`;
exports.getSubmissionUrlForFirefoxStore = getSubmissionUrlForFirefoxStore;
const getSubmissionUrlForGreasyFork = (id) => `https://greasyfork.org/scripts/${id}/versions/new`;
exports.getSubmissionUrlForGreasyFork = getSubmissionUrlForGreasyFork;
const validateIds = (ids) => IdsSchema.parse(ids);
exports.validateIds = validateIds;
const getReviewUrl = (id, ids, { isDev } = { isDev: false }) => {
    const parsed = IdsSchema.parse(ids);
    if (parsed.firefox && id === parsed.firefox.id) {
        return getFirefoxStoreUrl(parsed.firefox.slug);
    }
    else if (parsed.edge && id === parsed.edge.crxId) {
        return getEdgeStoreUrl(parsed.edge.crxId);
    }
    else if (id === parsed.chrome.id) {
        return getChromeStoreUrl(parsed.chrome.id) + '/reviews';
    }
    if (!isDev)
        throw new Error(`Unknown id: ${id}`);
    return getChromeStoreUrl(parsed.chrome.id) + '/reviews';
};
exports.getReviewUrl = getReviewUrl;
const addReviewUrls = (...args) => {
    const url = (0, exports.getReviewUrl)(...args);
    for (const a of document.querySelectorAll('a.review-link'))
        a.href = url;
};
exports.addReviewUrls = addReviewUrls;
