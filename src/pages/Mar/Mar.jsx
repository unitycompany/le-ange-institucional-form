import React, { useEffect, useState } from 'react';
import { getEvents } from "../../../firebaseService";
import { Helmet } from 'react-helmet';
import Footer from '../../components/footer';
import styled from 'styled-components';
import CustomButton from '../../components/button3';
import CarouselComponent from '../../components/carrosselComponent';
import Pensao from '../../components/pensao';
import Depoimentos from '../../components/depoimentos';
import EventCardCarousel from '../../components/cardSlider';
import { FaUtensils, FaMusic, FaPaw, FaRulerCombined, FaSnowflake, FaBed, FaBath, FaTv, FaFire } from 'react-icons/fa';
import Button from '../../components/button';
import WhatsAppButton from '../../components/Whatsapp';
import PetFriendlyCarousel from '../../components/petCarrossel';
import { FaRegCreditCard } from "react-icons/fa";
import SchemaMarkup from '../../components/SchemaMarkup';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Regras from '../../components/regras';
import EventAlert from '../../components/alertEvent';
import AcomodaComponent from '../../components/acomodaComponent';
import DepoimentoDoHospede from '../../components/Depoimentos/depoimentoDoHospede';
import SliderAcomodaHome from '../../components/sliderAcomodaHome';
import CarrosselDepoimentos from '../../components/depoimentos';

const StyledEspace = styled.div`
    height: 0vh;

    @media (max-width: 768px){
        height: 0vh!important;
    }
`;

const StyledSectionHome = styled.section`
    width: 100%;
    display: flex;
    padding: 5% 10% 2.5% 5%;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    background: #fff;
    position: relative;

    &::before {
        content: '';
        width: 100%;
        height: 100%;
        left: 0;
        position: absolute;
        z-index: 1;
        opacity: 0.02;
        background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ddb82947-e348-414c-3db1-f51552701b00/public');
        background-position: center;
        background-size: cover;

        @media (max-width:1080px){
            display: none!important;
        }
    }

    @media (max-width: 768px) {
        padding: 10% 2.5%;
        flex-direction: column-reverse;
        position: relative;
        z-index: 2;
    }
`;

const StyledHomeDiv = styled.div`
    width: 50%;
    height: 100%;
    background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ddb82947-e348-414c-3db1-f51552701b00/public');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: contrast(110%);
    position: absolute;
    right: 0;
    top: 0;

    &::before{
        content: '';
        width: 25%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        border-image: fill 0 linear-gradient(-90deg, #0000, #ffffff);

        @media (max-width:768px){
            display: none;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        border-radius: 0px;
        border-image: fill 0 linear-gradient(#0000, #ffffff);
        box-shadow: none!important;
        position: absolute;
        height: 100%;
        top: 0;
        z-index: -3;
    }
`;

const StyledHomeTexts = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    position: relative;
    z-index: 3;

    @media (max-width: 768px) {
        width: 100%;
        align-items: center;
        height: 35%;
        z-index: 10!important;
    }

    & > h4 {
        font-family: var(--font--comfortaa);
        font-size: 18px;
        font-weight: 200;
        color: var(--color--black);

        @media (max-width: 768px) {
            color: var(--color--black);
            font-size: 14px;
            text-align: center;
            font-weight: 800;
        }
        
    }

    & > h4 b{
        color: var(--color--blue);
        font-weight: 300;

        @media (max-width: 768px){
            color: var(--color--white);
            font-weight: 600;
            background-color: #7AC4F390;
            padding: 5px;
        }
    }

    & > h1 {
        font-family: var(--font--comfortaa);
        text-align: right;
        font-size: 65px;
        width: 100%;
        line-height: 100%;
        font-weight: 100;
        color: var(--color--black);
        margin-top: -15px;

        @media (max-width: 768px) {
            display: inline-block;
            width: 100%;
            font-size: 35px;
            text-align: center;
            margin-top: -5px;
            font-weight: 100;
        }
    }

    & > h1 b {
        color: var(--color--blue);
        font-weight: 100;

        @media (max-width: 768px) {
            font-weight: 100;
        }
    }

    & > p {
        font-family: var(--font--comfortaa);
        color: var(--color--black);
        text-align: right;
        font-size: 18px;
        line-height: 100%;
        width: 50%;
        position: relative;
        z-index: 2;
        font-weight: 100;

        @media (max-width: 768px) {
            width: 80%;
            font-size: 1rem;
            text-align: center;
            padding-bottom: 10px;
        }
    }
`;

const slides = [
    {
        title: "Pet Friendly",
        description: "Não temos restrições quanto ao porte ou raça do seu pet, também não cobramos taxas adicionais para a vinda deles. Aqui, o seu pet tem liberdade total para acessar todas as nossas comodidades!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/42a70d06-97d1-4f5c-5df8-36c30f21c100/public"
    },

    {
        title: "Praia",
        description: "Para os amantes da praia, estamos localizados a apenas 150 metros da Praia Rasa, onde você e o seu pet podem aproveitar juntinhos e dar um mergulho delicioso no mar.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/da4810e5-6e85-45f5-1fcf-f6a74754bd00/public"
    },

    {
        title: "Piscina",
        description: "Nossa piscina aquecida com vista panorâmica para o oceano é de surpreender! Possui tratamento especial por ozônio com níveis baixíssimos de cloro, pensando no bem-estar da sua pele e a do seu pet também!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/09da9d76-57b8-4d44-02b2-3c4c2380c800/public"
    },

    {
        title: "Ofurôs",
        description: "São dois ofurôs acoplados na piscina, para você relaxar na água quentinha, apreciando a vista exuberante do mar.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/0d1d1a6a-5935-4c57-6b12-d1f028604400/public"
    },

    {
        title: "Sala de estar",
        description: "A sala de estar é aquela que abraça e aconchega. Cheia de sofás, você pode se acomodar e assistir à televisão, ou até mesmo ler um livro, sempre na companhia do seu pet.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/939f40ce-048b-4746-7ce7-83fc2f4bbc00/public"
    },

    {
        title: "Cozinha",
        description: "Todas as refeições estão incluídas: café da manhã, almoço, chá da tarde e jantar! Todas preparadas com muito tempero, amor e afeto.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/97185d8a-752a-4297-25d5-b6e56a4d1f00/public"
    },

    {
        title: "Bar",
        description: "Para completar ainda mais a sua experiência, contamos com uma carta variada de vinhos, destilados, drinks e cervejas!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/67318553-8e4b-4d4c-b914-3ea76fc7be00/public"
    },

    {
        title: "Suítes",
        description: "São 8 suítes, elegantemente, decoradas, todas com vista para o mar, banheira de imersão, varanda, cama king-size, ar-condicionado e frigobar.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d8860874-7032-48bd-ae02-3710dec15b00/public"
    }
];

const ImagesAcomoda = [
    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/04491c1f-dc99-499a-4e92-13037b3eab00/public", "text": "Suíte Superior 1", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4551d99f-d7fa-440f-bdb1-9126c3a82100/public", "text": "Suíte Standard 2", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a81bc75d-a475-4dc9-6101-2f7dbb4e4b00/public", "text": "Suíte Superior 3", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e0b4c640-813a-4586-bdf9-91b0be3f7300/public", "text": "Suíte Superior 4", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/912f5f6c-6f94-4dae-30b3-85c460f0f700/public", "text": "Suíte Superior 5", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/70b133ff-56ab-44b4-76b3-ef1638c79000/public", "text": "Suíte Standard 6", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e9d95c2b-081d-4808-6bf6-431e89183c00/public", "text": "Suíte Master 7", "loading": "lazy" },

    { "src": "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/baf68f87-5db9-47ec-0fb5-dc4b5e1f4b00/public", "text": "Suíte Master 8", "loading": "lazy" }
];

const PetFriendlyImages = [
    {
        images: [
            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/200cdc21-f4aa-40ec-5ff0-fe0403a68700/public", alt: 'Foto de cachorro com uma bola na boca', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/648b223b-de67-4f44-7c2c-769fa19d7000/public", alt: 'Foto do cachorro sentado tomando sol', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5925221e-2d34-42ba-5cba-50d4edbda100/public", alt: 'Cachorro na piscina sorrindo', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/adf23dd8-6ee3-4888-d3e6-ad8e0fe50100/public", alt: 'Cachorro tirando uma selfie com outros 3 cachorros', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e1457430-68c7-4936-2932-1f0f97f49700/public", alt: 'Foto do cachorro olhando para a câmera', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ab52b655-3ec0-45cc-ba97-0eadc275f300/public", alt: 'Cachorro com a lingua para fora', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6e95aa01-42cb-4b46-b52b-9f41b4fc0b00/public", alt: 'Cachorro na borda da piscina', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6085ea00-564e-45e0-779b-c167a0e0d500/public", alt: 'Cachorro em uma prancha de surf na onda', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9ca851c2-347a-4f8c-752e-b90080865800/public", alt: 'Cachorro com óculos escuros', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/17407bf2-8742-4deb-b628-e9cea5753400/public", alt: 'Cachorro e um cachorro pequeno', loading: "lazy", label: 'Le Ange Mar' },
        ],
    },

    {
        images: [
            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c9f443a0-365f-4341-67c4-dc3b15d8d200/public", alt: 'Foto de um cachorro com uma taça do lado', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3a074bef-a80a-44f6-7ab6-b61b3be11c00/public", alt: '3 cachorros e um homem na piscina', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4b84a97a-7d4b-497c-b1c7-0d5c622b3400/public", alt: 'Cachorro marrom', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f5844929-30d7-499c-78f2-58723ac2e800/public", alt: 'Cachorro marrom na piscina', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9ec1723e-b230-46b3-4fcd-306c88988300/public", alt: 'Cachorro branco olhando para a camera', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3c62b930-ee31-4161-f784-b10dd57b7800/public", alt: 'Cachorro dormindo no sofá', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4ebcabb7-ca9b-428e-ab95-122b26977900/public", alt: 'Cachorro em cima do morro olhando para o lado', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/50855b6d-791e-4bde-72e1-c7c0ec10ec00/public", alt: '3 cachorros brincando na praia', loading: "lazy", label: 'Le Ange Mar' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/029e7ed2-d9de-44b4-db14-ff358bde6c00/public", alt: 'Foto do cachorro olhando para a câmera', loading: "lazy", label: 'Le Ange Mar' },
        ],
        reverse: true
    }
];

const StyledSectionEspaco = styled.section`
    width: 100%;
    height: auto;
    max-width: 1280px;
    left: 50%;
    top: 0;
    position: relative;
    transform: translateX(-50%)!important;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
        height: auto;
        padding: 0% 0 5% 0;
        margin-top: 0;
    }
`;

const StyledLocall = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 7vh;
    background-color: var(--color--blue);
    font-family: var(--font--comfortaa);

    @media (max-width: 768px){
        height: 8vh;
        margin-bottom: 25px;
    }

    & > h1{
        font-weight: 200;
        width: 80%;
        text-align: center;
        font-size: 1.1rem;
        color: var(--color--white);

        @media (max-width: 768px){
            font-size: 1rem;
            font-weight: 400;
        }
    }
`;

const StyledContainerEvents = styled.section`
    width: 90%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    transform: translateX(-50%)!important;
    position: relative;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2.5%;

    @media (max-width: 768px){
        height: auto;
        padding: 5% 2.5%;
    }
`

const StyledButtonCenter = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5%;

    @media (max-width: 768px){
        display: none;
    }
`;

// Array de depoimentos
const depoimentosData = [
    {
        image: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c57174c4-9b12-4842-e8ff-6cfb4867a200/public",
        text: "Amamos correr livremente, entrar na piscina, no riacho, fazer novos aumigos e estar com a nossa mamãe e o nosso papai o tempo todo! Queremos voltar mais vezes! Os funcionários também foram muito carinhosos com a gente!",
        logo: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8013ec29-c586-4382-c9f7-e0b7d5353600/public",
        nome: "@sukiegigi",
        nota: "4.80"
    },
    {
        image: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/db3f6942-0de2-433d-1235-33bfa547e500/public",
        text: "Estadia incrível! O espaço é enorme, a equipe super atenciosa, as suítes são maravilhosas, e há vários lugares para atividades: brincadeiras no gramado, trilha, cachoeira, piscina, lago... Todo o espaço é pensado para curtirmos tudo com os pets!",
        logo: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8013ec29-c586-4382-c9f7-e0b7d5353600/public",
        nome: "@_maltamaria",
        nota: "4.60"
    },
    {
        image: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/b324ce14-d3d8-4fc3-fccf-b4b4a9806d00/public",
        text: "Maravilhosos! O lugar é lindo, adoro ficar conectada com a natureza. As instalações são aconchegantes e a limpeza é impecável. O chef de cozinha e toda a equipe da pousada foram nota 10! Todas as refeições atenderam às minhas restrições alimentares e estavam deliciosas. Ganhei um bolo no meu aniversário, o que me fez sentir em casa. A carta de vinhos é excelente, e a recepção foi super carinhosa. Com certeza, retornaremos!",
        logo: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8013ec29-c586-4382-c9f7-e0b7d5353600/public",
        nome: "@sanaugrangel",
        nota: "5.00"
    },
    {
        image: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/da7c577a-832a-4a84-d5fd-162e11915b00/public",
        text: "Maravilhosos! É a segunda vez que vamos para a  LeAnge. A primeira experiência foi tão incrível que precisávamos voltar. Fiquei até emocionada ao ver o quanto meu cachorrinho amou tudo! O lugar é maravilhoso — um verdadeiro paraíso para ele, que volta pra casa cansado de tanto brincar. O atendimento é impecável, com funcionários super educados e atenciosos. Sou fã da pousada!",
        logo: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8013ec29-c586-4382-c9f7-e0b7d5353600/public",
        nome: "@camilagcruz",
        nota: "5.00"
    },
    {
        image: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f0b0ec5f-6bd1-427d-7bc9-93253779d000/public",
        text: "Nossa experiência foi incrível e ficará marcada em nossas vidas! Fomos comemorar meu aniversário e o da nossa pet Lua, que faz aniversário no mesmo dia. Amamos esse lugar — lindo, seguro, muito limpo e organizado. Os funcionários são carismáticos, o chef de cozinha é excelente, a piscina é maravilhosa, assim como o gramado. Amamos tudo! Ficamos muito felizes e satisfeitos com a nossa escolha.",
        logo: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8013ec29-c586-4382-c9f7-e0b7d5353600/public",
        nome: "@rosane_fvr",
        nota: "5.00"
    }
];

const IdadeCrianca = styled.p`
  font-size: .9rem!important;
  opacity: .4;
  font-weight: 200;
  margin-top: -10px;

  @media (max-width: 768px) {
    width: 100%!important;
  }
`

const AlertDiv = styled.div`
    width: 100%;
    margin-top: 5vh;
    margin-bottom: -5vh;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px){
        margin-top: 0;
        margin-bottom: 0;
    }
`

const StyledAcomodaTexts = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5%;

    & > div {
        display: flex;
        width: 100%;
        justify-content: space-between;

        @media (max-width: 768px){
            flex-direction: column;
            align-items: center;
        }
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }

    & > div h1 {
        font-size: 2rem;
        color: var(--color--black);
        font-family: var(--font--comfortaa);
        font-weight: 300;

        @media (max-width: 768px) {
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: 30px;
            margin-top: 15px;
        }
    }
`;

const acomodacoesMar = [
    {
        id: "Serra#suite1",
        title: "Suíte Superior 1",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/82963de5-7929-4786-2305-e8ce47524400/public",
        features: [
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite2",
        title: "Suíte Standard 2",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/b486213a-204f-465d-22ee-9e81990da100/public",
        features: [
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite3",
        title: "Suíte Superior 3",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ea1eea3b-3a33-4052-8ee1-977441df8e00/public",
        features: [
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite4",
        title: "Suíte Superior 4",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/af6001e3-0b7e-4623-957d-f29e71a87800/public",
        features: [
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite5",
        title: "Suíte Superior 5",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/df63bfef-4d75-423e-417b-6de58ef89900/public",
        features: [
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite6",
        title: "Suíte Standard 6",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d32c205b-b6e7-4144-8b53-1a11adea4200/public",
        features: [
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaRulerCombined />, text: "93m²" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite7",
        title: "Suíte Master 7",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9c9a91c1-66f8-430c-571f-948fbcbda300/public",
        features: [
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite8",
        title: "Suíte Master 8",
        subtitle: "Pousada Le Ange Mar | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/29e157cc-f4a7-43f6-6815-0a6f4e6ded00/public",
        features: [
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
];

const StyledAcomoda = styled.section`
    height: auto;
    width: 100%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0px;
    padding: 0;
    position: relative;

    & > div {
        padding: 3.5% 5% 0% 5%;
        width: 100%;
        border-radius: 1px solid red;
    }

    @media (max-width: 768px){
        height: auto;
        padding: 5% 2.5%;
        gap: 25px;
    }
`

const dadosMar = [
    {
        id: 7,
        text: "Pousada Le Ange Mar",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6f192299-26a5-4cba-0d3d-f042f7cc4100/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/96048cf4-e533-42ef-631c-17c79f758300/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/53ddb117-9d86-42b5-0188-2733003a8400/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/95f365f9-0cf7-4a99-de39-71618b26a300/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/86f7d35e-3494-439d-483c-48e036d31a00/public"],
    },
    {
        id: 6,
        text: "Pousada Le Ange Mar",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/cac55f28-555d-4ce5-6e3b-457af8476c00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a38d49ef-f498-4f03-cecd-d4ac8c69ac00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ffcf23fa-d075-4682-9bda-844c527d7f00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d0f29504-829a-4c8f-8720-4c8ae3d27f00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3f1ccf0e-8406-4164-0955-29087e5a0f00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/480b1655-49d4-4323-86c1-345224294000/public"],
    },
    {
        id: 5,
        text: "Pousada Le Ange Mar",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/0afec340-71f1-42f3-3ffe-5af2438d7500/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2603ac07-7df2-43eb-697f-99e79942c200/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/b2c446cd-cffd-49f1-cb59-65ace1b57a00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ca778cf7-62d4-48fb-6e1c-1e6d1fc29400/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/67bb7d62-0ff9-490f-160a-1335e4800200/public"],
    },
    // ... mais 4 objetos
];

const Serra = () => {

    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh();
    }, []);

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents();
                setEvents(data);
            } catch (error) {
                console.error("Erro ao buscar eventos do Firebase:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); return (
        <>
            <Helmet>
                <title>Le Ange Mar - Pousada Le Ange</title>
            </Helmet>
            <SchemaMarkup pageType="mar" />

            <StyledEspace />

            <StyledSectionHome>
                <StyledHomeDiv data-aos="zoom-in" data-aos-delay="100" />
                <StyledHomeTexts>
                    <h4 data-aos="fade-up" data-aos-delay="100">Conheça a <b>Le Ange Mar</b>, a pousada mais</h4>
                    <h1 data-aos="fade-down" data-aos-delay="200">PET FRIENDLY<br /> DO <b>BRASIL</b></h1>
                    <p>Aqui, você e o seu pet são mais do que bem-vindos!</p>
                    <div>
                        <CustomButton
                            idBtn="clickwpp"
                            text="Reservar agora!"
                            textColor="var(--color--black)"
                            backgroundColor="transparent"
                            borderColor="var(--color--black)"
                            iconColor="var(--color--black)"
                            hoverBackgroundColor="var(--color--blue)"
                            hoverBorderColor="var(--color--blue)"
                            hoverColor="var(--color--white)"
                            hoverIconColor="var(--color--white)"
                            onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                        />
                    </div>
                    <IdadeCrianca>*Idade miníma para hospedagem 13 anos, mesmo que acompanhado dos pais</IdadeCrianca>
                </StyledHomeTexts>
            </StyledSectionHome>

            <StyledLocall data-aos="fade-up" data-aos-delay="200">
                <h1 data-aos="fade-up" data-aos-delay="300">LeAnge Mar | Armação dos Búzios RJ</h1>
            </StyledLocall>

            <Regras
                image1="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/785409ef-a52d-4221-ccee-eaa83693bb00/public"
                image3="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/53ccc78d-ce67-48c5-ffde-4a0febd4a700/public"
                image2="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/82ee632d-8532-412a-56ae-0076c6d6dc00/public"
                image4="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/7da0d553-bf64-492e-fa8d-e125618a5400/public"
                policyUrl="/src/pages/Politicas/politica-de-reservas-le-ange-mar.pdf"
            />

            <StyledSectionEspaco data-aos="fade-up" data-aos-delay="50">
                <CarouselComponent
                    slides={slides}
                    titleColor="var(--color--blue)"
                    buttonBgColor="var(--color--blue)"
                    imagePosition="left"
                    backgroundColor="var(--color--blue)"
                />
            </StyledSectionEspaco>

            <StyledAcomoda>
                <StyledAcomodaTexts>
                    <div>
                        <h1 data-aos="fade-up" data-aos-delay="100">Conheça as suítes da Le Ange Mar</h1>
                        <Button
                            idBtn="clickwpp"
                            text="Reservar agora"
                            backgroundColor="var(--color--blue)"
                            borderColor="var(--color--white)"
                            onClick={() => {
                                window.open(
                                    'https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329',
                                    '_blank'
                                );
                            }}
                        />
                    </div>
                </StyledAcomodaTexts>
                <SliderAcomodaHome
                    content={acomodacoesMar}
                />
            </StyledAcomoda>
            {/* 
            <AcomodaComponent images={ImagesAcomoda} data-aos="fade-up" data-aos-delay="200" /> */}

            <Pensao colorDefinedBold="var(--color--blue)" data-aos="fade-up" data-aos-delay="400"
                image1="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/12f5e88c-c714-4e71-ea9f-cbd08162c500/public"
                image2="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/97185d8a-752a-4297-25d5-b6e56a4d1f00/public"
                image3="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4ed4c525-3b4b-4603-7e01-c4cda108a800/public"
                image4="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8adfd02c-e2ae-4f41-9f97-994bc416b600/public"
            />

            <PetFriendlyCarousel carousels={PetFriendlyImages} />

            <StyledButtonCenter>
                <Button
                    idBtn="clickwpp"
                    backgroundColor="var(--color--green)"
                    text="Fazer minha reserva!"
                    onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                />
            </StyledButtonCenter>

            {/* <EventAlert /> */}

            <StyledContainerEvents>
                <EventCardCarousel events={events} />
            </StyledContainerEvents>

            <CarrosselDepoimentos data={dadosMar} />

            <Footer />

            {/* <WhatsAppButton /> */}
        </>
    );
};

export default Serra;
