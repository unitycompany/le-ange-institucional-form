import React from "react";
import styled from "styled-components";
import Button from "./button";

const RegrasAll = styled.div`
    width: 100%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    position: relative;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5% 0;
    height: auto;
    gap: 50px;
    font-family: var(--font--comfortaa)!important;
    

    @media (max-width: 768px){
        padding: 5% 5%;
        flex-direction: column-reverse;
        height: auto;
    }

    & > div{
        width: 50%;
        height: 100%;
        

        @media (max-width:768px){
            width: 100%;
        }
    }

    & > div:nth-child(1){
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 35px;
        width: 45%;
        padding-left: 5%;

        @media (max-width: 768px){
            align-items: center;
            width: 100%;
            padding-left: 0;
        }

        & > h1{
            line-height: 110%;
            font-weight: 300;
            font-family: var(--font--comfortaa);
            color: var(--color--black);
            font-size: 2rem;
            width: 90%;

            @media (max-width: 768px){
                font-size: 1.5rem;
                text-align: center;
                width: 100%;
            }
        }

        & > a{
            color: var(--color--blue);
            font-family: var(--font--comfortaa);
            font-size: 1rem;
            font-weight: 400;
            text-decoration: underline;
            margin-top: -25px;
            transition: all 0.2s ease;

            &:hover{
                color: var(--color--green);
                text-decoration: none;
            }

            @media (max-width: 768px){
                font-size: 0.9rem;
                text-align: center;
            }
        }

        & > ol{
            margin-left: 25px;
            margin-top: 5px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
            justify-content: center;
            list-style-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d2f0fa51-02b8-44c8-515f-fd49f86f0a00/public');

            & > li{
                padding-left: 5px;
                color: var(--color--black);
                font-size: 1rem;
                font-weight: 300;
                border-radius: 0 10px 10px 10px ;
                padding: 7.5px;
                width: 100%;

                @media (max-width: 768px){
                    font-size: .9rem;
                    font-weight: 300!important;
                }

                & > b{
                    font-weight: 500;
                    color: var(--color--black);
                }
            }
        }

    & > ol:nth-child(3){
        list-style-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d16f0eed-98cb-4620-69ab-934a38db5e00/public');
    }
    }

    & > div:nth-child(2){
        display: flex;
        height: 700px;
        width: 55%;
        padding-right: 5%;
        position: relative;

        @media (max-width: 768px){
            width: 100%;
            padding: 0;
            height: 400px;
        }
    }

    & div:nth-child(2) img{
        transition: all .2s ease-in-out;

        &:hover {
            transform: scale(0.99);
            filter: contrast(110%) brightness(105%);
        }
    }

    & > div:nth-child(2) div{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 50%;
        margin: 1.5px;

        & > img:nth-child(1){
            height: 40%;
            width: 100%;
            object-fit: cover;
            margin: 1.5px;
            border-radius: 20px;

            @media (max-width: 768px){
                border-radius: 15px;
            }
            
            }

        & > img:nth-child(2){
            height: 60%;
            width: 100%;
            object-fit: cover;
            margin: 1.5px;
            border-radius: 20px;
            
            @media (max-width: 768px){
                border-radius: 15px;
            }
            
            }
    }

    & > div:nth-child(2) div:nth-child(2){
        position: absolute;
        top: 50%;
        left: 45%;
        display: none!important;
        transform: translateX(-50%) translateY(-50%);
        z-index: 4;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    & > div:nth-child(2) div:nth-child(3){
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 50%;

        & > img:nth-child(1){
            height: 60%;
            width: 100%;
            object-fit: cover;
            margin: 1.5px;
            border-radius: 20px;
            
            @media (max-width: 768px){
                border-radius: 15px;
            }

            }

        & > img:nth-child(2){
            height: 40%;
            width: 100%;
            object-fit: cover;
            margin: 1.5px;
            border-radius: 20px;
                    
            @media (max-width: 768px){
                border-radius: 15px;
            }

            }
    }
`

const Regras = ({color, colorAlert, image1, image2, image3, image4, policyUrl}) => {
    return (
        <>
            <RegrasAll>
                <div>
                    <h1 color={color}>A nossa pousada foi feita para você e o seu pet!</h1>
                    {policyUrl && (
                        <a href={policyUrl} target="_blank" rel="noopener noreferrer">
                            Consulte a Política de Reservas completa
                        </a>
                    )}
                    <ol>
                        {/* <li>Apenas para pessoas <b>acompanhadas de seus pets;</b></li> */}
                        <li style={{background: "#CAD76620", border: "1px dashed #CAD76660"}}>Para pessoas que vêem o <b>pet como parte da família.</b></li>

                        <li style={{background: "#CAD76620", border: "1px dashed #CAD76660"}}>Para pessoas que querem proporcionar aos seus pets a <b>liberdade</b> de estarem sempre soltos.</li>

                        <li style={{background: "#CAD76620", border: "1px dashed #CAD76660"}}>Para garantir uma experiência segura, <b>não aceitamos menores de 13 anos</b>, mesmo que acompanhado dos pais.</li>
                        
                    </ol>
                    <ol>
                        <li style={{background: "#E4863510", border: "1px dashed #E4863550"}}>Vale ressaltar que fêmeas <b>NÃO</b> podem estar no cio;</li>
                        <li style={{background: "#E4863510", border: "1px dashed #E4863550"}}>O chachorro precisa <b>ser socializado</b>, caso contrário será necessário mantê-lo na guia.</li>
                        <li style={{background: "#E4863510", border: "1px dashed #E4863550"}}>Não trabalhamos com <b>Day Use</b>.</li>
                    </ol>
                    <Button
                    onClick={() => window.open("https://wa.me/5521994230871?text=Ol%C3%A1%2C%20Pousada%20Le%20Ange!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20pousada", "_blank")}
                    text="Reservar agora"
                    backgroundColor="var(--color--green)"
                    borderColor="var(--color--white)"
                    hoverColor="var(--color--white)"
                    border="1px solid"
                    color="var(--color--black)"
                    idBtn="clickwpp"
                    />
                </div>
                <div>
                    <div>
                        <img src={image1} alt="IMAGE" />
                        <img src={image2} alt="IMAGE" />
                    </div>
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1a69bf6f-02ea-413a-b67c-62100c6e7e00/public" alt="icon da le ange" />
                    </div>
                    <div>
                        <img src={image3} alt="IMAGE" />
                        <img src={image4} alt="IMAGE" />
                     </div>
                </div>
            </RegrasAll>
        </>
    )
}

export default Regras;