import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

const DropdownContainer = styled.div`
  position: relative;
  width: auto;
  font-family: Arial, sans-serif;
`;

const DropdownHeader = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  width: auto;
  justify-content: space-between;
  gap: 15px;
  align-items: center;
  font-size: 12px;
  font-family: var(--font--comfortaa);
  font-weight: 500;
  color: var(--color--black);

  @media (max-width: 768px) {
    margin-top: -7px;
    gap: 10px;
  }

  &:hover {
    border-color: #007bff;
  }
`;

const DropdownList = styled.div`
  position: absolute;
  top: ${({ isOpen }) => (isOpen ? "calc(100% + 0.5rem)" : "calc(100% + 0.5rem)")};
  left: 0;
  width: 200px;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
  transform: ${({ isOpen }) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
  transition: transform 0.3s ease, max-height 0.3s ease;

  @media (max-width: 768px) {
    max-width: ${({ isOpen }) => (isOpen ? "150px" : "0")};
    top: 0;
    max-height: 300px;
    left: ${({ isOpen }) => (isOpen ? "calc(100% + 0.2rem)" : "calc(100% + 0.5rem)")};
  }
`;

const DropdownItem = styled.div`
  padding: 14px;
  cursor: pointer;
  font-size: 12px;
  color: var(--color--black);
  transition: background-color 0.2s ease;
  font-family: var(--font--comfortaa);

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 11px;
    border: none;
  }

  &:hover {
    background-color: var(--color--green);
    color: #fff;
  }

`;

const DropdownArrow = styled.span`
  font-size: 16px;
  color: #666;
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ isOpen }) => isOpen && `transform: rotate(180deg);`}

  @media (max-width: 768px) {
    ${({ isOpen }) => isOpen && `transform: rotate(-90deg);`}
  }
`;

const RedirectDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const options = [
    { label: "Acomodações Serra", path: "/acomodaSerra" },
    { label: "Acomodações Mar", path: "/acomodaMar" },
    // { label: "Faça o seu Evento", path: "/event" },
  ];

  const handleSelect = (option) => {
    setIsOpen(false);
    navigate(option.path);
  };

  // Fecha o dropdown ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        Acomodações
        <DropdownArrow isOpen={isOpen}>
          <IoIosArrowDown />
        </DropdownArrow>
      </DropdownHeader>
      <DropdownList isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.path}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default RedirectDropdown;
