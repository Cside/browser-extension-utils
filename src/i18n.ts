export const localizeText = () => {
  for (const element of document.querySelectorAll('.locale'))
    for (const node of element.childNodes)
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent !== null &&
        node.textContent.includes('__MSG_')
      )
        node.textContent = node.textContent.replace(/__MSG_(\w+)__/g, (_match, p1) =>
          chrome.i18n.getMessage(p1),
        );
};
