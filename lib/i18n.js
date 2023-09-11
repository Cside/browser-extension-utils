"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localizeHtml = void 0;
const localizeHtml = () => {
    const documentElement = document.documentElement;
    const innerHtmlStr = documentElement.innerHTML.toString();
    const newInnerHtmlStr = innerHtmlStr.replace(/__MSG_(\w+)__/g, (_match, p1) => chrome.i18n.getMessage(p1));
    if (newInnerHtmlStr != innerHtmlStr)
        documentElement.innerHTML = newInnerHtmlStr;
};
exports.localizeHtml = localizeHtml;
