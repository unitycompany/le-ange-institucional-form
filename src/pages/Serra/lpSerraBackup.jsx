// import React, {useEffect, useState} from 'react';
// import { getEvents } from "../../../firebaseService";
// import { Helmet } from 'react-helmet';
// import Footer from '../../components/footer';
// import styled from 'styled-components';
// import CustomButton from '../../components/button3';
// import CarouselComponent from '../../components/carrosselComponent';
// import AcomodaComponent from '../../components/acomodaComponent';
// import Pensao from '../../components/pensao';
// import Depoimentos from '../../components/depoimentos';
// import EventCardCarousel from '../../components/cardSlider';
// import { FaUtensils, FaMusic, FaPaw } from 'react-icons/fa';
// import Button from '../../components/button';
// import WhatsAppButton from '../../components/Whatsapp';
// import PetFriendlyCarousel from '../../components/petCarrossel';
// import { FaRegCreditCard } from "react-icons/fa";
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import Regras from '../../components/regras';
// import EventAlert from '../../components/alertEvent';

// const StyledEspace = styled.div`
//     height: 0vh;

//     @media (max-width: 768px){
//         height: 0vh!important;
//     }
// `;

// const StyledSectionHome = styled.section`
//     width: 100%;
//     display: flex;
//     padding: 5% 5% 2.5% 10%;
//     align-items: center;
//     justify-content: space-between;
//     flex-direction: row-reverse;
//     height: 100vh;
//     background: #fff;
//     position: relative;
    

//     &::before{
//         content: '';
//         width: 100%;
//         height: 100vh;
//         left: 0;
//         top: -5vh;
//         position: absolute;
//         z-index: 1;
//         opacity: .02;
//         background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public');
//         background-position: center;
//         background-size: cover;

//         @media (max-width:1080px){
//             display: none!important;
//         }
//     }

//     @media (max-width: 768px){
//         padding: 5% 2.5%;
//         flex-direction: column-reverse;
//         position: relative;
//         z-index: 2;
//         height: 100vh;
//     }
// `;

// const StyledHomeDiv = styled.div`
//     width: 50%;
//     height: 100%;
//     background-image: url('https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public');
//     background-position: center;
//     background-size: cover;
//     background-repeat: no-repeat;
//     filter: contrast(110%);
//     position: absolute;
//     left: 0;
//     top: 0;

//     &::before{
//         content: '';
//         width: 25%;
//         height: 100%;
//         position: absolute;
//         top: 0;
//         right: 0;
//         z-index: 10;
//         border-image: fill 0 linear-gradient(90deg, #0000, #ffffff);

//         @media (max-width:768px){
//             display: none;
//         }
//     }

//     @media (max-width: 768px){
//         width: 100%;
//         border-radius: 0px;
//         border-image: fill 0 linear-gradient(#0001, #ffffff);
//         position: absolute;
//         box-shadow: none!important;
//         height: 100%;
//         top: 0;
//         z-index: -3;

//     }
// `;

// const StyledHomeTexts = styled.div`
//     width: 50%;
//     height: 100%;
//     display: flex;
//     align-items: flex-start;
//     justify-content: center;
//     gap: 20px;
//     flex-direction: column;
//     position: relative;
//     z-index: 3;
    

//     @media (max-width: 768px){
//         width: 100%;
//         align-items: center;
//         justify-content: flex-end;
//         height: 35%;
//     }

//     & > h4 {
//         font-family: var(--font--comfortaa);
//         font-size: 18px;
//         font-weight: 200;
//         color: var(--color--black);

//         @media (max-width: 768px){
//             color: var(--color--black);
//             font-size: 14px;
//             text-align: center;
//             font-weight: 800;
//         }
//     }

//     & > h1 {
//         font-family: var(--font--comfortaa);
//         font-size: 65px;
//         margin-left: -5px;
//         width: 100%;
//         line-height: 100%;
//         color: var(--color--black);
//         margin-top: -15px;
//         font-weight: 100;
        

//         @media (max-width: 768px){
//             display: inline-block;
//             width: 100%;
//             font-size: 35px;
//             text-align: center;
//             margin-left: 0;
//             margin-top: -5px;
//             font-weight: 100;
//         }
//     }

//     & > h1 b {
//         color: var(--color--green);
//         font-weight: 100;
        
//         @media(max-width: 768px){
//             font-weight: 100;
//         }
//     }

//     & > p {
//         font-family: var(--font--comfortaa);
//         color: var(--color--black);
//         font-size: 18px;
//         line-height: 120%;
//         width: 80%;
//         font-weight: 100;
//         position: relative;
//         z-index: 2;
        

//         @media (max-width: 768px){
//             width: 80%;
//             font-size: 1rem;
//             text-align: center;
//             padding-bottom: 0px;
//             line-height: 100%;
//         }
//     }
// `;

// const slides = [
//     {
//         title: "Pet Friendly",
//         description: "Não temos restrições quanto ao porte ou raça do seu pet, também não cobramos taxas adicionais para a vinda deles. Aqui, o seu pet tem liberdade total para acessar todas as nossas comodidades!",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/db3f6942-0de2-433d-1235-33bfa547e500/public"
//     },

//     {
//         title: "Aventura",
//         description: "Na propriedade, há trilhas que percorrem a natureza, beirando o rio! Em diversos pontos, você pode dar uma paradinha para tomar um banho nas águas frescas e renovar as energias!",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/b324ce14-d3d8-4fc3-fccf-b4b4a9806d00/public"
//     },

//     {
//         title: "Refrescar",
//         description: "Nossa maravilhosa piscina de borda infinita possui aquecimento solar e tratamento especial por ozônio, com níveis baixíssimos de cloro, além de contar com um ofurô acoplado, perfeito para aproveitar o final de tarde.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/8b7eae12-574b-40fd-5e6f-7f341c81a600/public"
//     },

//     {
//         title: "Sossego",
//         description: "A área da sauna fica situada ao lado da mata, envolvida pelo som relaxante do rio que passa. Aqui, você pode desfrutar de um hot tub abastecido por água natural e aquecido à lenha, o combo perfeito para você relaxar.",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/da7c577a-832a-4a84-d5fd-162e11915b00/public"
//     },

//     {
//         title: "Lazer",
//         description: "Nossas áreas internas contam com três salas superequipadas e aconchegantes, sendo elas: sala de TV, sala de estar, sala de jogos com mesa de bilhar, carteado, jogos de tabuleiro e biblioteca.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/7c086b71-3c6b-442b-584c-dcdabe1be700/public"
//     },

//     {
//         title: "Cozinha",
//         description: "Todas as refeições estão incluídas: café da manhã, almoço, chá da tarde e jantar! Todas preparadas com muito tempero, amor e afeto.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c1c7acdf-aba7-443b-b1e5-3bdc237b3b00/public"
//     },

//     {
//         title: "Diversão",
//         description: "Espaço de sobra para o seu pet se divertir! Espaço agility à beira do lago, com muita grama, para o seu pet, correr, pular, brincar e, claro, nadar!",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c57174c4-9b12-4842-e8ff-6cfb4867a200/public"
//     },

//     {
//         title: "Adega",
//         description: "Para tornar a sua experiência ainda mais especial, contamos com uma adega subterrânea para a climatização perfeita dos vinhos, bar com carta variada de drinks, cervejas e destilados.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/1a66d627-7861-4124-638d-d21ddef05100/public"
//     },

//     {
//         title: "Suítes",
//         description: "São 10 suítes encatadoras e cada uma possui o seu charme. Todas dispõem de uma banheira com vista para a natureza, lareira, cama king-size, ar-condicionado, frigobar e varanda.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/48a11406-659c-4d98-f2d8-6fc518ef6600/public"
//     },

//     {
//         title: "Relaxar",
//         description: "Relaxe no nosso SPA com uma vista de frente para a mata! Você pode escolher contratar os nossos serviços de massoterapia, manicure e pedicure.",
//         buttonText: "Viver minha experiência agora",
//         imageUrl: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/ece77d44-3478-4c00-cb8f-073b002ed400/public"
//     }
// ];

// const PetFriendlyImages = [
//     {
//         images: [
//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c3cd47cc-01fa-43c8-ef2d-e57d8ba50d00/public", alt: 'Cachorro surfando na piscina', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/5bdb3546-6085-40a1-059b-b977978f2800/public", alt: 'Cachorro andando na borda da piscina', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/e69c27cf-cc71-4a1a-c859-7604db2ec700/public", alt: 'Cachorro sentado tomando sol e sorrindo para a foto', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f9af3c90-2ae9-4250-2ac9-afedce182000/public", alt: '2 cachorros e uma mulher no meio', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4fe90a96-3e1a-475e-bf6c-b2f68430b400/public", alt: 'Cachorro mordendo uma bolinha', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/fa931507-db19-427a-91a0-c30d8fb81800/public", alt: 'Casal com um casal de cachorro sentado na beira da piscina', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/f0b0ec5f-6bd1-427d-7bc9-93253779d000/public", alt: 'Mulher na cachoeira com cachorros brincando', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/82fb4467-00bc-422b-be3f-d13d0847d900/public", alt: 'Mulher e cachorro na piscina sorrindo', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/3f981b12-4550-4d26-bdc6-1e3050abf600/public", alt: '3 cachorros tirando uma selfie', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/eff6d8ef-159a-46da-6fe7-0a826541f000/public", alt: 'Cachorro dormindo na rede em cima da cachoeira', loading: "lazy", label: 'Le Ange Serra' },
//         ],
//     },
//     {
//         images: [
//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/23c08875-4c8e-470d-3635-56f4cdfc1000/public", alt: 'Cachorro dormindo no sofá', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a7910dc1-2d38-46fe-c997-734005e71600/public", alt: 'Cachorro papai noel', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/0ba1de25-a892-4ee8-7165-584f54f0b600/public", alt: 'Um cachorro no cola de um humano sorrindo', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/6da69e80-1cff-41e2-5434-318840221800/public", alt: '2 cachorros e uma mulher no meio', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d9be2586-3341-4990-f3c8-685edcad8900/public", alt: 'Cachorro na mão do tutor', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/dce2d881-18d3-4a3d-5b7e-ad7e364be300/public", alt: '2 cachorros sorrindo na rede', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/fab67883-96b6-4f10-9c94-c5622ee8b000/public", alt: 'Uma mulher e um cachorro do lado dela', loading: "lazy", label: 'Le Ange Serra' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/56af4858-5fbf-438f-fac3-ee527c3a4600/public", alt: '3 cachorros brincando na praia', loading: "lazy", label: 'Le Ange Mar' },

//             { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/db285e3c-87b7-40db-b04b-cfd384d06200/public", alt: 'Cachorro andando na cachoeira', loading: "lazy", label: 'Le Ange Serra' },
//         ],
//         reverse: true
//     }
// ];

// const StyledSectionEspaco = styled.section`
//     width: 100%;
//     height: auto;
//     max-width: 1280px;
//     left: 50%;
//     top: 0;
//     position: relative;
//     transform: translateX(-50%)!important;
//     display: flex;
//     align-items: center;
//     justify-content: center;
    

//     @media (max-width: 768px) {
//         height: auto;
//         padding: 0% 0 5% 0;
//         margin-top: 0;
//     }
// `;

// const StyledLocall = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 100%;
//     height: 7vh;
//     background-color: var(--color--green);
//     font-family: var(--font--comfortaa);

//     @media (max-width: 768px){
//         height: 8vh;
//         margin-bottom: 25px;
//     }

//     & > h1{
//         font-weight: 200;
//         width: 80%;
//         text-align: center;
//         font-size: 1.1rem;
//         color: var(--color--white);

//         @media (max-width: 768px){
//             font-size: 1rem;
//             font-weight: 400;
//         }
//     }
// `;

// const StyledContainerEvents = styled.section`
//     width: 90%;
//     max-width: 1280px;
//     left: 50%;
//     top: 0;
//     transform: translateX(-50%)!important;
//     position: relative;
    
//     height: auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin-top: 2.5%;

//     @media (max-width: 768px){
//         height: auto;
//         padding: 5% 2.5%;
//     }
// `

// const StyledButtonCenter = styled.div`
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     height: 15vh;
//     margin-bottom: 0vh;

//     @media (max-width: 768px){
//         display: none;
//     }
// `;

// const ImagesAcomoda = [
//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c21ef88c-f22b-497e-1e70-5c5b4c4cf500/public", text: "Suíte Superior 1", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/23d18593-f941-4c65-0349-6b23e6ea2800/public", text: "Suíte Superior 2", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/99db9a7b-dafd-4b04-36ce-c4eac6880600/public", text: "Suíte Superior 3", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d07d16a0-e7f4-4104-7d5e-f7e4c2dfa500/public", text: "Suíte Standard 4", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/fd429f81-a091-4ca3-9f54-d4a1b730e200/public", text: "Suíte Standard 5", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a22d76b9-b7d4-4174-0cc1-4cfdfd57d500/public", text: "Suíte Master 6", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/a7ae1bee-6f60-4584-d03c-0aebd06a2600/public", text: "Suíte Superior 7", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/4c448474-8a7b-489b-ac5f-7b11c4dfad00/public", text: "Suíte Standard 8", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/509535a4-9291-44a8-c250-5e8be0b28e00/public", text: "Suíte Superior 9", loading: "lazy" },

//     { src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/853f4009-5ddc-49ad-717f-3d49d3ad4900/public", text: "Suíte Master 10", loading: "lazy" },
// ];

// const IdadeCrianca = styled.p`
//   font-size: .9rem!important;
//   opacity: .4;
//   font-weight: 200;

//   @media (max-width: 768px) {
//     width: 100%!important;
//   }
// `

// const AlertDiv = styled.div`
//     width: 100%;
//     margin-top: 5vh;
//     margin-bottom: -5vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     @media (max-width: 768px){
//         margin-top: 0;
//         margin-bottom: 0;
//     }
// `

// const Serra = () => {

//     useEffect(() => {
//         AOS.init({ duration: 1000, once: false });
//         AOS.refresh(); 
//       }, []);

//       const [events, setEvents] = useState([]);
//               const [loading, setLoading] = useState(true);
            
//               useEffect(() => {
//                 const fetchData = async () => {
//                   try {
//                     const data = await getEvents();
//                     setEvents(data);
//                   } catch (error) {
//                     console.error("Erro ao buscar eventos do Firebase:", error);
//                   } finally {
//                     setLoading(false);
//                   }
//                 };
            
//                 fetchData();
//               }, []);

//     return (
//         <>
//             <Helmet>
//                 <title>Le Ange Serra - Pousada Le Ange</title>
//             </Helmet>

//             <StyledEspace />

//             <StyledSectionHome>
//                 <StyledHomeDiv data-aos="zoom-in" data-aos-delay="100"/>
//                 <StyledHomeTexts>
//                     <h4 data-aos="fade-up" data-aos-delay="100">Conheça a Le Ange Serra, a pousada mais</h4>
//                     <h1 data-aos="fade-down" data-aos-delay="200">PET FRIENDLY<br /> DO <b>BRASIL</b></h1>
//                     <p>Aqui você e o seu pet, são mais do que bem-vindos!</p>
//                     <CustomButton
//                         idBtn="clickwpp"
//                         text="Reservar agora!"
//                         textColor="var(--color--black)"
//                         backgroundColor="transparent"
//                         borderColor="var(--color--black)"
//                         hoverBackgroundColor="var(--color--green)"
//                         hoverBorderColor="var(--color--green)"
//                         hoverColor="var(--color--white)"
//                         hoverIconColor="var(--color--white)"
//                         onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
//                     />
//                     <IdadeCrianca>*Idade miníma para hospedagem 13 anos, mesmo que acompanhado dos pais</IdadeCrianca>
//                 </StyledHomeTexts>
//             </StyledSectionHome>

//             <StyledLocall data-aos="fade-up" data-aos-delay="200">
//                 <h1 data-aos="fade-in" data-aos-delay="400">LeAnge Serra | Miguel Pereira RJ</h1>
//             </StyledLocall>

//             <Regras />

//             <StyledSectionEspaco>
//                 <CarouselComponent slides={slides} 
//                 backgroundColor="var(--color--green)"
//                 />
//             </StyledSectionEspaco>

//             <AcomodaComponent images={ImagesAcomoda} data-aos="fade-up" data-aos-delay="200"/>

//             <Pensao />
            
//             <PetFriendlyCarousel carousels={PetFriendlyImages}/>

//             <StyledButtonCenter>
//                 <Button 
//                 idBtn="clickwpp"
//                 backgroundColor="var(--color--green)"
//                 text="Fazer minha reserva!" 
//                 onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
//                 />
//             </StyledButtonCenter>

//             {/* <EventAlert /> */}
            
//             <StyledContainerEvents>
//                 <EventCardCarousel events={events} />
//             </StyledContainerEvents>

//             <Depoimentos />
            
//             <Footer />

//             {/* <WhatsAppButton /> */}
//         </>
//     );
// };

// export default Serra;
