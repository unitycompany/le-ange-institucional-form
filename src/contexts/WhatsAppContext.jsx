import React, { createContext, useContext } from 'react';
import { useWhatsAppPopup } from '../hooks/useWhatsAppPopup';
import WhatsAppPopup from '../components/WhatsAppPopup';

const WhatsAppContext = createContext();

export const useWhatsAppContext = () => {
    const context = useContext(WhatsAppContext);
    if (!context) {
        throw new Error('useWhatsAppContext must be used within a WhatsAppProvider');
    }
    return context;
};

export const WhatsAppProvider = ({ children }) => {
    const whatsappPopup = useWhatsAppPopup();

    return (
        <WhatsAppContext.Provider value={whatsappPopup}>
            {children}
            <WhatsAppPopup
                isOpen={whatsappPopup.isPopupOpen}
                onClose={whatsappPopup.closeWhatsAppPopup}
                originalWhatsAppUrl={whatsappPopup.originalUrl}
            />
        </WhatsAppContext.Provider>
    );
};
