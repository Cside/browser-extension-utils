export const getChromeStoreUrl = (id: string) =>
  'https://chrome.google.com/webstore/detail/' + id;
export const getEdgeStoreUrl = (crxId: string) =>
  'https://microsoftedge.microsoft.com/addons/detail/' + crxId;
export const getFirefoxStoreUrl = (slug: string) =>
  `https://addons.mozilla.org/firefox/addon/${encodeURIComponent(slug)}/`;
export const getGreasyForkUrl = (id: string) =>
  'https://greasyfork.org/ja/scripts/' + id;

export const getSubmissionUrlForChromeStore = (
  id: string,
  developerId: string,
) =>
  `https://chrome.google.com/webstore/devconsole/${developerId}/${id}/edit/package`;
export const getSubmissionUrlForEdgeStore = (productId: string) =>
  `https://partner.microsoft.com/dashboard/microsoftedge/${productId}/packages/dashboard`;
export const getSubmissionUrlForFirefoxStore = (slug: string) =>
  `https://addons.mozilla.org/ja/developers/addon/${encodeURIComponent(
    slug,
  )}/versions/submit/`;
export const getSubmissionUrlForGreasyFork = (id: string) =>
  `https://greasyfork.org/scripts/${id}/versions/new`;

export const getReviewUrl = (
  id: string,
  ids: {
    chrome: {
      id: string;
      developerId: string;
    };
    edge?: {
      crxId: string;
      productId: string;
    };
    firefox?: {
      id: string;
      slug: string;
    };
    greasyFork?: {
      id: string;
    };
  },
): string => {
  if (ids.firefox && id === ids.firefox.id) {
    return getFirefoxStoreUrl(ids.firefox.slug);
  } else if (ids.edge && id === ids.edge.crxId) {
    return getEdgeStoreUrl(ids.edge.crxId);
  }
  // in development mode in Edge, the url will be as follows.
  return getChromeStoreUrl(ids.chrome.id);
};
