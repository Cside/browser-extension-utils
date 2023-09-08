"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReviewUrls = exports.getReviewUrl = exports.validateIds = exports.format = exports.URL_OF = void 0;
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
exports.URL_OF = {
    CHROME: {
        STORE: 'https://chrome.google.com/webstore/detail/{id}',
        SUBMISSION: 'https://chrome.google.com/webstore/devconsole/{developerId}/{id}/edit/package',
    },
    EDGE: {
        STORE: 'https://microsoftedge.microsoft.com/addons/detail/{crxId}',
        SUBMISSION: 'https://partner.microsoft.com/dashboard/microsoftedge/{productId}/packages',
    },
    FIREFOX: {
        STORE: 'https://addons.mozilla.org/firefox/addon/{slug}/',
        SUBMISSION: 'https://addons.mozilla.org/ja/developers/addon/{slug}/versions/submit/',
    },
    GREASY_FORK: {
        STORE: 'https://greasyfork.org/ja/scripts/{id}',
        SUBMISSION: 'https://greasyfork.org/scripts/{id}/versions/new',
    },
};
const format = (str, args) => {
    for (const [key, value] of Object.entries(args)) {
        str = str.replaceAll(`{${key}}`, typeof value === 'string' ? value : String(value));
    }
    return str;
};
exports.format = format;
const validateIds = (ids) => IdsSchema.parse(ids);
exports.validateIds = validateIds;
const getReviewUrl = (id, ids, { isDev } = { isDev: false }) => {
    const parsed = IdsSchema.parse(ids);
    if (parsed.firefox && id === parsed.firefox.id) {
        return (0, exports.format)(exports.URL_OF.FIREFOX.STORE, { slug: parsed.firefox.slug });
    }
    else if (parsed.edge && id === parsed.edge.crxId) {
        return (0, exports.format)(exports.URL_OF.EDGE.STORE, { crxId: parsed.edge.crxId });
    }
    else if (id === parsed.chrome.id) {
        return (0, exports.format)(exports.URL_OF.CHROME.STORE, { id: parsed.chrome.id }) + '/reviews';
    }
    if (!isDev)
        throw new Error(`Unknown id: ${id}`);
    return (0, exports.format)(exports.URL_OF.CHROME.STORE, { id: parsed.chrome.id }) + '/reviews';
};
exports.getReviewUrl = getReviewUrl;
const addReviewUrls = (...args) => {
    const url = (0, exports.getReviewUrl)(...args);
    for (const a of document.querySelectorAll('a.review-link'))
        a.href = url;
};
exports.addReviewUrls = addReviewUrls;
