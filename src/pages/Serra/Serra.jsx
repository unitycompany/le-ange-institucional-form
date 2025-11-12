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
    padding: 5% 5% 2.5% 10%;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    height: 100vh;
    background: #fff;
    position: relative;
    

    &::before{
        content: '';
        width: 100%;
        height: 100vh;
        left: 0;
        top: -5vh;
        position: absolute;
        z-index: 1;
        opacity: .02;
        background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public');
        background-position: center;
        background-size: cover;

        @media (max-width:1080px){
            display: none!important;
        }
    }

    @media (max-width: 768px){
        padding: 5% 2.5%;
        flex-direction: column-reverse;
        position: relative;
        z-index: 2;
        height: 100vh;
    }
`;

const StyledHomeDiv = styled.div`
    width: 50%;
    height: 100%;
    background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: contrast(110%);
    position: absolute;
    left: 0;
    top: 0;

    &::before{
        content: '';
        width: 25%;
        height: 100%;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        border-image: fill 0 linear-gradient(90deg, #0000, #ffffff);

        @media (max-width:768px){
            display: none;
        }
    }

    @media (max-width: 768px){
        width: 100%;
        border-radius: 0px;
        border-image: fill 0 linear-gradient(#0001, #ffffff);
        position: absolute;
        box-shadow: none!important;
        height: 100%;
        top: 0;
        z-index: -3;

    }
`;

const StyledHomeTexts = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;
    flex-direction: column;
    position: relative;
    z-index: 3;
    

    @media (max-width: 768px){
        width: 100%;
        align-items: center;
        justify-content: flex-end;
        height: 35%;
    }

    & > h4 {
        font-family: var(--font--comfortaa);
        font-size: 18px;
        font-weight: 200;
        color: var(--color--black);

        @media (max-width: 768px){
            color: var(--color--black);
            font-size: 14px;
            text-align: center;
            font-weight: 800;
        }
    }

    & > h1 {
        font-family: var(--font--comfortaa);
        font-size: 65px;
        margin-left: -5px;
        width: 100%;
        line-height: 100%;
        color: var(--color--black);
        margin-top: -15px;
        font-weight: 100;
        

        @media (max-width: 768px){
            display: inline-block;
            width: 100%;
            font-size: 35px;
            text-align: center;
            margin-left: 0;
            margin-top: -5px;
            font-weight: 100;
        }
    }

    & > h1 b {
        color: var(--color--green);
        font-weight: 100;
        
        @media(max-width: 768px){
            font-weight: 100;
        }
    }

    & > p {
        font-family: var(--font--comfortaa);
        color: var(--color--black);
        font-size: 18px;
        line-height: 120%;
        width: 80%;
        font-weight: 100;
        position: relative;
        z-index: 2;
        

        @media (max-width: 768px){
            width: 80%;
            font-size: 1rem;
            text-align: center;
            padding-bottom: 0px;
            line-height: 100%;
        }
    }
`;

const slides = [
    {
        title: "Pet Friendly",
        description: "Não temos restrições quanto ao porte ou raça do seu pet, também não cobramos taxas adicionais para a vinda deles. Aqui, o seu pet tem liberdade total para acessar todas as nossas comodidades!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9e6e519c-c4c1-413e-e2ef-3395647dcc00/public"
    },

    {
        title: "Aventura",
        description: "Na propriedade, há trilhas que percorrem a natureza, beirando o rio! Em diversos pontos, você pode dar uma paradinha para tomar um banho nas águas frescas e renovar as energias!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/36864b17-d623-43fa-aa2d-6acea7d19000/public"
    },

    {
        title: "Refrescar",
        description: "Nossa maravilhosa piscina de borda infinita possui aquecimento solar e tratamento especial por ozônio, com níveis baixíssimos de cloro, além de contar com um ofurô acoplado, perfeito para aproveitar o final de tarde.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/55f7e7ce-f122-4a35-7d79-646e3ecf6400/public"
    },

    {
        title: "Sossego",
        description: "A área da sauna fica situada ao lado da mata, envolvida pelo som relaxante do rio que passa. Aqui, você pode desfrutar de um hot tub abastecido por água natural e aquecido à lenha, o combo perfeito para você relaxar.",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ff7d2529-fdca-4a04-52dc-7921cdd94e00/public"
    },

    {
        title: "Lazer",
        description: "Nossas áreas internas contam com três salas superequipadas e aconchegantes, sendo elas: sala de TV, sala de estar, sala de jogos com mesa de bilhar, carteado, jogos de tabuleiro e biblioteca.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/efee3680-dff8-4275-ccb2-42ecfd878f00/public"
    },

    {
        title: "Cozinha",
        description: "Todas as refeições estão incluídas: café da manhã, almoço, chá da tarde e jantar! Todas preparadas com muito tempero, amor e afeto.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/78c27eac-ff62-4cd8-0ae8-2b14cc449200/public"
    },

    {
        title: "Diversão",
        description: "Espaço de sobra para o seu pet se divertir! Espaço agility à beira do lago, com muita grama, para o seu pet, correr, pular, brincar e, claro, nadar!",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c57174c4-9b12-4842-e8ff-6cfb4867a200/public"
    },

    {
        title: "Adega",
        description: "Para tornar a sua experiência ainda mais especial, contamos com uma adega subterrânea para a climatização perfeita dos vinhos, bar com carta variada de drinks, cervejas e destilados.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1a66d627-7861-4124-638d-d21ddef05100/public"
    },

    {
        title: "Suítes",
        description: "São 10 suítes encatadoras e cada uma possui o seu charme. Todas dispõem de uma banheira com vista para a natureza, lareira, cama king-size, ar-condicionado, frigobar e varanda.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/03207351-243b-4a5b-be03-64fe386d4f00/public"
    },

    {
        title: "Relaxar",
        description: "Relaxe no nosso SPA com uma vista de frente para a mata! Você pode escolher contratar os nossos serviços de massoterapia, manicure e pedicure.",
        buttonText: "Viver minha experiência agora",
        imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ece77d44-3478-4c00-cb8f-073b002ed400/public"
    }
];

const PetFriendlyImages = [
    {
        images: [
            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9259ac64-609f-4175-99b9-02da23bc1300/public", alt: 'Cachorro surfando na piscina', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/842d1499-8d0c-4a54-a7c5-dcd820e6ca00/public", alt: 'Cachorro andando na borda da piscina', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6044d418-9fd7-4ad8-0e26-2d4ba519b800/public", alt: 'Cachorro sentado tomando sol e sorrindo para a foto', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c06c1e5e-fd56-4bd1-ecb0-6f3919181400/public", alt: '2 cachorros e uma mulher no meio', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f0fc8f39-85af-4eb4-f938-e7886f344d00/public", alt: 'Cachorro mordendo uma bolinha', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6911074d-1fcd-45ae-4845-1040be242e00/public", alt: 'Casal com um casal de cachorro sentado na beira da piscina', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4a585166-5912-4680-9043-97edbf6b1500/public", alt: 'Mulher na cachoeira com cachorros brincando', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/81b5b42f-3680-42c8-32c3-b993ab7b4200/public", alt: 'Mulher e cachorro na piscina sorrindo', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/84834ddc-66d9-4ddc-6567-a9bfd463ff00/public", alt: '3 cachorros tirando uma selfie', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/12b74bda-a819-4220-822f-f4fcc1257f00/public", alt: 'Cachorro dormindo na rede em cima da cachoeira', loading: "lazy", label: 'Le Ange Serra' },
        ],
    },
    {
        images: [
            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e17d74ff-0307-4869-1730-488639ff1800/public", alt: 'Cachorro dormindo no sofá', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6a9632b2-990f-4260-661d-668db9a78700/public", alt: 'Cachorro papai noel', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/55b69a08-2214-4516-8c1a-fead62489300/public", alt: 'Um cachorro no cola de um humano sorrindo', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/67eb6341-9949-4fab-b85b-138804c3ab00/public", alt: '2 cachorros e uma mulher no meio', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4abcdce2-4655-4ff6-e1fe-ff3c6bdf8b00/public", alt: 'Cachorro na mão do tutor', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/b5adb9d2-1b33-4fd2-8b92-e51fb61fde00/public", alt: '2 cachorros sorrindo na rede', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/25b0380d-b983-4a67-eac2-36a003dfa600/public", alt: 'Uma mulher e um cachorro do lado dela', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/80bfcd2e-53f4-47c6-7ecd-8bdaa6163600/public", alt: '3 cachorros brincando na praia', loading: "lazy", label: 'Le Ange Serra' },

            { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2aa812c0-3802-4357-9e46-1b32ec64ed00/public", alt: 'Cachorro andando na cachoeira', loading: "lazy", label: 'Le Ange Serra' },
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
    background-color: var(--color--green);
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

const ImagesAcomoda = [
    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3bccade6-8f25-4d7f-1602-df65dbf7df00/public", text: "Suíte Superior 1", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/23d18593-f941-4c65-0349-6b23e6ea2800/public", text: "Suíte Superior 2", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/99db9a7b-dafd-4b04-36ce-c4eac6880600/public", text: "Suíte Superior 3", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d07d16a0-e7f4-4104-7d5e-f7e4c2dfa500/public", text: "Suíte Standard 4", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/fd429f81-a091-4ca3-9f54-d4a1b730e200/public", text: "Suíte Standard 5", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a22d76b9-b7d4-4174-0cc1-4cfdfd57d500/public", text: "Suíte Master 6", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a7ae1bee-6f60-4584-d03c-0aebd06a2600/public", text: "Suíte Standard 7", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4c448474-8a7b-489b-ac5f-7b11c4dfad00/public", text: "Suíte Standard 8", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/509535a4-9291-44a8-c250-5e8be0b28e00/public", text: "Suíte Superior 9", loading: "lazy" },

    { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/853f4009-5ddc-49ad-717f-3d49d3ad4900/public", text: "Suíte Master 10", loading: "lazy" },
];

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

const acomodacoesSerra = [
    {
        id: "Serra#suite1",
        title: "Suíte Superior 1",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/27e13be9-163c-4f0b-232f-9f86d4a21000/public",
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
        title: "Suíte Superior 2",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2c18e250-d4c0-431b-b461-29193fd4c800/public",
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
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ba01fb9b-5701-402d-1e5f-65154d51e600/public",
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
        title: "Suíte Standard 4",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1c7bf519-cc74-42ff-ed6a-7ce1ca248d00/public",
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
        title: "Suíte Standard 5",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9e5f8ee2-ddde-4d62-950e-baad7c4ee900/public",
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
        title: "Suíte Master 6",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ee7567a2-8f90-4b90-031a-ee9a25aff900/public",
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
        title: "Suíte Standard 7",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d9174a1f-32f7-41aa-03be-56bb536d6b00/public",
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
        title: "Suíte Standard 8",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/582abd37-7062-4911-1d83-753add174c00/public",
        features: [
            { icon: <FaRulerCombined />, text: "52m²" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaTv />, text: "Smart TV com canais a cabo" },
            { icon: <FaFire />, text: "Lareira" }
        ]
    },
    {
        id: "Serra#suite9",
        title: "Suíte Superior 9",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1b5ee35c-5ad1-4011-a78e-87b482618e00/public",
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
        id: "Serra#suite10",
        title: "Suíte Master 10",
        subtitle: "Pousada Le Ange Serra | Miguel Pereira - RJ",
        backgroundImage: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/0b8cacaa-35cc-4313-4b1c-3cf91ffc9f00/public",
        features: [
            { icon: <FaRulerCombined />, text: "80m²" },
            { icon: <FaBath />, text: "Banheira" },
            { icon: <FaBed />, text: "Cama king size" },
            { icon: <FaSnowflake />, text: "Ar condicionado" },
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

const dadosSerra = [
    {
        id: 7,
        text: "Pousada Le Ange Serra",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/7e872f9c-0035-4872-cf50-e7eac0bf1600/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/532a9b10-7c75-4668-65bc-97a13ace5600/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/abd1748a-6b4f-4c8d-4dfa-af0a83aaaf00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5f04125f-47d3-4abd-c359-9e3c129f6500/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e6c7bed9-f486-4be9-db47-7087f6943500/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/122827e6-c434-44a2-0546-d37d2ffeaf00/public"],
    },
    {
        id: 6,
        text: "Pousada Le Ange Serra",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3908ea8d-5d8e-4a13-ac75-dc312f545100/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/66aa3be9-dd1d-460a-2a0d-4da92e68dc00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/bf5974c4-3129-43bb-db61-23404c00d600/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/def5ad59-dc78-4e9a-320b-28d28ec6c500/public"],
    },
    {
        id: 5,
        text: "Pousada Le Ange Serra",
        bgImages: ["https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5abab547-8a8a-408f-013d-0ec1ce1b7a00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/faa5f682-d069-4b1c-c022-6d7f99612700/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a78d689b-9028-473c-6edd-b0d0c4912400/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2e5748ca-ff68-4da1-bff2-e852fa441a00/public", "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a2ac9fb3-1ba9-422f-ccee-9aea2852df00/public"],
    },
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
                <title>Le Ange Serra - Pousada Le Ange</title>
            </Helmet>
            <SchemaMarkup pageType="serra" />

            <StyledEspace />

            <StyledSectionHome>
                <StyledHomeDiv data-aos="zoom-in" data-aos-delay="100" />
                <StyledHomeTexts>
                    <h4 data-aos="fade-up" data-aos-delay="100">Conheça a Le Ange Serra, a pousada mais</h4>
                    <h1 data-aos="fade-down" data-aos-delay="200">PET FRIENDLY<br /> DO <b>BRASIL</b></h1>
                    <p>Aqui você e o seu pet, são mais do que bem-vindos!</p>
                    <CustomButton
                        idBtn="clickwpp"
                        text="Reservar agora!"
                        textColor="var(--color--black)"
                        backgroundColor="transparent"
                        borderColor="var(--color--black)"
                        hoverBackgroundColor="var(--color--green)"
                        hoverBorderColor="var(--color--green)"
                        hoverColor="var(--color--white)"
                        hoverIconColor="var(--color--white)"
                        onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                    />
                    <IdadeCrianca>*Idade miníma para hospedagem 13 anos, mesmo que acompanhado dos pais</IdadeCrianca>
                </StyledHomeTexts>
            </StyledSectionHome>

            <StyledLocall data-aos="fade-up" data-aos-delay="200">
                <h1 data-aos="fade-in" data-aos-delay="400">LeAnge Serra | Miguel Pereira RJ</h1>
            </StyledLocall>

            <Regras
                image1="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/642d078c-2ed8-451b-f532-c59721191700/public"
                image2="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/22165283-94ec-4b61-f181-8275a74bad00/public"
                image4="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c1d96802-7777-4493-5799-9b927ea1de00/public"
                image3="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/15251f10-d814-42ff-0b42-fc731ce2e700/public"
                policyUrl="/src/pages/Politicas/politica-de-reservas-le-ange-serra.pdf"
            />

            <StyledSectionEspaco>
                <CarouselComponent slides={slides}
                    backgroundColor="var(--color--green)"
                />
            </StyledSectionEspaco>

            <StyledAcomoda>
                <StyledAcomodaTexts>
                    <div>
                        <h1 data-aos="fade-up" data-aos-delay="100">Conheça as suítes da Le Ange Serra</h1>
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
                    </div>
                </StyledAcomodaTexts>
                <SliderAcomodaHome
                    content={acomodacoesSerra}
                />
            </StyledAcomoda>
            {/* 
            <AcomodaComponent images={ImagesAcomoda} data-aos="fade-up" data-aos-delay="200" /> */}

            <Pensao
                image1="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/78c27eac-ff62-4cd8-0ae8-2b14cc449200/public"
                image2="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d4f2ff80-6255-49ba-a408-fba6a7002c00/public"
                image3="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4ed4c525-3b4b-4603-7e01-c4cda108a800/public"
                image4="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/9feb8d0c-1247-47f2-b522-be6ed1d3d800/public"
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

            <CarrosselDepoimentos data={dadosSerra} />

            <Footer />

            {/* <WhatsAppButton /> */}
        </>
    );
};

export default Serra;
