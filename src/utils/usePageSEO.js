/**
 * Updates document title and meta description for the current page (no extra deps, React 19 compatible).
 */
const DEFAULT_TITLE = 'SangEat | Authentic Indian Restaurant in Champaign';
const DEFAULT_DESCRIPTION = 'SangEat – Authentic Indian restaurant in Champaign. Savor freshly prepared dishes. Dine in, takeout, or delivery. Order online or book a table.';

export function usePageSEO({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION } = {}) {
  if (typeof document === 'undefined') return;
  const prevTitle = document.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  const prevContent = metaDesc ? metaDesc.getAttribute('content') : null;

  document.title = title;
  if (metaDesc) metaDesc.setAttribute('content', description);

  return () => {
    document.title = prevTitle;
    if (metaDesc && prevContent) metaDesc.setAttribute('content', prevContent);
  };
}

export function setPageSEO({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION } = {}) {
  if (typeof document === 'undefined') return;
  document.title = title || DEFAULT_TITLE;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', description || DEFAULT_DESCRIPTION);
}
