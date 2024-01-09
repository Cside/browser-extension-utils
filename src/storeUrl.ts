import { $number, $object, $opt, $string, access, Infer } from 'lizod';

const _isValidIds = $object({
  chrome: $object({
    id: $string,
    developerId: $string,
  }),
  edge: $opt(
    $object({
      crxId: $string,
      productId: $string,
    }),
  ),
  firefox: $opt(
    $object({
      id: $string,
      slug: $string,
    }),
  ),
  greasyFork: $opt(
    $object({
      id: $number,
    }),
  ),
});

export const isValidIds = (
  ids: unknown,
  ctx: { error: Error | undefined },
): ids is Infer<typeof _isValidIds> => {
  const lizodCtx = { errors: [] };
  const result = _isValidIds(ids, lizodCtx);
  if (result) return true;

  ctx.error = new Error(
    `Invalid ids: ${JSON.stringify(
      lizodCtx.errors.map((errorPath) => ({
        path: errorPath,
        value: access(ids, errorPath),
      })),
      null,
      2,
    )}`,
  );
  return false;
};

export const URL_OF = {
  CHROME: {
    STORE: 'https://chromewebstore.google.com/detail/{id}',
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

export const getReviewUrl = (id: string, ids: unknown) => {
  const ctx = { error: undefined };
  if (isValidIds(ids, ctx)) {
    if (ids.firefox && id === ids.firefox.id) {
      return format(URL_OF.FIREFOX.STORE, { slug: encodeURIComponent(ids.firefox.slug) });
    } else if (ids.edge && id === ids.edge.crxId) {
      // prod mode only
      return format(URL_OF.EDGE.STORE, { crxId: ids.edge.crxId });
    }
    // in development mode in Edge and Chrome, url becomes as follows
    return format(URL_OF.CHROME.STORE, { id: ids.chrome.id }) + '/reviews';
  }
  throw ctx.error;
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
