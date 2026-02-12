import React from "react";
import styled from "styled-components";
import { MdOutlinePets } from "react-icons/md";
import { useWhatsAppContext } from "../contexts/WhatsAppContext";

const ButtonWrapper = styled.button`
  background: ${(props) => props.backgroundColor || "transparent"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-family: var(--font--comfortaa);
  padding: 2px 15px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border-radius: 25px;
  outline: none;
  overflow: hidden;
  color: ${(props) => props.textColor || "#000"};
  border: 1px solid ${(props) => props.borderColor || "#000"};
  transition: color 0.1s ease-out;
  text-align: center;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    content: "";
    border-radius: 50%;
    display: block;
    width: 20em;
    height: 20em;
    left: -5em;
    transition: box-shadow 0.5s ease-out;
    z-index: -1;
  }

  &:hover {
    color: ${({ hoverColor }) => hoverColor || ''};
    border: 1px solid ${(props) => props.hoverBorderColor || props.borderColor || "#000"};
  }

  &:hover::before {
    box-shadow: inset 0 0 0 10em ${(props) => props.hoverBackgroundColor || props.borderColor || "#000"};
  }
`;

const Icon = styled(MdOutlinePets)`
  color: ${(props) => props.iconColor || "currentColor"};
  height: 20px;
  width: 20px;
  transition: color 0.3s ease;

  ${ButtonWrapper}:hover & {
    color: ${(props) => props.hoverIconColor || props.iconColor || "currentColor"};
  }
`;

const Text = styled.span`
  margin: 10px;
`;

const CustomButton = ({
  text = "Fazer reserva agora!",
  textColor,
  backgroundColor,
  borderColor,
  iconColor,
  hoverIconColor,
  hoverBackgroundColor,
  hoverBorderColor,
  hoverColor,
  onClick,
  idBtn = "clickwpp",
}) => {
  const { handleWhatsAppClick } = useWhatsAppContext();

  const handleClick = (event) => {
    console.log("Botão clicado com id:", event.currentTarget.id);

    // Se for um botão do WhatsApp, intercepta e abre o popup
    if (idBtn === "clickwpp" || (onClick && onClick.toString().includes('whatsapp'))) {
      const whatsappUrl = "https://wa.me/5521994230871?text=Ol%C3%A1%2C%20Pousada%20Le%20Ange!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20pousada";
      handleWhatsAppClick(event, whatsappUrl);
      return;
    }

    if (onClick) onClick(event);
  };

  return (
    <ButtonWrapper
      id={idBtn}
      onClick={handleClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      hoverBackgroundColor={hoverBackgroundColor}
      hoverBorderColor={hoverBorderColor}
      hoverColor={hoverColor}
    >
      <Icon iconColor={iconColor} hoverIconColor={hoverIconColor} id={idBtn} />
      <Text id={idBtn}>{text}</Text>
    </ButtonWrapper>
  );
};

export default CustomButton;
