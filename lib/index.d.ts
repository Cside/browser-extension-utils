export declare const URL_OF: {
    readonly CHROME: {
        readonly STORE: "https://chrome.google.com/webstore/detail/{id}";
        readonly SUBMISSION: "https://chrome.google.com/webstore/devconsole/{developerId}/{id}/edit/package";
    };
    readonly EDGE: {
        readonly STORE: "https://microsoftedge.microsoft.com/addons/detail/{crxId}";
        readonly SUBMISSION: "https://partner.microsoft.com/dashboard/microsoftedge/{productId}/packages";
    };
    readonly FIREFOX: {
        readonly STORE: "https://addons.mozilla.org/firefox/addon/{slug}/";
        readonly SUBMISSION: "https://addons.mozilla.org/developers/addon/{slug}/versions/submit/";
    };
    readonly GREASY_FORK: {
        readonly STORE: "https://greasyfork.org/scripts/{id}";
        readonly SUBMISSION: "https://greasyfork.org/scripts/{id}/versions/new";
    };
};
export declare const format: (str: string, args: {
    [key: string]: string | number;
}) => string;
export declare const validateIds: (ids: unknown) => {
    chrome: {
        id: string;
        developerId: string;
    };
    edge?: {
        crxId: string;
        productId: string;
    } | undefined;
    firefox?: {
        id: string;
        slug: string;
    } | undefined;
    greasyFork?: {
        id: number;
    } | undefined;
};
export declare const getReviewUrl: (id: string, ids: unknown, { isDev }?: {
    isDev: boolean;
}) => string;
export declare const addReviewUrls: (args_0: string, args_1: unknown, args_2?: {
    isDev: boolean;
} | undefined) => void;
