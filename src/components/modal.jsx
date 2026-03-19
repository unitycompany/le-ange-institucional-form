import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ModalAll = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1000;
    background-color: #00000050;
    backdrop-filter: blur(4px);
    font-family: var(--font--comfortaa);
    display: ${({ show }) => (show ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const ModalContent = styled.div`
    z-index: 1000;
    background-color: var(--color--white);
    padding: 50px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65%;
    gap: 30px;

    @media (max-width: 768px){
        width: 90%;
        height: auto;
        padding: 35px 25px;
        gap: 20px;
    }

    & h1 {
        color: #04808c;
        font-weight: 400;
        font-size: 36px;
        width: 80%;
        border-bottom: 1px solid #00000020;
        text-align: center;
        padding-bottom: 10px;

        @media (max-width: 768px){
            width: 100%;
            font-size: 20px;
            white-space: nowrap;
        }
    }

    & > div:nth-child(2) {
        & span {
            font-size: 40px;
            font-weight: 300;
        }
    }

    & > span {
        width: 80%;
        font-size: 14px;
        font-weight: 300;
        text-align: center;

        @media (max-width: 768px){
            width: 100%;
            font-size: 10px;
        }
    }

    & > div:nth-child(4) {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 80%;

        @media (max-width: 768px){
            width: 100%;
        }

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;

            & span {
                font-size: 30px;
                color: #475323;
            }

            & p {
                font-size: 14px;
                color: var(--color--black);
            }
        }
    }

    & > button:nth-child(5) {
        width: 80%;
        padding: 20px;
        background-color: #04808c;
        color: var(--color--white);
        font-size: 18px;
        font-weight: 500;
        border: none;
        transition: all 0.2s ease;
        cursor: pointer;

        @media (max-width: 768px){
            width: 100%;
            font-size: 14px;
        }

        &:hover {
            background-color: #475323;
        }
    }

    & > button:nth-child(6) {
        background-color: transparent;
        border: none;
        transition: all 0.2s ease;
        cursor: pointer;

        @media (max-width: 768px){
            font-size: 12px;
        }

        &:hover {
            color: red;
        }
    }
`;

const Miniatura = styled.div`
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: #04808c;
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    display: ${({ show }) => (show ? "block" : "none")};
    z-index: 100;
    font-family: var(--font--comfortaa);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px){
        font-size: 12px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
        left: 30px;
        bottom: 30px;
    }
`;

const Modal = () => {
    // Função para verificar se já passou das 20:01
    const isExpired = () => {
        const now = new Date();
        return now.getHours() >= 20 && now.getMinutes() >= 1;
    };

    const [showModal, setShowModal] = useState(() => {
        // Se já passou das 20:01, verifica no localStorage para esconder permanentemente
        return localStorage.getItem("modalExpired") || isExpired() ? false : true;
    });

    const [showMini, setShowMini] = useState(false);
    const [timeLeft, setTimeLeft] = useState("00:00:00");

    useEffect(() => {
        if (isExpired()) {
            setShowModal(false);
            setShowMini(false);
            localStorage.setItem("modalExpired", "true");
            return;
        }

        const targetTime = new Date();
        targetTime.setHours(20, 1, 0, 0); // Fim da promoção às 20:01

        const interval = setInterval(() => {
            const now = new Date();
            const diff = targetTime - now;

            if (diff <= 0) {
                clearInterval(interval);
                setShowModal(false);
                setShowMini(false);
                localStorage.setItem("modalExpired", "true");
            } else {
                const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
                const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
                const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
                setTimeLeft(`${hours}:${minutes}:${seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <ModalAll show={showModal}>
                <ModalContent>
                    <h1>PROMOÇÃO RELÂMPAGO</h1>
                    <div>
                        <span>{timeLeft}</span>
                    </div>
                    <span>
                        Promoção válida apenas para reservas realizadas para o mês de março, não cumulativa com outras ofertas, não aplicável para pacotes, feriados ou períodos de alta procura.
                    </span>
                    <div>
                        <div>
                            <span>20%</span>
                            <p>2 Diárias</p>
                        </div>
                        <div>
                            <span>40%</span>
                            <p>4 Diárias</p>
                        </div>
                        <div>
                            <span>30%</span>
                            <p>3 Diárias</p>
                        </div>
                    </div>
                    <button onClick={() => window.location.href = 'https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/c3b54b40-7566-4d71-8130-55158bcb13d7'}>
                        <span>RESGATAR MINHA PROMOÇÃO</span>
                    </button>
                    <button onClick={() => { setShowModal(false); setShowMini(true); }}>
                        NÃO, TALVEZ NA PRÓXIMA
                    </button>
                </ModalContent>
            </ModalAll>

            <Miniatura show={showMini} onClick={() => { setShowModal(true); setShowMini(false); }}>
                ⏳ {timeLeft} - Promoção Relâmpago
            </Miniatura>
        </>
    );
};

export default Modal;
