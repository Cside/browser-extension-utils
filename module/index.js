export const getChromeStoreUrl = (id) => 'https://chrome.google.com/webstore/detail/' + id;
export const getEdgeStoreUrl = (crxId) => 'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
export const getFirefoxStoreUrl = (slug) => `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
export const getGreasyForkUrl = (id) => 'https://greasyfork.org/ja/scripts/' + id;
export const getSubmissionUrlForChromeStore = (id, developerId) => `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
export const getSubmissionUrlForEdgeStore = (productId) => `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages/dashboard`;
export const getSubmissionUrlForFirefoxStore = (slug) => ` "https://addons.mozilla.org/ja/developers/addon/${slug}/versions/submit/`;
export const getSubmissionUrlForGreasyFork = (id) => `https://greasyfork.org/scripts/${id}/versions/new`;
export const getReviewUrl = (id, ids) => {
    if (ids.firefox && id === ids.firefox.id) {
        return getFirefoxStoreUrl(ids.firefox.slug);
    }
    else if (ids.edge && id === ids.edge.crxId) {
        return getEdgeStoreUrl(ids.edge.crxId);
    }
    // in development mode in Edge, the url will be as follows.
    return getChromeStoreUrl(ids.chrome.id);
};
