import React from 'react';
import styled from 'styled-components';
import { MdHotel } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
import { useWhatsAppContext } from "../contexts/WhatsAppContext";

const ButtonContainer = styled.button`
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
  background-color: var(--color--green);
  border: solid 2px ${({ borderColor }) => borderColor || 'var(--color--black)'};
  color: ${({ textColor }) => textColor || 'var(--color--black)'};
  font-family: inherit;

  &:hover .default-btn {
    transform: translate(0%, -100%);
  }

  &:hover .hover-btn {
    transform: translate(0%, 0%);
  }
`;

const DefaultButton = styled.div`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: var(--font--comfortaa);
  gap: 10px;
  padding: 10px 30px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    padding: 7px 30px;
    font-size: 12px;
  }
`;

const HoverButton = styled(DefaultButton)`
  position: absolute;
  inset: 0;
  background-color: ${({ hoverColor }) => hoverColor || 'var(--color--blue)'};
  transform: translate(0%, 100%);
`;

const ButtonText = styled.span`
  color: ${({ textColor }) => textColor || 'var(--color--black)'};
`;

const HoverButtonText = styled.span`
  color: ${({ hoverTextColor }) => hoverTextColor || 'var(--color--white)'};
`;

const IconButton = ({
  text = "Quick View",
  text2 = "Clique e reserve",
  borderColor,
  textColor,
  hoverColor,
  hoverTextColor,
  idBtn = "clickwpp",
}) => {
  const { handleWhatsAppClick } = useWhatsAppContext();

  const handleClick = (event) => {
    console.log("Botão clicado com id:", event.currentTarget.id);
    console.log("Evento:", event);
    console.log("Elemento alvo (target):", event.target);
    console.log("Elemento atual (currentTarget):", event.currentTarget);
    console.log("Abrindo popup do WhatsApp...");

    event.stopPropagation();

    const whatsappUrl = "https://wa.me/5521994230871?text=Ol%C3%A1%2C%20Pousada%20Le%20Ange!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20pousada";
    handleWhatsAppClick(event, whatsappUrl);
  };

  const handleMouseEnter = () => {
    console.log("Mouse entrou no botão.");
  };

  const handleMouseLeave = () => {
    console.log("Mouse saiu do botão.");
  };

  return (
    <ButtonContainer
      borderColor={borderColor}
      textColor={textColor}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={idBtn}
    >
      <DefaultButton className="default-btn" id={idBtn}>
        <MdHotel size={15} color={textColor || 'var(--color--black)'} id={idBtn} />
        <ButtonText textColor={textColor} id={idBtn}>{text}</ButtonText>
      </DefaultButton>
      <HoverButton className="hover-btn" hoverColor={hoverColor} id={idBtn}>
        <LuMousePointerClick size={15} color={hoverTextColor || 'var(--color--white)'} id={idBtn} />
        <HoverButtonText hoverTextColor={hoverTextColor} id={idBtn}>{text2}</HoverButtonText>
      </HoverButton>
    </ButtonContainer>
  );
};

export default IconButton;

