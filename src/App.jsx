import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react"
import { useGlobalWhatsAppInterceptor } from './hooks/useGlobalWhatsAppInterceptor';

import './styles/App.css';
import './styles/global.css';
import './styles/index.css';
import './styles/variables.css';

import DebugRedirect from '../debug';

import Home from './pages/Home/Home';
import Event from './pages/Event/Event';
import Sobre from './pages/Sobre/Sobre';
import Serra from './pages/Serra/Serra';
import Mar from './pages/Mar/Mar';
import PoliticaDePrivacidade from './pages/Politicas/Politica';
import NavegationBar from './components/navegationBar';
import AcomodaSerra from './pages/Acomoda/acomodaSerra';
import AcomodaMar from './pages/Acomoda/acomodaMar';
import LpMar from './pages/Mar/lpMar';
import LpSerra from './pages/Serra/lpSerra';
import Pacotes from './pages/Pacotes/pacotes';
import PacotesLP from './pages/Pacotes/LP/lp';
import Modal from './components/modal';
import ModalAlert from './components/modalAlert';
import ImagePopup from './components/ImagePopup';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function AnimatedRoutes() {
    const location = useLocation();

    // Configurações de animação para entrada e saída
    const pageTransition = {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.5, ease: 'easeInOut' }
    };

    return (
        <>
            <DebugRedirect />

            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <motion.div {...pageTransition}>
                                <Home />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/sobre"
                        element={
                            <motion.div {...pageTransition}>
                                <Sobre />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/mar"
                        element={
                            <motion.div {...pageTransition}>
                                <Mar />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/serra"
                        element={
                            <motion.div {...pageTransition}>
                                <Serra />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/event"
                        element={
                            <motion.div {...pageTransition}>
                                <Event />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/acomodaMar"
                        element={
                            <motion.div {...pageTransition}>
                                <AcomodaMar />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/pacotes"
                        element={
                            <motion.div {...pageTransition}>
                                <Pacotes />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/acomodaSerra"
                        element={
                            <motion.div {...pageTransition}>
                                <AcomodaSerra />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/politica-de-privacidade"
                        element={
                            <motion.div {...pageTransition}>
                                <PoliticaDePrivacidade />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/lpSerra"
                        element={
                            <motion.div {...pageTransition}>
                                <LpSerra />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/lpMar"
                        element={
                            <motion.div {...pageTransition}>
                                <LpMar />
                            </motion.div>
                        }
                    />
                    <Route
                        path="/pacote/:slug"
                        element={
                            <motion.div {...pageTransition}>
                                <PacotesLP />
                            </motion.div>
                        }
                    />
                </Routes>
            </AnimatePresence>
        </>
    );
}

function AppContent() {
    const location = useLocation();

    // Ativa o interceptor global de WhatsApp
    useGlobalWhatsAppInterceptor();

    // Estado para controlar o popup de imagem
    const [showImagePopup, setShowImagePopup] = React.useState(false);
    const [popupImageUrl, setPopupImageUrl] = React.useState('');

    // Rotas onde o NavegationBar deve ser escondido
    const hiddenRoutes = ['/lpMar', '/lpSerra', '/politica-de-privacidade'];

    // Verifica se a rota atual está na lista de rotas escondidas
    const hideNav = hiddenRoutes.some((route) => location.pathname.startsWith(route));

    // Função para abrir o popup de imagem (pode ser chamada de qualquer lugar)
    const openImagePopup = (imageUrl) => {
        setPopupImageUrl(imageUrl);
        setShowImagePopup(true);
    };

    // Função para fechar o popup de imagem
    const closeImagePopup = () => {
        setShowImagePopup(false);
    };

    // Mostrar o popup sempre que a rota mudar ou a página carregar
    React.useEffect(() => {
        // Pequeno delay para melhor UX
        const timer = setTimeout(() => {
            setShowImagePopup(true);
        }, 1000); // 1 segundo de delay

        return () => clearTimeout(timer);
    }, [location.pathname]); // Dependência na rota atual - popup aparece a cada mudança de página

    // Função para fechar o popup
    const handleClosePopup = () => {
        closeImagePopup();
    };

    return (
        <>
            {!hideNav && <NavegationBar />}
            <AnimatedRoutes />

            {/* Popup de Imagem */}
            <ImagePopup
                show={showImagePopup}
                onClose={handleClosePopup}
                imageUrl={popupImageUrl}
                imageAlt="Popup Promocional"
            />

            {/* Adicione o SpeedInsights aqui */}
            <SpeedInsights />
            <Analytics />
        </>
    );
}

function App() {
    return (
        <Router>

            <ScrollToTop />
            <AppContent />
        </Router>
    );
}

export default App;
