import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig"

import { FaRegCheckCircle } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const shine = keyframes`
  0% { left: -200px; }
  100% { left: 100%; }
`;

const CardContainer = styled.div`
    width: 400px!important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: relative!important;
    border-radius: 20px;
    gap: 10px;
    background-color: #fff9f9;
    border: 1px solid var(--color--black);

    @media (max-width: 768px) {
        width: 100%!important;
    }
`

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const zoom = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
`;

// Estilização do CardAlert
const CardAlert = styled.div`
  position: absolute;
  right: -30px;
  top: -30px;
  width: 90px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color--green);
  border-radius: 50%;
  border: 2px solid var(--color--black);
  box-shadow: 0 0 15px #CAD76650;

  @media (max-width: 768px) {
        right: 50%;
        top: -30px;
        transform: translateX(50%);
    }
`;

// Ícone no meio do círculo
const IconContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  fill: var(--color--black);
  animation: ${zoom} 2s ease linear infinite alternate-reverse;
  z-index: 2;

  & > svg {
    fill: var(--color--black);
  }
`;

// Estilização do SVG para criar o efeito circular do texto
const CircularText = styled.svg`
  position: absolute;
  font-family: var(--font--comfortaa);
  font-weight: 500;
  width: 78px;
  height: 78px;
  animation: ${spin} 8s linear infinite;
  color: var(--color--black);
`;

const CardLeft = styled.div`
    width: 100%;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;

    & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
        border: 5px solid #fff;
    }
`

const CardRight = styled.div`
    width: 100%;
    height: 60%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 30px;

    & > h1 {
        font-size: 24px;
        font-weight: 500;
        font-family: var(--font--comfortaa);
        color: var(--color--black);
    }

    & > p {
        font-size: 14px;
        font-weight: 300;
        color: var(--color--black);
        font-family: var(--font--comfortaa);
        margin-top: -20px;
    }
`

const CardTopics = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;

    & > div {
        background-color: #fff;
        font-size: 12px;
        padding: 7px 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--font--comfortaa);
        font-weight: 300;
        gap: 8px;
        border-radius: 5px;

        & > svg {
            font-size: 14px;
            fill: var(--color--black);
        }
    }
`

const CardSuites = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    padding: 0 5px;
    width: 100%;

    & > div {

        & > h2 {
            font-size: 16px;
            font-family: var(--font--comfortaa);
            color: #000;
            font-weight: 500;
        }

        & > p {
            margin-top: 2px;
            margin-bottom: 2px;
            font-size: 10px;
            font-weight: 100;
            font-family: var(--font--comfortaa);
        }

        & > span {
            font-size: 10px;
            font-weight: 300;
            font-family: var(--font--comfortaa);

            & > b {
                font-size: 16px;
                font-weight: 600;

                @media (max-width: 768px) {
                    font-size: 15px;
                }
            }
        }
    }
`

const CardButtons = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    width: 100%;

    & > button {
        cursor: pointer;

        &:nth-child(1){
            background-color: var(--color--green);
            border: none;
            color: var(--color--black);
            font-family: var(--font--comfortaa);
            font-weight: 600;
            border: 1px solid var(--color--black);
            border-radius: 40px;
            height: 40px;
            width: 85%;
            transition: all 0.2s ease;

            &:hover {
                transform: scale(0.95);
            }
        }

        &:nth-child(2){
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: var(--color--black);
            border: 1px solid var(--color--black);
            background-color: #fff;
            position: relative;
            transition: all .2s ease;

            &:hover {
                transform: scale(0.95);
            }

            &:hover > span {
                transform: scale(1);
            }

            & >  span {
                transform: scale(0);
                position: absolute;
                top: -1rem;
                left: -6rem;
                background-color: #fff;
                padding: 5px 10px;
                border-radius: 10px 10px 0px 10px;
                border: 1px solid var(--color--black);
                font-family: var(--font--comfortaa);
                font-size: 12px;
                transition: all .2s ease;
                
            }

            & > svg {
                font-size: 18px;
            }
        }

    }
`

const CardPacote = ({ pacote }) => {
  const navigate = useNavigate();

  // Função para criar slug a partir do título do pacote
  const createSlug = (title) => {
    if (!title) return 'pacote';
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove acentos
      .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .trim();
  };

  return (
    <CardContainer>
      {pacote.alert?.[0]?.active && (
        <CardAlert>
          <IconContainer>
            <IoStarSharp />
          </IconContainer>
          <CircularText viewBox="0 0 100 100">
            <path
              id="circlePath"
              d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              fill="none"
            />
            <text fill="black" fontSize="14px" fontWeight="400">
              <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                Mais Reservado • Mais Reservado •
              </textPath>
            </text>
          </CircularText>
        </CardAlert>
      )}
      <CardLeft>
        <img src={pacote.imagem} alt="Imagem do pacote" />
      </CardLeft>
      <CardRight>
        <h1>{pacote.title}</h1>
        <p>{pacote.description}</p>

        <CardTopics>
          {pacote.topics?.map((topic, index) => (
            <div key={index}>
              <FaRegCheckCircle />
              <span>{topic}</span>
            </div>
          ))}
        </CardTopics>

        <CardSuites>
          {Array.isArray(pacote.suites) && pacote.suites.map((suite, index) => (
            <div key={index}>
              <h2>{suite.name}</h2>
              <p>a partir de</p>
              <span>
                {suite.parcel}x <b>R${typeof suite.price === 'number' ? suite.price.toFixed(2) : '0.00'}</b>
              </span>
            </div>
          ))}
        </CardSuites>

        <CardButtons>
          <button
            onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
          >Conhecer pacote</button>
          <button
            onClick={() => navigate('/acomodaSerra')}
          >
            <span>Acomodações</span>
            <IoBedOutline />
          </button>
        </CardButtons>
      </CardRight>
    </CardContainer>
  );
};

export default CardPacote;
