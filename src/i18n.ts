export const localizeHtml = () => {
  const documentElement = document.documentElement;
  const innerHtmlStr = documentElement.innerHTML.toString();
  const newInnerHtmlStr = innerHtmlStr.replace(/__MSG_(\w+)__/g, (_match, p1) =>
    chrome.i18n.getMessage(p1),
  );
  if (newInnerHtmlStr != innerHtmlStr) documentElement.innerHTML = newInnerHtmlStr;
};
