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

export const getReviewUrl = (id: string, ids: unknown): string => {
  const parsed = IdsSchema.parse(ids);

  if (parsed.firefox && id === parsed.firefox.id) {
    return getFirefoxStoreUrl(parsed.firefox.slug);
  } else if (parsed.edge && id === parsed.edge.crxId) {
    return getEdgeStoreUrl(parsed.edge.crxId);
  }
  // in development mode in Edge, the url will be as follows.
  return getChromeStoreUrl(parsed.chrome.id) + '/reviews';
};
