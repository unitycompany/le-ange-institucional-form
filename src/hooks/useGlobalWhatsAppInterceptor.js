// Hook global para interceptar cliques no WhatsApp
import { useEffect } from 'react';
import { useWhatsAppContext } from '../contexts/WhatsAppContext';

export const useGlobalWhatsAppInterceptor = () => {
    const { handleWhatsAppClick } = useWhatsAppContext();

    useEffect(() => {
        const interceptWhatsAppClicks = (event) => {
            const target = event.target;
            const link = target.closest('a[href*="whatsapp"], a[href*="wa.me"]');
            const button = target.closest('button[id="clickwpp"], [onclick*="whatsapp"], [onclick*="wa.me"]');

            // Intercepta links do WhatsApp
            if (link && (link.href.includes('whatsapp') || link.href.includes('wa.me'))) {
                event.preventDefault();
                event.stopPropagation();
                handleWhatsAppClick(event, link.href);
                return;
            }

            // Intercepta botões do WhatsApp
            if (button) {
                const onclick = button.getAttribute('onclick');
                if (onclick && (onclick.includes('whatsapp') || onclick.includes('wa.me'))) {
                    event.preventDefault();
                    event.stopPropagation();
                    // Extrai a URL do onclick
                    const urlMatch = onclick.match(/https:\/\/[^"'\s)]+/);
                    if (urlMatch) {
                        handleWhatsAppClick(event, urlMatch[0]);
                    }
                }
            }
        };

        // Adiciona o listener global
        document.addEventListener('click', interceptWhatsAppClicks, true);

        return () => {
            document.removeEventListener('click', interceptWhatsAppClicks, true);
        };
    }, [handleWhatsAppClick]);
};
