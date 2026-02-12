import React, { useEffect } from 'react';
import WhatsAppButton from '../../components/Whatsapp';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/button3';
import SchemaMarkup from '../../components/SchemaMarkup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Regras from '../../components/regras';
import politicaSerraPdf from '../Politicas/politica-de-reservas-le-ange-serra.pdf';
import politicaMarPdf from '../Politicas/politica-de-reservas-le-ange-mar.pdf';

const SobreContainer = styled.section`
    width: 100%;
    max-width: 1280px;
    padding: 2.5% 0% 2.5% 5%;
    height: auto;
    left: 50%;
    top: 0;
    position: relative;
    transform: translateX(-50%);
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    
    

    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
    }

    & > div:nth-child(1){
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;
        


        @media (max-width: 768px){
            width: 100%;
            gap: 50px;
            padding: 0 5%;

        }

        & > h1{
            font-size: 3rem;
            font-family: var(--font--comfortaa);
            color: var(--color--blue);
    
            font-weight: 100;

            @media (max-width: 768px){
                font-size: 30px;
                text-align: center;
                width: 100%;
                font-size: 1.6rem;
                margin-top: 12vh;
            }
        }

        & > h4 {
            font-family: var(--font--comfortaa);
            color: var(--color--black);
            font-weight: 100;
            margin-top: -20px;
            font-size: 1.2rem;
    

            @media (max-width: 768px){
                margin-top: -50px;
                font-size: 12px;
                text-align: center;
                width: 100%;
            }
        }

        & > h4 b{
            font-weight: 400;
        }

        & > p {
            width: 80%;
            font-family: var(--font--avenir);
            font-size: 1.1rem;
            font-weight: 300;
            opacity: 0.7!important;
            line-height: 120%;

            @media (max-width: 768px){
                width: 100%;
                text-align: justify;
                margin-top: -25px;
                font-size: 16px;
            }
        }
    }

    & > div:nth-child(2){
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;

        @media (max-width: 768px){
            width: 100%;
            height: auto;
            display: none;
        }

        &::before {
            width: 100%;
            height: 40%;
            content: '';
            bottom: 0;
            right: 0;
            position: absolute;
            background-color: var(--color--blue);
            border-radius: 150px 0 0 150px;
            z-index: -1;
    

            @media (max-width: 768px){
                border-radius: 70px 0 0 25px;
                width: 95%;
            }
        }

        & > img {
            width: 100%;
            height: 100%;
            filter: drop-shadow(5px 0px 2px rgba(0, 0, 0, 0.2));
            object-fit: contain;
    

            @media (max-width: 768px){
                filter: drop-shadow(5px 0px 2px rgba(0, 0, 0, 0.2));
            }
        }
    }
`

const Espaco = styled.div`
    height: 5vh;

    @media (max-width: 768px){
        height: 0;
    }
`

const PolicyHighlight = styled.section`
    width: 100%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    position: relative;
    transform: translateX(-50%);
    padding: 0 5%;
    margin: 2vh 0 4vh;

    @media (max-width: 768px){
        margin: 1vh 0 3vh;
    }
`;

const PolicyCard = styled.div`
    width: 100%;
    background: var(--color--black);
    border-radius: 25px;
    padding: 22px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    @media (max-width: 768px){
        flex-direction: column;
        align-items: flex-start;
        padding: 18px;
    }
`;

const PolicyText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;

    h2{
        font-family: var(--font--comfortaa);
        color: var(--color--white);
        font-weight: 400;
        margin: 0;
        line-height: 110%;
        font-size: 1.2rem;
    }

    p{
        margin: 0;
        font-family: var(--font--avenir);
        color: var(--color--white);
        opacity: 0.85;
        font-weight: 300;
        line-height: 120%;
        font-size: 0.95rem;
    }
`;

const PolicyLinks = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;

    @media (max-width: 768px){
        width: 100%;
        justify-content: flex-start;
    }
`;

const PolicyBtn = styled.a`
    font-family: var(--font--comfortaa);
    font-size: 0.85rem;
    font-weight: 700;
    padding: 10px 14px;
    border-radius: 14px;
    text-decoration: none;
    color: var(--color--black);
    background: var(--color--white);
    transition: transform 0.2s ease;
    white-space: nowrap;

    &:hover{
        transform: translateY(-1px);
    }
`;

const PolicyBtnSerra = styled(PolicyBtn)`
    background: var(--color--green);
`;

const PolicyBtnMar = styled(PolicyBtn)`
    background: var(--color--blue);
`;

const PolicyBtnPrivacy = styled(Link)`
    font-family: var(--font--comfortaa);
    font-size: 0.85rem;
    font-weight: 700;
    padding: 10px 14px;
    border-radius: 14px;
    text-decoration: none;
    color: var(--color--black);
    background: var(--color--white);
    transition: transform 0.2s ease;
    white-space: nowrap;

    &:hover{
        transform: translateY(-1px);
    }
`;

const UnidadeContainer = styled.section`
    width: 100%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    padding: 2.5% 5%;
    position: relative;
    transform: translateX(-50%);
    height: 65vh;
    margin-top: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    
    

    @media (max-width: 768px){
        flex-direction: column;
        height: auto;
        gap: 10px;
        padding: 0 5%;
        margin-top: 5vh;
    }

    & > div:nth-child(1){
        max-width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2px;
        
        @media (max-width: 768px){
            max-width: 100%;
            height: 30vh;
            gap: 10px;
        }

        & > img:nth-child(1){
            width: 50%;
            height: 100%;
            border-radius: 100px 100px 0px 100px;
            object-fit: cover;
    

            @media (max-width: 768px){
                width: 48%;
                height: 100%;
                border-radius: 50px;
            }
        }

        & > img:nth-child(2){
            width: 50%;
            height: 100%;
            border-radius: 100px 100px 100px 0;
            object-fit: cover;

            @media (max-width: 768px){
                width: 48%;
                height: 100%!important;
                object-fit: cover;
                border-radius: 50px;
            }
        }
    }

    & > div:nth-child(2){
        width: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        gap: 20px;


        @media (max-width: 768px){
            width: 100%;
            height: 50%;
            gap: 40px;
        }

        & > h1{
            font-size: 3rem;
            font-family: var(--font--comfortaa);
            color: var(--color--green);
    
            font-weight: 100;

            @media (max-width: 768px){
                width: 100%;
                font-size: 28px;
                text-align: center;
            }

        }

        & > h4 {
            font-family: var(--font--comfortaa);
            font-weight: 100;
            margin-top: -20px;
            font-size: 1.2rem;
    

            @media (max-width: 768px){
                width: 100%;
                margin-top: -40px;
                font-size: 14px;
                text-align: center;
            }
        }

        & > p {
            width: 80%;
            font-family: var(--font--avenir);
            font-size: 1.1rem;
            font-weight: 300;
            opacity: 0.7!important;

            @media (max-width: 768px){
                width: 100%;
                text-align: justify;
            }
        }
    }
`

const DiferenciaisContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 1280px;
    padding: 0 5%;
    position: relative;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    margin-top: 5vh;

    @media (max-width: 768px){
        height: auto;
        flex-direction: column-reverse;
        gap: 25px;
        margin-top: 35px;
    }

    & > div:nth-child(1){
        width: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        @media (max-width: 768px){
            width: 100%;
        }

        & > h1{
            font-size: 3rem;
            font-family: var(--font--comfortaa);
            color: var(--color--blue);
            font-weight: 100;
            margin-bottom: 15px;

            @media (max-width: 768px){
                font-size: 28px;
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }
        }

        & > p {
            width: 80%;
            font-family: var(--font--avenir);
            font-size: 1.1rem;
            font-weight: 300;
            opacity: 0.7!important;
            line-height: 130%;

            @media (max-width: 768px){
                width: 100%;
                text-align: justify;
            }
        }
    }

    & > div:nth-child(2){
        width: 50%;
        height: 80%;
        flex-wrap: wrap;
        gap: 5px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        


        @media (max-width: 768px){
            width: 100%;
            justify-content: space-between;
        }

       & > img{
        width: 45%;
        border-radius: 100px 100px 0 100px; 
        height: 300px;
        object-fit: cover;
        

        &:nth-child(2){
            border-radius: 100px 100px 100px 0px;
        }

        &:nth-child(3){
            border-radius: 100px 0px 100px 100px!important;
        }

        &:nth-child(4){
            border-radius: 0px 100px 100px 100px!important;
        }

        @media (max-width: 768px){
            width: 49%;
            height: 20vh;

        }

       }

       & > img:nth-child(n +3){
        border-radius: 0 20px 0 20px;
       }

    }
`

const ContainerDuplo = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 100px;
    padding: 2.5% 5%;
    
    max-width: 1280px;
    position: relative;
    left: 50%;
    top: 0;
    transform: translateX(-50%);


    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
        gap: 25px;
        margin-top: 50px;

    }

    & > div:nth-child(1){
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 45%;
    
        @media (max-width: 768px){
            width: 100%;
            flex-direction: column-reverse;
            height: auto;
        }

        & > div:nth-child(1){
            width: 50%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
            
    

            @media (max-width: 768px){
                width: 100%;
    
            }

            & > h1{
            font-size: 2.5rem;
            font-family: var(--font--comfortaa);
            color: var(--color--green);
            font-weight: 100;
            margin-bottom: 15px;
                
            @media (max-width: 768px){
                font-size: 28px;
                margin-bottom: 10px;
                width: 100%;
                text-align: center;
            }
            }

            & > p {
            width: 80%;
            font-family: var(--font--avenir);
            font-weight: 300;
            line-height: 130%;
            font-size: 1.1rem;

                @media (max-width: 768px){
        
                    width: 100%;
                    text-align: justify;
                }
            }
            
        }

        & > div:nth-child(2){
            width: 50%;
            height: 300px;
            
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3px;
    

            @media (max-width: 768px){
                width: 100%;
                height: 35vh;
                margin-top: -20px;
                margin-bottom: 50px;
            }

            & > img {
                width: 50%;
                height: 100%;
                object-fit: cover;

                @media (max-width: 768px){
                    height: 100%;
                    width: 50%;
                }
            }

            & > img:nth-child(1){
                border-radius:70px 70px 0px 70px;
            }

            & > img:nth-child(2){
                border-radius:70px 70px 70px 0px;
            }
        }
    }

    & > div:nth-child(2){
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 50px;
        width: 100%;
        height: auto;   
    
        @media (max-width: 768px){
            flex-direction: column-reverse;
            height: auto;
        }

        & > div:nth-child(1){
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 3px;

            @media (max-width: 768px){
                width: 100%;
                margin-top: 15px;
                height: 35vh;
            }

            & > img {
                width: 50%;
                height: 300px;
                object-fit: cover;
        
                @media (max-width: 768px){
                    height: 100%;
                    width: 50%;
                }
            }

            & > img:nth-child(1){
                border-radius: 70px 70px 0px 70px;
            }

            & > img:nth-child(2){
                border-radius: 70px 70px 70px 0;
            }
        }

        & > div:nth-child(2){
            width: 50%;
            height: 100%;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            flex-direction: column;
    

            @media (max-width: 768px){
                width: 100%;
            }

            & > h1{
            font-size: 2.5rem;
            font-family: var(--font--comfortaa);
            color: var(--color--blue);
            line-height: 100%;
            text-align: left;
            font-weight: 100;
            margin-bottom: 15px;
                
                @media (max-width: 768px){
        
                    margin-top: 0px;
                    font-size: 28px;
                    margin-bottom: 10px;
                    width: 100%;
                    text-align: center;
                }
            }

            & > p {
            width: 90%;
            font-family: var(--font--avenir);
            font-weight: 300;
            line-height: 130%;
            font-size: 1.1rem;

                @media (max-width: 768px){

                    width: 100%;
                    text-align: justify;
                }
            }
        }

    }
`

const PublicoContainer = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    
    position: relative;
    max-width: 1280px;
    padding: 2.5% 0;
    left: 50%;
    top: 0;
    transform: translateX(-50%);

        @media (max-width: 768px){
            height: auto;
            flex-direction: column;
            padding: 2.5% 5%;
        }

    & > div:nth-child(1){
        width: 50%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        padding-left: 5%;


        @media (max-width: 768px){
            width: 100%;
            height: auto;
            gap: 10px;
            padding-left: 0;
        }

        & > div:nth-child(1){

            & > h1{
            font-size: 2.5em;
            font-family: var(--font--comfortaa);
            color: var(--color--green);
            font-weight: 100;
            margin-bottom: 15px;

                @media (max-width: 768px){
        
                    margin-top: 20px;
                    margin-bottom: 15px;
                    width: 100%;
                    text-align: center;
                    font-size: 24px;
                }
            }

            & > p {
            width: 80%;
            font-family: var(--font--comfortaa);
            font-size: 0.9rem;
            font-weight: 100;
            line-height: 130%;
            margin-bottom: 20px;

            @media (max-width: 768px){
                width: 100%;
                text-align: justify;
            }

            }
        }

        & > div:nth-child(2){

            & > h1{
            font-size: 2.5em;
            font-family: var(--font--comfortaa);
            color: var(--color--blue);
            font-weight: 100;
            margin-bottom: 15px;

                @media (max-width: 768px){
        
                    margin-top: 5px;
                    margin-bottom: 15px;
                    width: 100%;
                    text-align: center;
                    font-size: 24px;
                }
            }

            & > p {
            width: 80%;
            font-family: var(--font--comfortaa);
            font-size: 0.9rem;
            font-weight: 100;
            line-height: 130%;

            @media (max-width: 768px){
    
                width: 100%;
                text-align: justify;
            }

            }
        }
    }
    
    & > div:nth-child(2){
        width: 50%;
        height: 600px;

        @media (max-width: 768px){

            width: 100%;
            height: auto;
            margin-top: 25px;
            margin-bottom: 25px;
        }

        & > img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 30px 0 30px 0;
        }
    }
`

const CTA = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d9be2586-3341-4990-f3c8-685edcad8900/public');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    gap: 25px;

    & h1 {
        font-family: var(--font--comfortaa);
        color: var(--color--white);
        width: 35%;
        text-align: center;
        line-height: 100%;
        font-weight: 100;

        @media (max-width: 768px){
            width: 90%;
            margin-left: 5%;
            text-align: center;
            font-size: 24px;
        }
    }
`

const Sobre = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh(); // Atualiza os elementos em caso de re-renderização
    }, []); return (
        <>
            <Helmet>
                <title>Sobre Nós - Pousada Le Ange</title>
            </Helmet>
            <SchemaMarkup pageType="sobre" />
            <Espaco></Espaco>

            <WhatsAppButton />

            <SobreContainer>
                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Pousada Le Ange</h1>
                    <h4 data-aos="fade-down" data-aos-delay="200">A pousada mais <b>Pet Friendly</b> do Brasil</h4>
                    <p data-aos="fade-up" data-aos-delay="300">Fundada em 2018 em Miguel Pereira, Rio de Janeiro, a Pousada Le Ange Serra nasceu da nossa paixão por quatro patas, bem-estar e hospitalidade. Com o sucesso da primeira unidade, expandimos para Búzios, em 2023, criando a Pousada Le Ange Mar. A filosofia por trás é oferecer mais do que uma pousada, um refúgio acolhedor.</p>
                </div>
                <div data-aos="fade-left" data-aos-delay="400">
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3e74beb7-77f8-4598-ec38-1e6f6e4d9300/public"
                        alt='foto da gaia, cachorra da pousada le ange'
                        loading='lazy'
                        data-aos="fade-right" data-aos-delay="500"
                    />
                </div>
            </SobreContainer>

            <PolicyHighlight>
                <PolicyCard data-aos="fade-up" data-aos-delay="150">
                    <PolicyText>
                        <h2>Políticas e Privacidade</h2>
                        <p>Consulte nossa política de privacidade e as políticas de reservas de cada unidade.</p>
                    </PolicyText>
                    <PolicyLinks>
                        <PolicyBtnPrivacy to="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
                            Privacidade
                        </PolicyBtnPrivacy>
                        <PolicyBtnSerra href={politicaSerraPdf} target="_blank" rel="noopener noreferrer">
                            Política Serra
                        </PolicyBtnSerra>
                        <PolicyBtnMar href={politicaMarPdf} target="_blank" rel="noopener noreferrer">
                            Política Mar
                        </PolicyBtnMar>
                    </PolicyLinks>
                </PolicyCard>
            </PolicyHighlight>

            <UnidadeContainer>

                <div>
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2edd1026-cdea-4ac6-f501-713bba86d600/public"
                        alt='foto da le ande da mar'
                        loading='lazy'
                        data-aos="fade-up" data-aos-delay="100"
                    />
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/74bff9be-8742-4468-e032-4cf79abe5300/public"
                        alt='foto da le ande da serra'
                        loading='lazy'
                        data-aos="fade-down" data-aos-delay="100"
                    />
                </div>


                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">2 unidades,</h1>
                    <h4 data-aos="fade-down" data-aos-delay="200">2 refúgios únicos</h4>
                    <p data-aos="fade-up" data-aos-delay="300">A Pousada LeAnge Serra oferece 10 suítes aconchegantes em meio à região serrana de Miguel Pereira. Já a Pousada LeAnge Mar, com suas 8 suítes exclusivas, proporciona uma experiência costeira em Búzios, com vista direta para o mar.</p>
                </div>

            </UnidadeContainer>

            <DiferenciaisContainer>

                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Diferenciais</h1>
                    <p data-aos="fade-down" data-aos-delay="200">Somos mais que Pet Friendly, somos <b>Pet Lovers!</b> Por aqui não temos limite de porte, quantidade ou raça. Nosso conceito permite que os pets frequentem o restaurente, a piscina e qualquer outro espaço. Assim, tornando-nos ÚNICOS a oferecer este tipo de experiência.</p>
                </div>

                <div>
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d476f2e3-90fe-4291-137c-bc9f9e7f4000/public"
                        loading='lazy'
                        alt='rede na le ange mar'
                        data-aos="fade-up" data-aos-delay="100"
                    />
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/902b9f7b-b521-4545-08ee-f5386e777400/public"
                        loading='lazy'
                        alt='hot tube na le ange serra'
                        data-aos="fade-down" data-aos-delay="200"
                    />
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/db3f6942-0de2-433d-1235-33bfa547e500/public"
                        loading='lazy'
                        alt='casal se divertindo na le ange serra'
                        data-aos="fade-up" data-aos-delay="300"
                    />
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/920ca71e-b200-4a6c-5c7e-cc605234d700/public"
                        loading='lazy'
                        alt='foto da le ange com tema de natal'
                        data-aos="fade-down" data-aos-delay="400"
                    />
                </div>

            </DiferenciaisContainer>

            <ContainerDuplo>

                <div>
                    <div>
                        <h1 data-aos="fade-down" data-aos-delay="100">Gastronomia</h1>
                        <p data-aos="fade-up" data-aos-delay="200">Oferecemos um serviço <i>all inclusive</i> que abrange todas as refeições, atendendo todas as restrições alimentares dos nossos hóspedes. Nosso compromisso é proporcionar uma experiência gastronômica diversificada e de alta qualidade, utilizando produtos frescos e locais.</p>
                    </div>
                    <div>
                        <img
                            src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/bbca820c-502b-48cf-a6d6-8a4d4da25900/public"
                            loading='lazy'
                            alt='foto da noite de pizzas na pousada le ange'
                            data-aos="fade-up" data-aos-delay="300"
                        />
                        <img
                            src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9c2d46b5-4488-4382-1bf4-865c6f914100/public"
                            loading='lazy'
                            alt='foto da noite de risotos na pousada le ange'
                            data-aos="fade-down" data-aos-delay="400"
                        />
                    </div>
                </div>

                <div>
                    <div>
                        <img
                            src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/415e2adb-0537-4ce0-23cb-124869c06c00/public"
                            loading='lazy'
                            alt='foto do cachorro sorrindo para camera'
                            data-aos="fade-up" data-aos-delay="100"
                        />
                        <img
                            src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public"
                            loading='lazy'
                            alt='uma mulher e dois cachorros na pousada le ange'
                            data-aos="fade-down" data-aos-delay="200"
                        />
                    </div>
                    <div>
                        <h1 data-aos="fade-up" data-aos-delay="300">Espaços compartilhados</h1>
                        <p data-aos="fade-down" data-aos-delay="400">Nossos espaços compartilhados incluem bibliotecas aconchegantes, sala de jogos e áreas de lazer diversificadas. Na Serra, temos piscinas, ofurô, hot tub, SPA e acesso às cachoeiras. Já em Búzios, nossos hóspedes desfrutam da piscina e dos ofurôs com vista incrível do mar aberto, além disso, estamos localizados próximo ao Mirante do Pai Vitório.</p>
                    </div>
                </div>

            </ContainerDuplo>

            <PublicoContainer>

                <div>
                    <div>
                        <h1 data-aos="fade-up" data-aos-delay="150">Suítes</h1>
                        <p data-aos="fade-down" data-aos-delay="300">Ambas as unidades dispõem de suítes luxuosas, equipadas com banheiras de imersão, camas king-size e roupas de cama de 400 fios. Na Serra, cada suíte conta com uma lareira aconchegante, enquanto em Búzios, a vista para o mar é um espetáculo à parte, garantindo uma experiência de tranquilidade incomparável.</p>
                    </div>
                    <div>
                        <h1 data-aos="fade-up" data-aos-delay="400">Convivência</h1>
                        <p data-aos="fade-down" data-aos-delay="500">Pedimos que considere se o seu pet é amigável, pois a pousada recebe vários outros pets. Além disso, aceitamos apenas humanos acompanhados por pets, e a idade mínima para hospedagem é 13 anos.</p>
                    </div>
                </div>

                <div>
                    <img
                        src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/cc7ff3b2-c267-4a5b-140b-cfae14d7f900/public"
                        alt='foto do quadro de cachorro na pousada le ange mar'
                        data-aos="flip-left" data-aos-delay="600"
                    />
                </div>

            </PublicoContainer>

            <Regras
                image1="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c9f443a0-365f-4341-67c4-dc3b15d8d200/public"
                image2="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/db3f6942-0de2-433d-1235-33bfa547e500/public"
                image3="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9ca851c2-347a-4f8c-752e-b90080865800/public"
                image4="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c57174c4-9b12-4842-e8ff-6cfb4867a200/public"
            />

            <CTA>
                <h1 data-aos="fade-up" data-aos-delay="200">Venha viver essa experiência com a gente!</h1>
                <CustomButton
                    idBtn="clickwpp"
                    text="Reservar agora!"
                    textColor="var(--color--white)"
                    backgroundColor="transparent"
                    borderColor="var(--color--white)"
                    iconColor="var(--color--white)"
                    hoverBackgroundColor="var(--color--white)"
                    hoverBorderColor="var(--color--white)"
                    hoverColor="var(--color--white)"
                    hoverIconColor="var(--color--white)"
                    onClick={() => window.open("https://wa.me/5521994230871?text=Ol%C3%A1%2C%20Pousada%20Le%20Ange!%20Visitei%20o%20site%20de%20voc%C3%AAs%20e%20gostaria%20de%20saber%20mais%20sobre%20a%20pousada", "_blank")}
                    data-aos="fade-in" data-aos-delay="500"
                />
            </CTA>

        </>
    );
};

export default Sobre;
