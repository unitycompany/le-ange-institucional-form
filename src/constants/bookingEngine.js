export const BOOKING_PROPERTIES = {
    mar: {
        id: 'mar',
        label: 'Le Ange Mar',
        q: import.meta.env.VITE_OMNIBEES_MAR_ID || '22528',
    },
    serra: {
        id: 'serra',
        label: 'Le Ange Serra',
        q: import.meta.env.VITE_OMNIBEES_SERRA_ID || '22523',
    },
};

export const BOOKING_GENERAL_PROPERTIES = [BOOKING_PROPERTIES.serra, BOOKING_PROPERTIES.mar];