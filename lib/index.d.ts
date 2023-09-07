export declare const getChromeStoreUrl: (id: string) => string;
export declare const getEdgeStoreUrl: (crxId: string) => string;
export declare const getFirefoxStoreUrl: (slug: string) => string;
export declare const getGreasyForkUrl: (id: string) => string;
export declare const getSubmissionUrlForChromeStore: (id: string, developerId: string) => string;
export declare const getSubmissionUrlForEdgeStore: (productId: string) => string;
export declare const getSubmissionUrlForFirefoxStore: (slug: string) => string;
export declare const getSubmissionUrlForGreasyFork: (id: string) => string;
export declare const getReviewUrl: (id: string, ids: {
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
}) => string;
