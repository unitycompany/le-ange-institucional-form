import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Button from '../../components/button';
import { BiSolidDrink, BiSolidStar, BiCamera, BiHeart, BiBus, BiBug, BiSpa, BiBasket } from 'react-icons/bi';
import { FaClock } from "react-icons/fa";
import SliderComponent3 from '../../components/sliderComponent3';
import Footer from '../../components/footer';
import WhatsAppButton from '../../components/Whatsapp';
import { PiFlagBannerFill } from "react-icons/pi";
import { FaBirthdayCake } from "react-icons/fa";
import SchemaMarkup from '../../components/SchemaMarkup';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Espace = styled.div`
    height: 15vh;

    @media (max-width: 768px){
        height: 0;
    }
`

const InicioContainer = styled.section`
    width: 100%;
    height: 85vh;
    max-width: 1280px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
    

    @media (max-width: 768px){
        flex-direction: column-reverse;
        height: auto;
    }

    & > div:nth-child(1){
        width: 45%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 50px;
        align-items: flex-start;
        padding-left: 5%;

        @media (max-width: 768px){
            width: 100%;
            gap: 30px;
            align-items: center;
            height: auto;
            position: relative;
        }

        & > h1{
            font-size: 3rem;
            width: 100%;
            line-height: 100%;
            font-family: var(--font--comfortaa);
            color: var(--color--black);
            font-weight: 100;

            @media (max-width: 768px){
                font-size: 1.8rem;
                text-align: center;
                margin-top: 55vh;
            }

            & > b{
                font-weight: 100;
            }

            & > b > a{
                text-decoration: none;
                transition: all .2 ease-in-out;
            }

            & > b > a:hover{
                opacity: 0.8;
                border: 1px solid;
                padding: 0 5px;
            }

            & > b:nth-child(1) > a{
                color: var(--color--green);
            }

            & > b:nth-child(n + 2) > a{
                color: var(--color--blue);
            }
        }

        & > p{
            font-family: var(--font--comfortaa);
            font-size: 1rem;
            color: var(--color--black);
            width: 80%;
            line-height: 120%;
            font-weight: 100;

            @media (max-width: 768px){
                font-size: 1rem;
                text-align: center;
                width: 90%;
            }
        }
    }

    & > div:nth-child(2){
        width: 55%;
        height: 90%;
        padding-right: 5%;

        @media (max-width: 768px){
            width: 100%;
            position: absolute;
            top: 0;
            height: 50vh;
            z-index: -1;
        }

        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 100px 20px 50px 20px;

            @media (max-width: 768px){
                border-radius: 0 0 50px 50px;
                border-image: fill 0 linear-gradient(#0001, #ffffff);
            }
        }
    }
`

const CarrosselContainer = styled.section`
    width: 90%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    transform: translateX(-50%)!important;
    position: relative;
    height: 700px;
    margin-bottom: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    


    @media (max-width: 768px){
        height: auto;
        padding: 7% 2.5%;
        margin-left: 0;
        width: 100%;
    }
`

const SobreContainer = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 5%;
    align-items: center;
    justify-content: center;
    display: none;

    @media (max-width: 768px){
        height: auto;
        padding: 5% 5%;
    }

    & > div:nth-child(1){
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        @media (max-width: 768px){

        }

        & > h1 {
            font-family: var(--font--comfortaa);
            font-size: 2rem;
            color: var(--color--black);
            font-weight: 400;

            @media (max-width: 768px){
                font-size: 1.6rem;
            }
        }
        
    }

    & > div:nth-child(2){
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80vh;
        gap: 50px;

        @media (max-width: 768px){

            flex-direction: column;
            height: auto;   
        }

        & > div{
            width: 50%;
            height: 100%;
            padding: 50px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-direction: column;

            @media (max-width: 768px){
                width: 100%;
                align-items: center;
                padding: 40px;
                gap: 20px;
                border-radius: 25px 0 25px 0!important;
                border-image: fill 0 linear-gradient(#0001, #ffffff80);
            }

            & > span{
                width: 100%;
                font-family: var(--font--comfortaa);
                font-size: 1.5em;
                font-weight: 600;
                color: var(--color--white);

                @media (max-width: 768px){
                    font-size: 1.3rem;
                    text-align: center;
                    width: 100%;
    
                }
            }

            & > div{
                display: flex;
                align-items: flex-start;
                justify-items: center;
                flex-direction: column;
                gap: 30px;

                @media (max-width: 768px){
                    align-items: center;
    
                }

                & > p{
                    color: var(--color--white);
                    font-family: var(--font--comfortaa);
                    line-height: 100%;

                    @media (max-width: 768px){
                        text-align: justify;
                        font-size: .9rem;
                    }
                }
            }

        }

        & > div:nth-child(1){
            border-radius: 0px 50px 0px 40px;
            background-image: url('https://res.cloudinary.com/dupg7clzc/image/upload/v1730121191/mar1_lhebdi.webp');
            background-size: cover;
            background-position: center;
            
        }

        & > div:nth-child(2){
            border-radius: 40px 0px 50px 0px;
            background-image: url('https://res.cloudinary.com/dupg7clzc/image/upload/v1729513693/9_hyv1zq.jpg');
            background-size: cover;
            background-position: center;
        }
    }
`

const images1 = [
    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/29ccc6ec-9001-47af-4c90-36bc2a2ba300/public', alt: 'Cadeira customizada para casamento na le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a5bfa9ba-2a81-4ff5-1bda-74a4993f2500/public', alt: 'Foto do bolo de casamento na pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e2ee18a4-384c-49ed-c38c-d15f243f5700/public', alt: 'Foto de uma fogueira na pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d887cc1d-1cb7-47c1-06cf-ce55fcb0f400/public', alt: 'Espaço de comer na pousada le ange em casamentos', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/94f6e656-dcb6-477a-23d0-79cc3f816e00/public', alt: 'Champagne na pousada le ange', loading: "lazy" },
];

const images2 = [
    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a7da5629-c2cc-411d-3167-702f3a09f300/public', alt: 'Cadeiras para casamento na pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/08af42b1-ad7c-4d07-8fb5-20e740b9b900/public', alt: 'Noivos se casando na pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9ce391b0-09af-4d6b-d2b5-c38fb17b4000/public', alt: 'Comida do casamento na pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/977a5b2b-eea7-45c3-8f86-55a821264800/public', alt: 'Imagem do bar no casamento da pousada le ange', loading: "lazy" },

    { src: 'https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6d4feba5-fa91-4d86-be6d-ed01beefb800/public', alt: 'Casamento fotos pousada le ange', loading: "lazy" },
];

const CasamentoContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 5% 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    background-color: rgba(0, 0, 0, 0.1);

    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
        padding: 5% 2.5%;
    }

    & > div{
        width: 45%;
        height: 650px;
        
    

        @media (max-width: 768px){
            width: 100%;
            height: 40vh;
        }

        & > img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 70px 20px 40px 10px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);

            @media (max-width: 768px){
                border-radius: 25px 0 25px 0; 
                position: absolute;
                height: 50vh;
                width: 95%;
                z-index: 1;
            }
        }

        & > div {
            width: 100%;
            height: 35%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        

            & > img {
                width: 32%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px 0 20px 0;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

                @media (max-width: 768px){
                    height: 15vh;
                    margin-top: 15px;
                    border-radius: 10px 0 10px 0;
                }
            }
        }
    }

    & > div:nth-child(2){
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 55%;
        align-items: flex-start;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 20px 30px 20px 0px;
        background-color: var(--color--white);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
    

        @media (max-width: 768px){
            align-items: center;
            width: 100%;
            margin-top: -20px;
            height: auto;
            gap: 15px;
        }

        & > h1{
            font-size: 2.2rem;
            font-family: var(--font--comfortaa);
            font-weight: 100;
            color: var(--color--black);

            @media (max-width: 768px){
                background-color: var(--color--white);
                margin-top: 12px;
                padding: 5px 15px;
                color: var(--color--black);
                border-radius: 5px 15px 0 0;
                font-size: 1.6rem;
                position: relative;
                z-index: 2;
            }
        }

        & > p{
            font-size: 1rem;
            font-family: var(--font--comfortaa);
            width: 70%;
            line-height: 120%;
            font-weight: 100;

            @media (max-width: 768px){
                font-family: var(--font--comfortaa);
                width: 100%;
                font-size: 1rem;
                margin-top: 5px;
                margin-bottom: 10px;
                color: var(--color--black);
                text-align: center;
                font-weight: 800;
            }
        }

        & > ol{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            gap: 5px;
            
            @media(max-width: 768px){
                margin-bottom: 10px;
            }
        
        }
        
    }
`

const StyledItemEvent = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: inline-flex;
    padding: 4px 8px;
    align-items: center;
    justify-content: flex-start;
    width: auto;
    gap: 10px;
    border-radius: 0 10px 0 10px;
    font-size: .75rem;
    transition: all .2s ease;
    background-color: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    font-family: var(--font--comfortaa);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.6);

    @media (max-width: 768px){
        font-size: .8rem;
        padding: 7px 10px;
        gap: 10px;
    }

    &:hover{
        padding: 5px 9px;
        background-color: var(--color--black);
        color: var(--color--white);
        cursor: default;
    }
`

const NiverContainer = styled.section`
    width: 100%;
    height: auto;
    padding: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    background-color: var(--color--white);


    @media (max-width: 768px){
        height: auto;
        flex-direction: column-reverse;
        padding: 5% 2.5%;
    }

    & > div{
        width: 45%;
        height: 650px;
        
    

        @media (max-width: 768px){
            width: 100%;
            height: 40vh;
        }

        & > img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px 80px 40px 60px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

            @media (max-width: 768px){
                border-radius: 25px 0 25px 0; 
                position: absolute;
                height: 50vh;
                width: 95%;
                z-index: 1;
            }
        }

        & > div {
            width: 100%;
            height: 35%;
            display: flex;
            align-items: center;
            justify-content: space-between;


            & > img {
                width: 32%;
                height: 100%;
                object-fit: cover;
                border-radius: 30px 0 30px 0;
            
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);

                @media (max-width: 768px){
                    height: 15vh;
                    margin-top: 15px;
                    border-radius: 10px 0 10px 0;
                }
            }
        }
    }

    & > div:nth-child(1){
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 30px 10px 40px 0px;
        width: 55%;
    

        @media (max-width: 768px){
            align-items: center;
            width: 100%;
            margin-top: -25px;
            height: auto;
            gap: 15px;
        }

        & > h1{
            font-size: 2.2rem;
            font-family: var(--font--comfortaa);
            font-weight: 100;
            color: var(--color--black);

            @media (max-width: 768px){
    
                background-color: var(--color--white);
                margin-top: 20px;
                padding: 5px 15px;
                color: var(--color--black);
                border-radius: 5px 15px 0 0;
                font-size: 1.6rem;
                position: relative;
                z-index: 2;
            }
        }

        & > p{
            font-size: 1.1rem;
            font-family: var(--font--comfortaa);
            width: 70%;
            line-height: 100%;
        
            font-weight: 100;

            @media (max-width: 768px){
                font-family: var(--font--comfortaa);
                width: 100%;
                font-size: 1rem;
                margin-top: 5px;
                margin-bottom: 10px;
                color: var(--color--black);
                text-align: center;
                font-weight: 800;
            }
        }

        & > ol{
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            gap: 5px;

            @media(max-width: 768px){
                margin-bottom: 10px;
            }
        
        }

        
    }
`

const Eventos = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh(); // Atualiza os elementos em caso de re-renderização
    }, []); return (
        <>
            <Helmet>
                <title>Eventos - Pousada Le Ange</title>
            </Helmet>
            <SchemaMarkup pageType="event" />
            <Espace />

            {/* <WhatsAppButton /> */}

            <InicioContainer>

                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Do alto da <b><a href='#/serra'>Serra</a></b>,<br></br> às ondas do <b><a href='#/mar'>Mar</a></b></h1>
                    <p data-aos="fade-up" data-aos-delay="200">Venha celebrar na Le Ange, onde o amor pelos pets encontra o cenário ideal para tornar os seus eventos ainda mais especiais.</p>
                    <Button
                        idBtn="clickwpp"
                        data-aos="fade-up" data-aos-delay="300"
                        onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                        text="Fazer meu evento"
                        backgroundColor="var(--color--green)"
                    />
                </div>
                <div>
                    <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4129a834-fd9a-42db-4770-46bcaae2c200/public" alt='foto da home da página de eventos' data-aos="fade-left" data-aos-delay="150" />
                </div>

            </InicioContainer>

            <CarrosselContainer data-aos="fade-up" data-aos-delay="100">
                <SliderComponent3
                    content={images1}
                    spaceBetween={20}
                    slidesPerView={1}
                    width="100%"
                    height="50%"
                    contentType="image"
                    showPagination={true}
                />
            </CarrosselContainer>

            <SobreContainer>
                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Sobre nós</h1>
                </div>
                <div>
                    <div>
                        <span>Le Ange Serra - Miguel Pereira/RJ</span>
                        <div>
                            <p>Fundada em 2018, a Pousada LeAnge nasceu da paixão dos seus fundadores pelo amor aos pets, bem-estar e hospitalidade. Localizada em Miguel Pereira, a LeAnge Serra proporciona uma experiência única na região serrana do Rio de Janeiro, sendo um verdadeiro refúgio entre as belezas naturais da Mata Atlântica.
                            </p>
                            <Button
                                idBtn="clickwpp"
                                backgroundColor="var(--color--green)"
                                onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                                text="Fazer reserva"
                            />
                        </div>
                    </div>
                    <div>
                        <span>Le Ange Serra - Miguel Pereira/RJ</span>
                        <div>
                            <p>Fundada em 2018, a Pousada LeAnge nasceu da paixão dos seus fundadores pelo amor aos pets, bem-estar e hospitalidade. Localizada em Miguel Pereira, a LeAnge Serra proporciona uma experiência única na região serrana do Rio de Janeiro, sendo um verdadeiro refúgio entre as belezas naturais da Mata Atlântica.
                            </p>
                            <Button
                                idBtn="clickwpp"
                                onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                                text="Fazer reserva"
                            />
                        </div>
                    </div>
                </div>
            </SobreContainer>

            <CasamentoContainer>
                <div>
                    <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/59f2aa9f-b14c-4a77-d44d-19d04bbfad00/public" alt='foto do casamento' data-aos="zoom-in" data-aos-delay="100" />
                </div>
                <div>
                    <h1 data-aos="fade-up" data-aos-delay="200">Casamento</h1>
                    <p data-aos="fade-down" data-aos-delay="200">Coração palpitando, emoções à flor da pele e a certeza de dias inesquecíveis.</p>
                    <ol>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="50">
                            <BiSolidDrink />
                            Coquetel na Chegada (Sexta-feira)
                        </StyledItemEvent>

                        <StyledItemEvent data-aos="fade-up" data-aos-delay="100">
                            <BiSolidStar />
                            Noite Especial no Sábado
                        </StyledItemEvent>

                        <StyledItemEvent data-aos="fade-up" data-aos-delay="150">
                            <BiCamera />
                            Ensaio Fotográfico dos Noivos
                        </StyledItemEvent>

                        <StyledItemEvent data-aos="fade-up" data-aos-delay="200">
                            <BiHeart />
                            Decoração Romântica na Suíte
                        </StyledItemEvent>

                        <StyledItemEvent data-aos="fade-up" data-aos-delay="300">
                            <FaClock />
                            Late Checkout no Domingo
                        </StyledItemEvent>

                    </ol>
                    <Button
                        idBtn="clickwpp"
                        text="Fazer reserva"
                        backgroundColor="var(--color--green)"
                        onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                    />
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4129a834-fd9a-42db-4770-46bcaae2c200/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="100" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/fdcd50a3-60fa-409c-8e77-2d1ccef2ec00/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="200" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c5657ad4-000d-4c21-0570-1de76bd8c700/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="300" />
                    </div>
                </div>
            </CasamentoContainer>

            <NiverContainer>
                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Aniversário</h1>
                    <p data-aos="fade-down" data-aos-delay="200">Comemore os momentos doces da vida.</p>
                    <ol>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="50">
                            <BiSolidDrink />
                            Coquetel na Chegada (Sexta-feira)
                        </StyledItemEvent>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="100">
                            <BiSolidStar />
                            Noite Especial no Sábado
                        </StyledItemEvent>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="150">
                            <BiSpa />
                            Massagem Relaxante
                        </StyledItemEvent>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="200">
                            <FaClock />
                            Late Checkout no Domingo
                        </StyledItemEvent>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="250">
                            <PiFlagBannerFill />
                            Painéis Temáticos
                        </StyledItemEvent>
                        <StyledItemEvent data-aos="fade-up" data-aos-delay="300">
                            <FaBirthdayCake />
                            Bolo para o Pet
                        </StyledItemEvent>

                    </ol>
                    <Button
                        idBtn="clickwpp"
                        text="Fazer reserva"
                        backgroundColor="var(--color--green)"
                        onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                    />
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e2fda94b-3aeb-4561-b4ad-688ff898ee00/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="100" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f8c3dd3f-c32b-4c9d-2496-dcdc601a7e00/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="200" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/980e5da2-7a6b-4d04-8e10-389d3ee83000/public" alt='foto do casamento' data-aos="fade-up" data-aos-delay="300" />
                    </div>
                </div>
                <div>
                    <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5361ac8b-1299-4fc6-7cbb-7e71c171e300/public" alt='foto de aniversário' data-aos="zoom-in" data-aos-delay="200" />
                </div>
            </NiverContainer>

            <CarrosselContainer data-aos="fade-up" data-aos-delay="100">
                <SliderComponent3
                    content={images2}
                    spaceBetween={20}
                    slidesPerView={1}
                    width="100%"
                    height="90vh"
                    contentType="image"
                    showPagination={true}
                />
            </CarrosselContainer>

            <Footer />

        </>
    );
};

export default Eventos;
