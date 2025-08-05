import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import { useWhatsAppContext } from "../contexts/WhatsAppContext";

const StyledButtonAcomodo = styled.button`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px; 
  padding: 0px 20px;
  font-size: 12px;
  background-color: ${({ backDefine }) => backDefine || 'var(--color--white)'};
  border-radius: 10px;
  color: ${({ colorDefine }) => colorDefine || 'var(--color--black)'};
  border: none;
  position: relative;
  cursor: pointer;
  transition-duration: 0.2s;
  font-family: var(--font--comfortaa);
  font-weight: 600;
  left: 0;
  bottom: 0;

  .icon {
    font-size: 18px;
    color: var(--color--black);
    margin-left: 8px;
  }

  &:hover {
    background-color: var(--color--black);
    color: var(--color--white);
  }

  &:hover .icon {
    transform: translateX(5px); 
    transition: transform 0.3s ease;
    color: var(--color--white);
  }

  &:active {
    transform: translate(1px, 1px);
    transition-duration: 0.2s;
  }
`;

const ButtonAcomoda = ({ text, onClick, backDefine, colorDefine, idBtn = "clickwpp" }) => {
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
    <StyledButtonAcomodo
      id={idBtn}
      backDefine={backDefine}
      colorDefine={colorDefine}
      onClick={handleClick}
    >
      {text}
      <FaArrowRight className="icon" id={idBtn} />
    </StyledButtonAcomodo>
  );
};

export default ButtonAcomoda;
