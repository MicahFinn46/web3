// Basic HTML sanitizer: removes <script>, <iframe>, <object>, <embed>, and on* attributes

function sanitizeHTML(htmlString) {
  const template = document.createElement('template');
  template.innerHTML = htmlString;

  const forbiddenTags = ['script', 'iframe', 'object', 'embed', 'link', 'style'];
  forbiddenTags.forEach(tag => {
    template.content.querySelectorAll(tag).forEach(node => node.remove());
  });

  // Remove event handler attributes like onclick, onerror, etc.
  const allElements = template.content.querySelectorAll('*');
  allElements.forEach(el => {
    [...el.attributes].forEach(attr => {
      if (attr.name.startsWith('on')) {
        el.removeAttribute(attr.name);
      }
    });
  });

  return template.innerHTML;
}
