import React, { useEffect, useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import styled, {keyframes} from "styled-components";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../firebaseConfig";

const UpDown = keyframes`
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px) skew(1deg);
    }

    100% {
        transform: translateY(10px) skew(-1deg);
    }
`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 2.5% 5%;
    flex-direction: column;
    gap: 50px;

    @media (max-width: 768px){

    }

    & div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        @media (max-width: 768px){
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 20px;
        }

        & h1 {
            font-size: 36px;
            width: 65%;
            line-height: 1.0;
            font-family: var(--font--comfortaa);
            font-weight: 200;

            @media (max-width: 768px){
                font-size: 28px;
                width: 100%;
            }
    
            & b {
                font-weight: 500;
            }
        }
    
        & > span {
            background-color: #00800015;
            border: 1px solid #00800025;
            padding: 10px 15px;
            border-radius: 10px;
            font-size: 16px;
            font-family: var(--font--comfortaa);
            color: #008000;

            @media (max-width: 768px){
                font-size: 14px;
                padding: 7.5px 10px;
            }
        }
    }

    & main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 50px;

        @media (max-width: 768px){
            flex-direction: column;
            gap: 100px;
        }

        & div {
            width: 50%;
            height: 600px;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: flex-start;

            @media (max-width: 768px){
                width: 100%;
                height: 400px;
            }

            & picture {
                width: 250px;
                height: 350px;
                position: absolute;

                & span {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    color: #fff;
                    font-family: var(--font--avenir);
                    font-size: 10px;
                    font-weight: 500;
                    background-color: rgba(0, 0, 0, 0.2);
                    padding: 5px 8px;
                    border-radius: 6px;
                }

                & img {
                    border-radius: 15px;
                    border: 3px solid #fff;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            & picture:nth-child(1){
                position: absolute;
                left: 0;
                top: 0;
                animation: ${UpDown} 5s infinite alternate-reverse;
            }

            & picture:nth-child(2){
                position: absolute;
                bottom: 0%;
                left: 20%;
                animation: ${UpDown} 8s infinite alternate-reverse;

                @media (max-width: 768px){
                    display: none;
                }
            }

            & picture:nth-child(3){
                position: absolute;
                right: 0;
                top: 20%;
                animation: ${UpDown} 5s infinite alternate;

                @media (max-width: 768px){
                    top: 25%;
                }
            }

            /* Ajustes para quando há menos de 3 imagens */
            &:has(picture:nth-child(1):nth-last-child(1)) picture:nth-child(1) {
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }

            &:has(picture:nth-child(2):nth-last-child(1)) {
                & picture:nth-child(1) {
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                & picture:nth-child(2) {
                    right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }

        & aside {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            gap: 25px;
            background-color: #f9f9f9;
            border: 1px solid #f1f1f1;
            padding: 30px;
            border-radius: 10px;

            @media (max-width: 768px){
                width: 100%;
                padding: 20px;
            }

            & h2 {
                font-size: 32px;
                font-family: var(--font--avenir);
                font-weight: 500;

                @media (max-width: 768px){
                    font-size: 26px;
                }
            }

            & p {
                font-size: 18px;
                font-family: var(--font--avenir);
                font-weight: 300;
                margin-top: -20px;

                @media (max-width: 768px){
                    font-size: 16px;
                }
            }

            ol {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                gap: 7px;
                list-style: none;

                & li {
                    font-family: var(--font--avenir);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                    height: 100%;
                    line-height: 100%;
                    font-size: 18px;

                    @media (max-width: 768px){
                        font-size: 16px;
                    }

                    & > span {
                        font-size: 12px;
                        line-height: 100%;
                        padding: 3px;
                        border-radius: 3px;
                        height: auto;
                        background-color: #00800015;
                        color: #008000;
                    }

                    & p {
                        font-size: 14px;
                        opacity: 0.6;
                        line-height: 100%;
                        margin-top: 0px;

                        @media (max-width: 768px){
                            font-size: 12px;
                            display: none;
                        }
                    }
                }
            }

            & button {
                width: auto;
                height: auto;
                padding: 14px 20px;
                font-size: 18px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-family: var(--font--avenir);
                background-color: #008000;
                color: #fff;
                border: transparent;
                border-radius: 10px;
                cursor: pointer;

                @media (max-width: 768px){
                    width: 100%;
                }
            }

            & > span {
                font-size: 16px;
                font-family: var(--font--avenir);
                font-weight: 300;

                @media (max-width: 768px){
                    margin-top: -10px;
                    font-size: 14px;
                }

                & a {
                    font-weight: 500;
                    color: var(--color--blue);

                    @media (max-width: 768px){
                        font-weight: 400;
                    }
                }
            }
        }
    }

`

export default function SobreLP({
    pacote,

}) {
    const [pacoteData, setPacoteData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para criar slug a partir do título do pacote
    const createSlug = (title) => {
        if (!title) return '';
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/-+/g, '-') // Remove hífens duplicados
            .trim();
    };

    // Buscar dados do pacote no Firebase
    useEffect(() => {
        const fetchPacoteData = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, "pacotes"));
                const pacotesData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Encontrar o pacote pelo slug
                const pacoteEncontrado = pacotesData.find(p => createSlug(p.title) === pacote);

                if (pacoteEncontrado) {
                    setPacoteData(pacoteEncontrado);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar dados do pacote:", error);
            } finally {
                setLoading(false);
            }
        };

        if (pacote) {
            fetchPacoteData();
        }
    }, [pacote]);

    // Imagens padrão para fallback
    const defaultImages = [
        {
            src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/bbca820c-502b-48cf-a6d6-8a4d4da25900/public",
            text: "Pousada Le Ange"
        },
        {
            src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/2edd1026-cdea-4ac6-f501-713bba86d600/public",
            text: "Le Ange Mar"
        },
        {
            src: "https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/74bff9be-8742-4468-e032-4cf79abe5300/public",
            text: "Le Ange Serra"
        }
    ];

    // Verificar se há imagens customizadas ou usar as padrão
    const getImages = () => {
        if (pacoteData?.images && pacoteData.images.length > 0) {
            return pacoteData.images;
        }
        return defaultImages;
    };

    // Título do pacote - usar o título real ou fallback para o slug
    const getTitulo = () => {
        if (pacoteData?.title) {
            return pacoteData.title;
        }
        return pacote || "Pacote Especial";
    };

    if (loading) {
        return (
            <Content>
                <div>
                    <h1>Carregando informações do pacote...</h1>
                </div>
            </Content>
        );
    }
    return (
        <>
            <Content>
                <div>
                    <h1>Conheça mais sobre o <b>{getTitulo()}</b> na Pousada Le Ange</h1>
                    <span>Pousada Le Ange</span>
                </div>
                <main>
                    <div>
                        {getImages().map((image, index) => (
                            <picture key={index}>
                                <span>{image.text || ""}</span>
                                <img src={image.src} alt={image.alt || `Imagem ${index + 1} do pacote`} loading="lazy" />
                            </picture>
                        ))}
                    </div>
                    <aside>
                        <h2>Tudo que está incluso:</h2>
                        <p>Todas as refeições estão inclusas no pacote, você pode consultar todas as informações sobre alimentação nentrando em contato</p>
                        <ol>
                            <li><span><IoMdCheckmark /></span> Café da manhã</li>
                            <li><span><IoMdCheckmark /></span> Almoço</li>
                            <li><span><IoMdCheckmark /></span> Café da tarde</li>
                            <li><span><IoMdCheckmark /></span> Jantar especial <p>(dependerá do pacote escolhido para a diária)</p></li>
                        </ol>
                        <button>
                            <BsCalendarDate />
                            Fazer minha reserva agora!
                        </button>
                        <span>*Ao entrar em contato, você concorda com a nossa <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">politica de privacidade</a>.</span>
                    </aside>
                </main>
            </Content>
        </>
    )
}