import { useState, useCallback } from 'react';
import { redirectToBookingEngine } from '../utils/bookingRedirect';

export const useWhatsAppPopup = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [originalUrl, setOriginalUrl] = useState('');

    const openWhatsAppPopup = useCallback((whatsappUrl) => {
        setOriginalUrl(whatsappUrl);
        setIsPopupOpen(true);
    }, []);

    const closeWhatsAppPopup = useCallback(() => {
        setIsPopupOpen(false);
        setOriginalUrl('');
    }, []);

    // Função para interceptar cliques no WhatsApp
    const handleWhatsAppClick = useCallback((e, whatsappUrl) => {
        e.preventDefault();
        e.stopPropagation();
        redirectToBookingEngine({ target: '_self' });
    }, []);

    return {
        isPopupOpen,
        originalUrl,
        openWhatsAppPopup,
        closeWhatsAppPopup,
        handleWhatsAppClick,
    };
};
