import { BOOKING_PROPERTIES } from '../constants/bookingEngine';

const DEFAULT_BASE_URL = 'https://book.omnibees.com/hotelresults';

const resolvePropertyByPath = (pathname = '') => {
    const normalizedPath = String(pathname).toLowerCase();

    if (normalizedPath.includes('mar')) {
        return BOOKING_PROPERTIES.mar;
    }

    if (normalizedPath.includes('serra')) {
        return BOOKING_PROPERTIES.serra;
    }

    return BOOKING_PROPERTIES.serra;
};

export const isWhatsAppUrl = (url = '') => {
    const normalizedUrl = String(url).toLowerCase();
    return (
        normalizedUrl.includes('wa.me')
        || normalizedUrl.includes('whatsapp.com')
        || normalizedUrl.includes('api.whatsapp.com')
    );
};

export const getBookingEngineUrl = (pathname) => {
    const currentPath = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '');
    const property = resolvePropertyByPath(currentPath);
    const propertyId = property?.q || BOOKING_PROPERTIES.serra.q;

    const params = new URLSearchParams();
    params.set('q', propertyId);
    params.set('NRooms', '1');

    return `${DEFAULT_BASE_URL}?${params.toString()}`;
};

export const redirectToBookingEngine = ({ target = '_self', pathname } = {}) => {
    if (typeof window === 'undefined') return;

    const bookingUrl = getBookingEngineUrl(pathname);

    if (target === '_self' || target === '_top') {
        window.location.assign(bookingUrl);
        return;
    }

    const opened = window.open(bookingUrl, target, 'noopener,noreferrer');
    if (!opened) {
        window.location.assign(bookingUrl);
    }
};