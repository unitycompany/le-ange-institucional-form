import styled from 'styled-components';
import { LuInstagram } from "react-icons/lu";
import { AiOutlineTikTok, AiOutlinePinterest } from "react-icons/ai";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdOutlineArrowRight } from "react-icons/md";
import { motion, useInView } from 'framer-motion';
import { RiCopyrightLine } from "react-icons/ri";
import React, { useRef, useState } from 'react';
import 'aos/dist/aos.css';
import WhatsAppButton from './Whatsapp';
import { Link } from 'react-router-dom';

const SubmitBtn = styled(motion.button)`
    font-family: inherit;
    width: 80%;
    border-radius: 20px 0 20px 0;
    font-size: 20px;
    background: #212121;
    color: white;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    cursor: pointer;
    border: none;
    font-weight: 1000;

    @media (max-width: 768px){
        width: 100%;
        font-size: 10px;
        padding: 1em;
    }

    & > span {
        margin-left: 20px;
        transition: opacity 0.3s ease-in-out;
        font-family: var(--font--comfortaa);
        font-size: 15px;
    }

    & > svg {
        transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;
        max-width: 100%;
    }

    &:hover {
        background: var(--color--blue);
    }

    &:hover > svg {
        transform: translateX(5px) scale(1.2);
        color: #fff;
    }

    &:active {
        transform: scale(0.95);
    }
`;

const StyledFooterContainer = styled(motion.footer)`
    height: auto;
    max-width: 1280px;
    position: relative;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    margin-top: 5vh;
    padding: 5% 5%;
    width: 96%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color--black);
    border-radius: 70px 70px 0 0;
    gap: 60px;

    @media (max-width: 768px){
        margin-top: 5vh;
        border-radius: 25px 25px 0 0;
        padding: 10% 5%;
    }
`;

const StyledTitles = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 768px){
        width: 100%;
        align-items: center;
    }

    & > h1{
        font-family: var(--font--comfortaa);
        width: 70%;
        font-size: 28px;
        line-height: 100%;
        color: var(--color--white);
        font-weight: 400;

        @media (max-width: 768px){
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 20px;
        }
    }

    & > p {
        width: 80%;
        line-height: 110%;
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        font-size: .9rem;
        font-weight: 200;
        opacity: .7;

        @media (max-width: 768px){
            width: 90%;
            text-align: center;
            font-size: 12px;
        }
    }

    & > p > a{
        margin-left: 1ch;
        color: var(--color--blue);
    }

    & > hr{
        width: 85%;

        @media (max-width: 768px){
            display: none;
        }
    }

    & > div{
        width: 85%;
        display: flex;
        justify-content: space-between;
        margin-top: -25px;
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        font-weight: 200;

        @media (max-width: 768px){
            display: none;
        }
    }

    & > div > div{
        display: flex;
        gap: 10px;
    }

    & > div > div > a {
        color: var(--color--white);
    }

    & h4 {
        font-weight: 300;
    }
`;

const StyledForm = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;

    @media (max-width: 768px){
        width: 100%;
    }

    & > form{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        gap: 10px;
    }

    & > form > input{
        width: 80%;
        height: 30px;
        border-radius: 0 20px 0 20px;
        border: none;
        padding: 20px;
        background-color: var(--color--white);
        font-family: var(--font--comfortaa);

        @media (max-width: 768px){
            width: 100%;
        }
    }
`;

const StyledSectionTop = styled.section`
    display: flex;
    width: 100%;
    height: 35vh;

    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
        gap: 25px;
    }
`;

const StyledLinks = styled.section`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 30vh;

    @media (max-width: 768px){
        width: 100%;
        height: auto;
        flex-direction: column;
        gap: 50px;
    }

    & > div {
        width: 25%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 5px;

        @media (max-width: 768px){
         width: 100%;
        }
    }

    & > div p{
        color: var(--color--white);
        width: 80%;
        line-height: 100%;
        font-family: var(--font--comfortaa);
        margin-top: 10px;
        font-size: .9rem;

        @media (max-width: 768px){
            font-size: 16px;
        }
    }

    & > div h2{
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        font-size: 18px;
        font-weight: 100;
        margin-bottom: 10px;

        @media (max-width: 768px){
            font-size: 20px;
        }
    }

    & > div a{
        color: var(--color--white);
        text-decoration: none;
        font-family: var(--font--comfortaa);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: .9rem;
        font-weight: 200;
        padding: 2px;
        gap: 2px;
        transition: all .1s ease!important;
        border-radius: 5px;
        width: 80%;
    }

    & > div a:hover{
        background-color: var(--color--white);
        transform: translateX(5px)!important;
        color: var(--color--black);
        width: 80%;
    }

    & > div > img {
        width: 40%;
        object-fit: contain;
    }
`;

const StyledLocation = styled.section`
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
    }

    & > h1{
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        font-weight: 200;
        width: 30%;
        line-height: 100%;

        @media (max-width: 768px){
            width: 100%;
            font-size: 20px;
            text-align: center;
        }
    }
`;

const StyledHR = styled.hr`
    width: 100%;
    margin-bottom: -50px;
`;

const StyledPolitica = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2vh;
    font-family: var(--font--comfortaa);

    @media (max-width: 768px){
        height: auto;
        flex-direction: column;
        gap: 15px;
    }

    & > p{
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        font-size: 12px;
    }

    & > a{
        color: var(--color--blue);
        font-size: 12px;
    }

    & > p > b > a{
        color: var(--color--blue);
    }
`;

const Footer = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const generateUniqueId = () => {
        return `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
    };
    
    const getUTMs = () => {
        const params = new URLSearchParams(window.location.search);
        const utms = {
            utm_source: params.get('utm_source') || 'organico',
            utm_medium: params.get('utm_medium') || '',
            utm_campaign: params.get('utm_campaign') || '',
            utm_term: params.get('utm_term') || '',
            utm_content: params.get('utm_content') || '',
        };
        return utms;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Impede o comportamento padrão de recarregar a página
    
        // Verifique se os dados estão preenchidos
        if (!name || !email || !tel) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
    
        // Gera um ID único para o usuário
        const uniqueId = generateUniqueId();
    
        // Cria um objeto com todos os valores como strings
        const formData = {
            id: uniqueId, // Adiciona o ID único ao objeto
            name: String(name).trim(),  // Garantindo que seja uma string e removendo espaços em branco
            email: String(email).trim(), // Garantindo que seja uma string e removendo espaços em branco
            tel: String(tel).trim(),     // Garantindo que seja uma string e removendo espaços em branco
            conversion_url: window.location.href, // Inclui a URL da conversão
            ...getUTMs(),                // Adiciona as UTM's capturadas
        };
    
        try {
            // URL do webhook - usa proxy em desenvolvimento, URL direta em produção
            let webhookUrl = import.meta.env.DEV 
                ? '/api/webhook' 
                : 'https://unitycompany.app.n8n.cloud/webhook/kommo/leads-form-site';
                
            let response = await fetch(webhookUrl, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Se em desenvolvimento e der erro 404, tenta URL direta
            if (!response.ok && response.status === 404 && import.meta.env.DEV) {
                console.log('Webhook de teste não encontrado, tentando URL direta...');
                webhookUrl = 'https://unitycompany.app.n8n.cloud/webhook/kommo/leads-form-site';
                response = await fetch(webhookUrl, { 
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                
                // Com no-cors, assumimos sucesso se não houver erro
                alert('Dados enviados com sucesso!');
                setName('');
                setEmail('');
                setTel('');
                window.open('https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329', '_blank');
                return;
            }

            const responseBody = await response.text();
            if (response.ok) {
                alert('Dados enviados com sucesso!');
                setName('');
                setEmail('');
                setTel('');
                window.open('https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329', '_blank');
            } else {
                console.error('Erro de resposta:', responseBody);
                
                try {
                    const errorData = JSON.parse(responseBody);
                    if (errorData.code === 404 && errorData.message.includes('webhook')) {
                        alert('⚠️ Webhook não está ativo no n8n.\n\nPara resolver:\n1. Abra o workflow no n8n\n2. Clique em "Execute Workflow"\n3. Tente enviar o formulário novamente');
                    } else {
                        alert('Erro ao enviar os dados: ' + errorData.message);
                    }
                } catch (parseError) {
                    alert('Erro ao enviar os dados. Tente novamente.');
                }
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar os dados. Tente novamente.'); // Mensagem de erro
        }
    };
    
    
    

    return (
        <>
            <StyledFooterContainer ref={ref}>
                <StyledSectionTop>
                    <StyledTitles>
                        <h1 data-aos="fade-up">
                            Fale agora com a nossa Central de Reservas
                        </h1>
                        <p data-aos="fade-up" data-aos-delay="100">
                            As suas informações são mantidas em segurança e utilizadas apenas para entrar em contato. Entenda melhor como tratamos os seus dados pela nossa
                            <Link to="/politica-de-privacidade" rel="noopener noreferrer">política de privacidade</Link>.
                        </p>
                        <hr data-aos="fade-right" data-aos-delay="200" />
                        <div>
                            <h4 data-aos="fade-up" data-aos-delay="300">Siga-nos</h4>
                            <div>
                                <a href="https://instagram.com/pousadaleange" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="400">
                                    <LuInstagram />
                                </a>
                                <a href="https://tiktok.com/@pousadaleange" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="450">
                                    <AiOutlineTikTok />
                                </a>
                                <a href="https://pinterest.com/pousadaleange" target="_blank" rel="noopener noreferrer" data-aos="fade-up" data-aos-delay="500">
                                    <AiOutlinePinterest />
                                </a>
                            </div>
                        </div>
                    </StyledTitles>
                    <StyledForm data-aos="fade-down" data-aos-delay="500">
                        <form id="contactForm" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="name"
                                placeholder="Digite o seu nome"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                data-aos="fade-up" data-aos-delay="600"
                            />
                            <input
                                type="email"
                                id="email"
                                placeholder="Preciso saber o seu e-mail também"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                data-aos="fade-up" data-aos-delay="700"
                            />
                            <input
                                type="tel"
                                id="tel"
                                placeholder="Por fim, o seu número de WhatsApp"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                data-aos="fade-up" data-aos-delay="800"
                            />
                            <SubmitBtn type="submit" data-aos="fade-up" data-aos-delay="1000">
                                <FaArrowRightLong size={20} />
                                <span>Enviar dados para contato</span>
                            </SubmitBtn>
                        </form>
                    </StyledForm>
                </StyledSectionTop>
    
                <StyledLinks>
                    <div>
                        <img
                            src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/0b4e1dd7-194d-4d4c-da16-c16c77281000/public"
                            alt="Descrição da imagem"
                            loading="lazy"
                            data-aos="fade-up" data-aos-delay="200"
                        />
                        <p data-aos="fade-down" data-aos-delay="400">A pousada mais Pet Friendly, venha conhecer!</p>
                    </div>
                    <div>
                        <h2 data-aos="fade-up" data-aos-delay="50">Mapa do site</h2>
                        <a href='/' data-aos="fade-down" data-aos-delay="100"> <MdOutlineArrowRight /> Início </a>
                        <a href='/pacotes' data-aos="fade-up" data-aos-delay="150"> <MdOutlineArrowRight /> Pacotes </a>
                        <a href='/sobre' data-aos="fade-up" data-aos-delay="150"> <MdOutlineArrowRight /> Sobre nós </a>
                        <a href='/serra' data-aos="fade-down" data-aos-delay="200"> <MdOutlineArrowRight /> Le Ange Serra </a>
                        <a href='/mar' data-aos="fade-up" data-aos-delay="250"> <MdOutlineArrowRight /> Le Ange Mar </a>
                        <a href='/event' data-aos="fade-down" data-aos-delay="300"> <MdOutlineArrowRight /> Eventos </a>
                        <a href='/acomodaSerra' data-aos="fade-up" data-aos-delay="350"> <MdOutlineArrowRight /> Acomodações Serra </a>
                        <a href='/acomodaMar' data-aos="fade-up" data-aos-delay="400"> <MdOutlineArrowRight /> Acomodações Mar </a>
                    </div>
                    <div>
                        <h2 data-aos="fade-up" data-aos-delay="400">Central de reserva</h2>
                        <a href="https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329" target='_blank' data-aos="fade-up" data-aos-delay="100"> <MdOutlineArrowRight /> WhatsApp </a>
                        <a href="https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329" target='_blank' data-aos="fade-down" data-aos-delay="150"> <MdOutlineArrowRight /> +55 (21) 99423-0871 </a>
                        <a href='mailto:pousadaleange@gmail.com' target='_blank' data-aos="fade-up" data-aos-delay="200"> <MdOutlineArrowRight /> pousadaleange@gmail.com </a>
                    </div>
                    <div>
                        <h2 data-aos="fade-up" data-aos-delay="600">Fique por dentro de tudo</h2>
                        <a href='https://www.instagram.com/pousadaleange/' target='_blank' data-aos="fade-down" data-aos-delay="100"> <MdOutlineArrowRight /> Instagram </a>
                        <a href='https://www.tiktok.com/@pousadaleange' target='_blank' data-aos="fade-up" data-aos-delay="150"> <MdOutlineArrowRight /> TikTok </a>
                        <a href='https://br.pinterest.com/pousadaleange/' target='_blank' data-aos="fade-down" data-aos-delay="200"> <MdOutlineArrowRight /> Pinterest </a>
                    </div>
                </StyledLinks>
    
                <StyledLocation>
                    <h1 data-aos="fade-down" data-aos-delay="200">Saiba onde estamos localizados</h1>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235239.22077211382!2d-43.355636!3d-22.461517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99106a0d4d634d%3A0x5a069366075bf207!2sPousada%20Le%20Ange!5e0!3m2!1spt-BR!2sbr!4v1697101366468!5m2!1spt-BR!2sbr"
                            width="350"
                            height="200"
                            style={{ border: 0, borderRadius: '15px 0px 15px 0px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa da Unidade Serra"
                            data-aos="fade-left" data-aos-delay="300"
                        ></iframe>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14718.952062952678!2d-41.958707!3d-22.737977!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x97ab01cac79615%3A0x6b404b4741597da1!2sLeAnge%20Mar!5e0!3m2!1spt-BR!2sus!4v1728577984633!5m2!1spt-BR!2sus"
                            width="350"
                            height="200"
                            style={{ border: 0, borderRadius: '0px 15px 0px 15px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa da Unidade Mar"
                            data-aos="fade-right" data-aos-delay="400"
                        ></iframe>
                    </div>
                </StyledLocation>
    
                <StyledHR />
    
                <StyledPolitica>
                    <p>Todos os direitos reservados | <RiCopyrightLine /> 2024</p>
                    <a href='https://pousadaleange.com.br/politica-de-privacidade'>Termos de condições</a>
                    <p>Desenvolvido por <b><a href='https://alephsramos.com.br' target='_blank'>Aleph</a></b></p>
                </StyledPolitica>

                
            </StyledFooterContainer>
            <WhatsAppButton />
        </>
    );
}    

export default Footer;