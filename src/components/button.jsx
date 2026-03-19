import { useEffect } from 'react';
import styled from 'styled-components';
import { useWhatsAppContext } from "../contexts/WhatsAppContext";

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 8px 36px;
    font-size: 12px;
    font-weight: 600;
    color: ${({ color }) => color || 'var(--color--black)'};
    background-color: ${({ background }) => background || 'inherit'};
    border: 2px solid ${({ borderColor }) => borderColor || 'transparent'};
    border-radius: 100px;
    box-shadow: 0 0 0 2px var(--color--black);
    cursor: pointer;
    overflow: hidden;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    font-family: var(--font--comfortaa);

    @media(max-width: 768px){
        font-size: 10px;    
    }

    &:hover {
        box-shadow: 0 0 0 12px transparent;
        color: ${({ hoverColor }) => hoverColor || 'var(--color--black)'};
        border-radius: 40px;
    }

    &:active {
        scale: 0.95;
        box-shadow: 0 0 0 4px var(--color--black);
    }
`;

const ArrowIcon = styled.svg`
    position: absolute;
    width: 24px;
    fill: var(--color--black);
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    &.arr-1 {
        right: 16px;
    }

    &.arr-2 {
        left: -25%;
    }

    ${StyledButton}:hover &.arr-1 {
        right: -25%;
    }

    ${StyledButton}:hover &.arr-2 {
        left: 16px;
    }

    ${StyledButton}:hover & {
        fill: var(--color--white);
    }
`;

const Circle = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: var(--color--black);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    ${StyledButton}:hover & {
        width: 220px;
        height: 220px;
        opacity: 1;
        color: var(--color--white);
    }
`;

const ButtonText = styled.span`
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);

    ${StyledButton}:hover & {
        transform: translateX(12px);
        color: var(--color--white);
    }
`;

const Button = ({ text, onClick, color, backgroundColor, borderColor, hoverColor, idBtn }) => {
    const { handleWhatsAppClick } = useWhatsAppContext();

    const handleClick = (event) => {
        console.log("Botão clicado com id:", event.currentTarget.id);

        // Se for um botão do WhatsApp, intercepta e abre o popup
        if (idBtn === "clickwpp" || (onClick && onClick.toString().includes('whatsapp'))) {
            const whatsappUrl = "https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329";
            handleWhatsAppClick(event, whatsappUrl);
            return;
        }

        if (onClick) onClick(event);
    };

    return (
        <StyledButton
            id={idBtn}
            onClick={handleClick}
            color={color}
            background={backgroundColor}
            borderColor={borderColor}
            hoverColor={hoverColor}
        >
            <ArrowIcon className="arr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" id={idBtn} />
            </ArrowIcon>
            <ButtonText id={idBtn}>{text}</ButtonText>
            <Circle id={idBtn} />
            <ArrowIcon className="arr-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" id={idBtn} />
            </ArrowIcon>
        </StyledButton>
    );
};

export default Button;