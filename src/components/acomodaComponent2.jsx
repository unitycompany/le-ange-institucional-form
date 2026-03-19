import React, { useEffect } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from "./button";

const StyledAcomodaContainer = styled.section`
    width: 100%;
    max-width: 1280px;
    left: 50%;
    transform: translateX(-50%);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5% 0%;
    background-color: #ffffff;
    background-size: cover;
    background-position: center;
    margin-bottom: 50px;

    @media (max-width: 768px) {
        padding: 5% 2.5%;
    }

    & > main {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 5%;

        @media (max-width: 768px) {
            padding: 0 2.5%;
        }
    }
`;

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

const StyledSlide = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    overflow: hidden;
    border-radius: 15px 30px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 15px 30px;
        transition: all 0.5s ease-in-out;

        &:hover {
            transform: scale(1.1) rotate(3deg);
            filter: contrast(110%);
        }
    }

    span {
        position: absolute;
        bottom: 15px;
        left: 20px;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(2px);
        color: white;
        padding: 10px;
        font-size: 0.9rem;
        border-radius: 5px;
        transition: all 0.2s ease;
        font-family: var(--font--comfortaa);
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &:hover span {
        background: rgba(255, 255, 255, 0.9);
        color: black;
        transform: scale(0.95);
    }
`;

const AcomodaComponent2 = ({ images }) => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: false });
        AOS.refresh();
    }, []);

    return (
        <StyledAcomodaContainer>
            <StyledAcomodaTexts>
                <div>
                    <h1 data-aos="fade-up" data-aos-delay="100">Conheça as suítes da Le Ange Mar</h1>
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
            <main data-aos="zoom-in-up" data-aos-delay="400">
                <Swiper
                    modules={[Autoplay, Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={false}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    breakpoints={{
                        768: {
                            slidesPerView: 1
                        },
                        1024: {
                            slidesPerView: 3
                        },
                        1280: {
                            slidesPerView: 3
                        }
                        
                    }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <StyledSlide>
                                <img src={image.src} alt={`Imagem ${index + 1}`} />
                                <span onClick={() => window.location.href = `/acomodaMar#suite${index + 1}`}>
                                    {image.text} <FaArrowRight />
                                </span>
                            </StyledSlide>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </StyledAcomodaContainer>
    );
};

export default AcomodaComponent2;
