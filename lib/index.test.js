"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const ids = {
    chrome: {
        id: 'agomiblbpgcimbonnfmlcealkjlegbnf',
        developerId: 'a66eb7ce-b7b6-4d92-a9cb-35d11a33896a',
    },
    edge: {
        crxId: 'ecoemolmjoekecgonoijkhmmheehnpjh',
        productId: '8ab15d7c-e228-4066-b9f0-dfaf0ea78a89',
    },
    firefox: {
        id: 'hatena-mute@github.com',
        slug: 'はてなミュート',
    },
    greasyFork: {
        id: 474585,
    },
};
test.each([
    {
        name: 'Chrome',
        input: 'agomiblbpgcimbonnfmlcealkjlegbnf',
        expected: 'https://chrome.google.com/webstore/detail/agomiblbpgcimbonnfmlcealkjlegbnf/reviews',
    },
    {
        name: 'Edge',
        input: 'ecoemolmjoekecgonoijkhmmheehnpjh',
        expected: 'https://microsoftedge.microsoft.com/addons/detail/ecoemolmjoekecgonoijkhmmheehnpjh',
    },
    {
        name: 'Firefox',
        input: 'hatena-mute@github.com',
        expected: 'https://addons.mozilla.org/firefox/addon/%E3%81%AF%E3%81%A6%E3%81%AA%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%88/',
    },
])('$name', ({ input, expected }) => {
    expect((0, _1.getReviewUrl)(input, ids)).toBe(expected);
});
