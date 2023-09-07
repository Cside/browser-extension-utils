import { z } from 'zod';
export const getChromeStoreUrl = (id) => 'https://chrome.google.com/webstore/detail/' + id;
export const getEdgeStoreUrl = (crxId) => 'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
export const getFirefoxStoreUrl = (slug) => `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
export const getGreasyForkUrl = (id) => 'https://greasyfork.org/ja/scripts/' + id;
export const getSubmissionUrlForChromeStore = (id, developerId) => `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
export const getSubmissionUrlForEdgeStore = (productId) => `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages/dashboard`;
export const getSubmissionUrlForFirefoxStore = (slug) => `https://addons.mozilla.org/ja/developers/addon/${encodeURIComponent(slug)}/versions/submit/`;
export const getSubmissionUrlForGreasyFork = (id) => `https://greasyfork.org/scripts/${id}/versions/new`;
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
export const validateIds = (ids) => IdsSchema.parse(ids);
export const getReviewUrl = (id, ids) => {
    const parsed = IdsSchema.parse(ids);
    if (parsed.firefox && id === parsed.firefox.id) {
        return getFirefoxStoreUrl(parsed.firefox.slug);
    }
    else if (parsed.edge && id === parsed.edge.crxId) {
        return getEdgeStoreUrl(parsed.edge.crxId);
    }
    // in development mode in Edge, the url will be as follows.
    return getChromeStoreUrl(parsed.chrome.id) + '/reviews';
};
