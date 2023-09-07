export declare const getGreasyForkUrl: (id: string) => string;
export declare const getSubmissionUrlForChromeStore: (id: string, developerId: string) => string;
export declare const getSubmissionUrlForEdgeStore: (productId: string) => string;
export declare const getSubmissionUrlForFirefoxStore: (slug: string) => string;
export declare const getSubmissionUrlForGreasyFork: (id: string) => string;
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
