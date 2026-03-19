import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Button from './button';
import { FaMountainSun } from "react-icons/fa6";
import { FaHome, FaInfoCircle, FaAnchor, FaMountain, FaCalendar, FaBed } from 'react-icons/fa';
import { HiBars3BottomRight } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate as usePageNavigation } from 'react-router-dom';
import RedirectSelect from './selectNavBar';
import { CiCalendarDate } from "react-icons/ci";


// Animação de loading
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--color--light-gray), var(--color--white));
  color: var(--color--black);
  appearance: none;
  cursor: pointer;
  font-family: var(--font--comfortaa);
  font-size: 0.8rem;
  transition: all .2s ease, border .2s ease;

  &:hover {
    background-color: transparent;
    color: var(--color--black);
    border: 1px solid rgba(0, 0, 0, 0.4);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.8rem;
    margin-top: -6px;
  }

  option {
    padding: 8px;
    margin: 4px 0;
    background: linear-gradient(135deg, var(--color--blue), var(--color--green));
    color: var(--color--black);
  }

  option:hover {
    background-color: var(--color--green);
    color: var(--color--hover-text);
    font-style: italic;
  }

  option:nth-child(even) {
    background: transparent!important;
    border: none;
  }

  option:nth-child(odd) {
    background-color: var(--color--white);
  }

  option:checked {
    background-color: var(--color--black);
    color: var(--color--white);
    font-weight: bold;
  }

  option:nth-child(1) {
    @media (max-width: 768px) {
      font-size: 0.6rem !important;
      padding: 10px !important;
      color: transparent !important;
      background-color: transparent !important;
    }
  }

  option:nth-child(2) {
    color: var(--color--green);
    font-weight: 800;

    @media (max-width: 768px) {
      font-size: 0.6rem !important;
      padding: 10px !important;
      text-align: left;
    }
  }

  option:nth-child(3) {
    color: var(--color--blue);
    font-weight: 800;

    @media (max-width: 768px) {
      font-size: 0.6rem !important;
      padding: 10px !important;
      text-align: left;
    }
  }
`;

const LoadingOverlay = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  align-items: center;
  justify-content: center;
  z-index: 9999; /* Garantir que fique acima de outros elementos */

  & img {
    width: 350px; /* Ajuste o tamanho do GIF aqui */
    height: auto;
  }
`;

const StyledDiv = styled.div`
    display: none;

    @media (min-width: 1080px) {
        display: flex;
        background-color: ${({ isScrolled }) => (isScrolled ? 'rgba(251, 251, 251, 0.5)' : '#fbfbfb')};
        backdrop-filter: ${({ isScrolled }) => (isScrolled ? 'blur(5px)' : 'none')}; 
        position: fixed;
        align-items: center;
        justify-content: space-between;
        width: 85%;
        max-width: 1320px;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 2.5%;
        height: 9vh;
        box-shadow: 0 0 5px #4d4d4d50;
        border-radius: 0 0 20px 20px ;
        z-index: 999;
        transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
    }
`;

const StyledHeader = styled.header`
    display: flex;
    gap: 5px;
`;

const StyledLink = styled(({ onClick, ...props }) => {
    const handleClick = (event) => {
        console.log('Link clicado:', props.to);
        onClick?.(event);
        if (props.to.includes('whatsapp')) {
            console.warn('Redirecionamento suspeito:', props.to);
        }
    };

    return <Link {...props} onClick={handleClick} />;
})`
    position: relative;
    color: var(--color--black);
    text-decoration: none;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font--comfortaa);
    font-weight: 600;
    padding: 10px 15px;
    transition: all 0.3s ease;
    border-radius: 10px;
    background-color: ${({ isActive, variant }) =>
        isActive
            ? variant === 'serra'
                ? 'var(--color--green)'
                : variant === 'mar'
                    ? 'var(--color--blue)'
                    : 'var(--color--black)'
            : 'transparent'};
    color: ${({ isActive }) => (isActive ? 'var(--color--white)' : 'var(--color--black)')};

    &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 100%;
        left: 0;
        background: rgb(20, 20, 20);
        opacity: 0;
        z-index: -1;
        transition: all 0.5s;
        border-radius: 10px;
    }

    &:hover {
        color: var(--color--white);
        background-color: ${({ variant }) =>
        variant === 'serra' ? 'var(--color--green)' :
            variant === 'mar' ? 'var(--color--blue)' :
                'var(--color--black)'};
    }

    &:hover::before {
        left: 0;
        right: 0;
        opacity: 1;
    }
`;

const IconContainer = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 0;
    height: 0;
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.3s ease, transform 0.3s ease, width 0.3s ease, height 0.3s ease;
    overflow: hidden;

    ${({ isVisible }) => isVisible && ` 
        width: 13px;
        height: 13px;
        opacity: 1;
        transform: scale(1);
        margin-right: 7.5px;
    `}
`;

const ConfettiContainer = styled.div`
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transition: opacity 1s ease-out;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
`;

const EventButton = styled(StyledLink)`
    background: ${({ isActive }) => (isActive ? 'linear-gradient(45deg, #ff6b6b, #f06595, #eeafaf)' : 'transparent')};
    color: ${({ isActive }) => (isActive ? 'white' : 'var(--color--black)')};

    &:hover {
        background: linear-gradient(45deg, #f06595, #ff6b6b, #eeafaf);
        color: white;
    }
`;

const MobileBar = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        background-color: ${({ isScrolled }) => (isScrolled ? 'rgba(251, 251, 251, 0.4)' : '#fbfbfb')};
        backdrop-filter: ${({ isScrolled }) => (isScrolled ? 'blur(10px)' : 'none')}; 
        position: fixed;
        z-index: 999;
        align-items: center;
        justify-content: space-between;
        width: 85%;
        margin-left: 7.5%;
        margin-top: 10px;
        padding: 0 5%;
        height: 8vh;
        box-shadow: 0 0 5px #4d4d4d80;
        border-radius: 10px 0 10px 0;

        & > img {
            width: 25%;
            height: 100%;
            object-fit: contain;
        }

        & > button {
            display: flex;
            width: 30%;
            border-radius: 5px 0 5px 0;
            font-family: var(--font--comfortaa);
            border: none;
            font-size: 12px;
            padding: 7.5px;
            gap: 2.5px;
            background-color: transparent;
            color: var(--color--black);
            align-items: center;
            justify-content: space-evenly;
            transition: all 0.2s ease;
            border: 1px solid var(--color--black);
            background-color: ${({ isClicked }) => (isClicked ? 'var(--color--black)' : 'transparent')};
            color: ${({ isClicked }) => (isClicked ? 'var(--color--white)' : 'var(--color--black)')};

            &:hover {
                background-color: var(--color--black);
                color: var(--color--white);
                border: 1px solid var(--color--black);
                transform: scale(0.95);
            }
        }
    }
`;

const Sidebar = styled.div`
    display: flex;
    position: fixed;
    z-index: 999;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 20px 20px 0;
    padding: 20px;
    width: 250px;
    height: 95dvh;
    margin-top: 2.5vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

    transform: translateX(-100%);
    transition: transform 0.3s ease;

    ${({ isOpen }) => isOpen && ` 
        transform: translateX(0);
    `}

    & > button:nth-child(1) {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 12px;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: var(--color--black);
        color: var(--color--white);
        font-family: var(--font--comfortaa);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all .2s ease-in-out;

        &:hover{
            transform: rotate(180deg) scale(0.95);
            border: 2px solid var(--color--black);
            background-color: red;
        }
    }

    & > img {
        width: 65%;
        margin-top: 50px;
    }

    & > div {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
`;

const NavegationBar = () => {
    const location = useLocation();
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiVisible, setConfettiVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const validRoutes = ["/", "/sobre", "/mar", "/serra", "/event", "/acomodaSerra", "/acomodaMar", "/lpMar", "/lpSerra", "/pacotes"]; // Adicione todas as rotas válidas aqui

    let scrollTimeout;

    useEffect(() => {
        const handleGlobalClick = (event) => {
            const link = event.target.closest('a');
            if (link && link.href.includes('whatsapp')) {
                console.warn('Redirecionamento para WhatsApp detectado:', link.href);
            }
        };

        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, []);

    useEffect(() => {
        console.log('Rota atual:', location.pathname);
        if (location.pathname.includes('whatsapp')) {
            console.warn('Comportamento suspeito detectado na navegação para:', location.pathname);
        }
    }, [location.pathname]);


    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
        setIsClicked((prev) => !prev); // Alterna o estado de clique
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setIsClicked(false); // Reseta o estado de clique ao fechar
    };

    const handleScroll = () => {
        setIsScrolled(true);
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            setIsScrolled(false);
        }, 1000);
    };


    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState("");

    const handleNavigation = (event) => {
        const value = event.target.value;
        if (value) {
            setSelectedValue(value); // Atualiza o estado com a opção selecionada
            navigate(value);
        }
    };

    useEffect(() => {
        // Verifica se a rota atual não é válida
        if (!validRoutes.includes(location.pathname) && !location.pathname.startsWith('/pacote/')) {
            navigate("/", { replace: false }); // Redireciona para a página inicial sem alterar a URL
        }
    }, [location.pathname, navigate]);


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []);

    useEffect(() => {
        if (location.pathname !== "/") {
            setIsLoading(true);

            const loadingTimer = setTimeout(() => {
                setIsLoading(false);
            }, 1000);

            return () => clearTimeout(loadingTimer);
        } else {
            setIsLoading(false);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (location.pathname === "/event") {
            setShowConfetti(true);
            setConfettiVisible(true);
            const timer = setTimeout(() => {
                setConfettiVisible(false);
                setTimeout(() => setShowConfetti(false), 1000);
            }, 8000);
            return () => clearTimeout(timer);
        } else {
            setConfettiVisible(false);
            setTimeout(() => setShowConfetti(false), 1000);
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isSidebarOpen) {
            closeSidebar(); // Fecha a sidebar ao mudar de rota
        }
    }, [location.pathname]);


    return (
        <>
            <LoadingOverlay isLoading={isLoading}>
                <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/59746ba9-5d6e-4873-dad6-26930b03a900/public" alt="Loading..." />
            </LoadingOverlay>
            <StyledDiv isScrolled={isScrolled}>
                {showConfetti && (
                    <ConfettiContainer isVisible={confettiVisible}>
                        <Confetti />
                    </ConfettiContainer>
                )}
                <Link to="/" aria-label="Home">
                    <picture>
                        <source media="(max-width: 480px)" srcSet="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" />
                        <source media="(max-width: 768px)" srcSet="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" />
                        <source media="(min-width: 769px)" srcSet="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" />
                        <img src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" alt="Logo da Empresa" style={{ maxHeight: '40px' }} />
                    </picture>
                </Link>
                <StyledHeader>
                    {/* <StyledLink to="/" isActive={location.pathname === "/"}><IconContainer isVisible={location.pathname === "/"}><FaHome /></IconContainer>Início</StyledLink> */}
                    <StyledLink to="/pacotes" isActive={location.pathname === "/pacotes"}><IconContainer isVisible={location.pathname === "/pacotes"}><CiCalendarDate /></IconContainer>Pacotes</StyledLink>
                    <StyledLink to="/serra" variant="serra" isActive={location.pathname === "/serra"}><IconContainer isVisible={location.pathname === "/serra"}><FaMountainSun /></IconContainer>Le Ange Serra</StyledLink>
                    <StyledLink to="/mar" variant="mar" isActive={location.pathname === "/mar"}><IconContainer isVisible={location.pathname === "/mar"}><FaAnchor /></IconContainer>Le Ange Mar</StyledLink>
                    <div>
                        <RedirectSelect />
                    </div>
                    <StyledLink to="/sobre" isActive={location.pathname === "/sobre"}><IconContainer isVisible={location.pathname === "/sobre"}><FaInfoCircle /></IconContainer>Sobre nós</StyledLink>
                    {/* <Select onChange={handleNavigation} value={selectedValue}>
                        <option disabled value="">
                            Acomodações
                        </option>
                        <option value="/acomodaSerra">Suítes Serra</option>
                        <option value="/acomodaMar">Suítes Mar</option>
                    </Select> */}
                    {/* <StyledLink to="/acomodaMar" isActive={location.pathname === "/acomodaMar"}><IconContainer isVisible={location.pathname === "/acomodaMar"}><FaBed /></IconContainer>Acomodações</StyledLink> */}
                </StyledHeader>
                <Button
                    idBtn="clickwpp"
                    onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                    text="Fazer minha reserva"
                />
            </StyledDiv>

            <MobileBar isScrolled={isScrolled}>
                <img onClick={() => navigate('/')} src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" alt='logo da le ange' />
                <button onClick={toggleSidebar} isClicked={isClicked}>
                    Menu
                    <HiBars3BottomRight />
                </button>
            </MobileBar>

            <Sidebar isOpen={isSidebarOpen}>
                <button onClick={closeSidebar}>X</button>
                <img onClick={() => navigate('/')} src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public" alt='logo da le ange' />
                <div>
                    <StyledLink to="/" isActive={location.pathname === "/"} onClick={closeSidebar}>
                        <IconContainer isVisible={location.pathname === "/"}><FaHome /></IconContainer>Início
                    </StyledLink>
                    <StyledLink to="/pacotes" isActive={location.pathname === "/pacotes"} onClick={closeSidebar}>
                        <IconContainer isVisible={location.pathname === "/pacotes"}><CiCalendarDate /></IconContainer>Pacotes
                    </StyledLink>
                    <StyledLink to="/serra" variant="serra" isActive={location.pathname === "/serra"} onClick={closeSidebar}>
                        <IconContainer isVisible={location.pathname === "/serra"}><FaMountain /></IconContainer>Le Ange Serra
                    </StyledLink>
                    <StyledLink to="/mar" variant="mar" isActive={location.pathname === "/mar"} onClick={closeSidebar}>
                        <IconContainer isVisible={location.pathname === "/mar"}><FaAnchor /></IconContainer>Le Ange Mar
                    </StyledLink>
                    <div>
                        <RedirectSelect />
                    </div>
                    <StyledLink to="/sobre" isActive={location.pathname === "/sobre"} onClick={closeSidebar}>
                        <IconContainer isVisible={location.pathname === "/sobre"}><FaInfoCircle /></IconContainer>Sobre nós
                    </StyledLink>
                </div>
                <Button
                    idBtn="clickwpp"
                    text="Fazer minha reserva"
                    onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
                />
            </Sidebar>
        </>
    );
}

export default NavegationBar;
