export const openExternal = (url, options = {}) => {
    if (!url) return;
    if (typeof window === 'undefined') return;

    const { target = '_blank' } = options;

    const opened = window.open(url, target, 'noopener,noreferrer');

    if (!opened) {
        window.location.href = url;
    }
};
