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

export const URL_OF = {
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
    SUBMISSION: 'https://addons.mozilla.org/developers/addon/{slug}/versions/submit/',
  },
  GREASY_FORK: {
    STORE: 'https://greasyfork.org/scripts/{id}',
    SUBMISSION: 'https://greasyfork.org/scripts/{id}/versions/new',
  },
} as const;

export const format = (str: string, args: { [key: string]: string | number }) => {
  for (const [key, value] of Object.entries(args)) {
    str = str.replaceAll(`{${key}}`, typeof value === 'string' ? value : String(value));
  }
  return str;
};

export const validateIds = (ids: unknown) => IdsSchema.parse(ids);

export const getReviewUrl = (id: string, ids: unknown) => {
  const parsed = IdsSchema.parse(ids);

  if (parsed.firefox && id === parsed.firefox.id) {
    return format(URL_OF.FIREFOX.STORE, { slug: encodeURIComponent(parsed.firefox.slug) });
  } else if (parsed.edge && id === parsed.edge.crxId) {
    // prod mode only
    return format(URL_OF.EDGE.STORE, { crxId: parsed.edge.crxId });
  }
  // in development mode in Edge and Chrome, url becomes as follows
  return format(URL_OF.CHROME.STORE, { id: parsed.chrome.id }) + '/reviews';
};

/**
 * @deprecated since version 0.0.9
 */
export const addReviewUrls = (...args: Parameters<typeof getReviewUrl>) => {
  const url = getReviewUrl(...args);
  for (const a of document.querySelectorAll<HTMLAnchorElement>('a.review-link')) a.href = url;
};

export const addReviewUrl = ({
  selector,
  id,
  ids,
}: {
  selector: string;
  id: string;
  ids: unknown;
}) => {
  const url = getReviewUrl(id, ids);
  const link = document.querySelector<HTMLAnchorElement>(selector);
  if (!link) throw new Error(`${selector} is not found`);
  link.href = url;
};
