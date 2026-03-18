import { getBookingEngineUrl, isWhatsAppUrl } from './bookingRedirect';

export const openExternal = (url, options = {}) => {
    if (!url) return;
    if (typeof window === 'undefined') return;

    const { target = '_blank' } = options;
    const destinationUrl = isWhatsAppUrl(url) ? getBookingEngineUrl() : url;

    if (target === '_self' || target === '_top') {
        window.location.assign(destinationUrl);
        return;
    }

    const opened = window.open(destinationUrl, target, 'noopener,noreferrer');

    if (!opened) {
        window.location.href = destinationUrl;
    }
};
