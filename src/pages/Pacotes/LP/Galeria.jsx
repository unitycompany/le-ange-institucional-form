import react from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import styled from 'styled-components';

const Content = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;
    padding: 1.5% 5%;
    font-family: var(--font--avenir);

    & h1 {
        font-size: 32px;
        font-weight: 400;
        text-align: center;
        font-family: var(--font--comfortaa);
    }

    & main {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        gap: 5px;

        & div {
            width: 32%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 5px;

            & img {
                width: 100%;
                max-width: 400px;
                border-radius: 20px;
                object-fit: cover;
            }
        }

        & div:nth-child(1) {
            & img:nth-child(1) {
                height: 400px!important;
            }

            & img:nth-child(2) {
                height: 500px!important;
            }
        }

        & div:nth-child(2) {
            & img:nth-child(1) {
                height: 300px!important;
            }

            & img:nth-child(2) {
                height: 500px!important;
            }
        }

        & div:nth-child(3) {
            & img:nth-child(1) {
                height: 500px!important;
            }

            & img:nth-child(2) {
                height: 400px!important;
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
    }

    & aside {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        position: relative;
        top: -60px;
        
        & > span {
            font-size: 16px;
            font-family: var(--font--avenir);
            font-weight: 300;
            margin-top: -5px;
    
            & a {
                font-weight: 400;
                color: var(--color--blue);
            }
        }
    }

`

export default function Galeria({
    titulodopacote
}) {
    return (
        <>
            <Content>
                <h1>Galeria de fotos do pacote <b>{titulodopacote}</b></h1>
                <main>
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                    </div>
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                    </div>
                    <div>
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/c15257b6-956b-4f1d-ee81-9870ce695d00/public" alt="" />
                    </div>
                </main>
                <aside>
                    <button>
                        <BsCalendarDate />
                        Fazer minha reserva agora!
                    </button>
                    <span>*Ao entrar em contato, você concorda com a nossa <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">politica de privacidade</a>.</span>
                </aside>
            </Content>
        </>
    )
}