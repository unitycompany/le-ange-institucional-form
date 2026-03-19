import React from "react";
import { MdStarRate } from "react-icons/md";
import styled from "styled-components";
import Button from "../button";

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 50px;
    font-family: var(--font--comfortaa);

    @media (max-width: 768px){
        flex-direction: column;
        gap: 20px;
    }
`

const Image = styled.picture`
    width: 55%;
    height: 100%;

    @media (max-width: 768px){
        width: 100%;
    }

    & img {
        width: 100%;
        height: 450px;
        object-fit: cover;
        border-radius: 20px;

        @media (max-width: 768px){
            height: 250px;
        }
    }
`

const Text = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    justify-content: center;
    gap: 25px;

    @media (max-width: 768px){
        width: 100%;
        align-items: center;
    }

    & p {
        font-size: 1.2rem;
        font-weight: 300;
        width: 90%;

        @media (max-width: 768px){
            font-size: 1rem;
            text-align: center;
            width: 100%;
        }
    }

    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;

        & img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 50%;
            border: 1px solid #00000050;
        }

        & > div {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            gap: 3px;

            & h4 {
                font-size: 1rem;
                font-weight: 500;
            }

            & div {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;

                & ol {
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    list-style-type: none;
                    margin-left: -2px;

                    & li {
                        color: #ffee00;
                        font-size: 22px;
                        line-height: 100%;
                        text-align: center;
                        justify-content: center;
                        display: flex;
                        align-items: center;
                        margin-right: -2px;
                        margin-bottom: 4px;
                    }
                }

                & span {
                    line-height: 100%;
                    font-size: 15px;
                    font-weight: 500;
                }
            }
        }
    }
`

export default function CardDepoimento({
    image,
    text,
    logo,
    nome,
    nota
}) {
    return (
        <>
            <Content>
                <Image>
                    <img src={image} />
                </Image>
                <Text>
                    <p>"{text}"</p>
                    <div>
                        <img src={logo} />
                        <div>
                            <h4>{nome}</h4>
                            <div>
                                <ol>
                                    <li><MdStarRate /></li>
                                    <li><MdStarRate /></li>
                                    <li><MdStarRate /></li>
                                    <li><MdStarRate /></li>
                                    <li><MdStarRate /></li>
                                </ol>
                                <span>{nota}</span>
                            </div>
                        </div>
                    </div>
                    <Button
                        idBtn="clickwpp"
                        text="Reservar agora"
                        backgroundColor="var(--color--green)"
                        borderColor="var(--color--white)"
                        onClick={() => {
                            window.open(
                            'https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329',
                            '_blank'
                            );
                        }}
                        />
                </Text>
            </Content>
        </>
    )
}