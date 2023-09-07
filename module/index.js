import { z } from 'zod';
const IdsSchema = z.object({
    chrome: z.object({
        id: z.string(),
        developerId: z.string(),
    }),
    edge: z
        .object({
        crxId: z.string(),
        productId: z.string(),
    })
        .optional(),
    firefox: z
        .object({
        id: z.string(),
        slug: z.string(),
    })
        .optional(),
    greasyFork: z
        .object({
        id: z.number(),
    })
        .optional(),
});
const getChromeStoreUrl = (id) => 'https://chrome.google.com/webstore/detail/' + id;
const getEdgeStoreUrl = (crxId) => 'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
const getFirefoxStoreUrl = (slug) => `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
export const getGreasyForkUrl = (id) => 'https://greasyfork.org/ja/scripts/' + id;
export const getSubmissionUrlForChromeStore = (id, developerId) => `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
export const getSubmissionUrlForEdgeStore = (productId) => `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages`;
export const getSubmissionUrlForFirefoxStore = (slug) => `https://addons.mozilla.org/ja/developers/addon/${encodeURIComponent(slug)}/versions/submit/`;
export const getSubmissionUrlForGreasyFork = (id) => `https://greasyfork.org/scripts/${id}/versions/new`;
export const validateIds = (ids) => IdsSchema.parse(ids);
export const getReviewUrl = (id, ids, { isDev } = { isDev: false }) => {
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
export const addReviewUrls = (...args) => {
    const url = getReviewUrl(...args);
    for (const a of document.querySelectorAll('a.review-link'))
        a.href = url;
};
