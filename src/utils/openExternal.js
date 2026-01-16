export const openExternal = (url, options = {}) => {
    if (!url) return;
    if (typeof window === 'undefined') return;

    const { target = '_blank' } = options;

    if (target === '_self' || target === '_top') {
        window.location.assign(url);
        return;
    }

    const opened = window.open(url, target, 'noopener,noreferrer');

    if (!opened) {
        window.location.href = url;
    }
};
