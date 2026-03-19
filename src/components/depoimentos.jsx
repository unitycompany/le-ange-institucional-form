import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import styled from "styled-components";
import CustomButton from "./button3";
import 'aos/dist/aos.css';

const StyledTextDepoimentos = styled.section`
    width: 100%;
    margin-top: 5vh;
    display: flex;
    padding: 0 5%;
    justify-content: center;
    align-items: center;
    height: 12vh;
    
    @media (max-width: 768px){
        height: 10vh;
        align-items: center;
        margin-top: 2.5vh;
    }

    & > h1 {
        font-size: 2rem;
        font-family: var(--font--comfortaa);
        font-weight: 100;
        text-align: center;
        width: 100%;
        
        @media (max-width: 768px){
            font-size: 1.6rem;
        }
    }
`;

const CarouselContainer = styled.div`
    display: flex;
    width: 100%;
    max-width: 1280px;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    position: relative;
    justify-content: space-between;
    align-items: center;
    height: auto;
    

    @media (max-width: 768px){
        height: auto;
        padding: 0 5%;
    }
`;

const Container = styled.div`
    width: 95%; 
    height: 600px; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 10px;
    border-radius: 15px 0 15px 0; 
    position: relative; 
    overflow: hidden; 

    @media (max-width: 768px){
        width: 100%;
        margin: 0;
        height: 65vh;
        border: 1px solid transparent;
    }
`;

const DepoimentoText = styled.p`
    font-size: .6rem;
    border-radius: 0 10px 0 10px;
    position: absolute;
    bottom: 72%;
    left: -60px;
    transform: rotate(270deg);
    padding: 5px 25px;
    margin: 10px 0; 
    color: var(--color--white);
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
    z-index: 1; 
    font-family: var(--font--comfortaa);
    font-weight: 100;

    @media (max-width: 768px){
        font-size: .7rem;
        text-align: center;
        width: 60%;
        display: inline-block;
        left: -75px;
        bottom: 72.5%;
        width: 55%;
    }
`;

const CarrosselDepoimentos = ({ data }) => {
  return (
    <>
      <StyledTextDepoimentos>
        <h1>Palavra do Hóspede</h1>
      </StyledTextDepoimentos>

      <CarouselContainer>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          loop={true}
          grabCursor={true}
          autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            1024: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {data.map((depoimento) => (
            <SwiperSlide key={depoimento.id}>
              <Container data-aos="fade-up" data-aos-delay="200">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  loop={true}
                  style={{ width: '100%', height: '100%' }}
                  autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => e.stopPropagation()}
                >
                  {depoimento.bgImages.map((bgImage, index) => (
                    <SwiperSlide key={index}>
                      <div
                        style={{
                          backgroundImage: `url(${bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          width: '100%',
                          height: '100%',
                          borderRadius: '25px 0 25px 0'
                        }}
                        loading="lazy"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <DepoimentoText>{depoimento.text}</DepoimentoText>
              </Container>
            </SwiperSlide>
          ))}
        </Swiper>
      </CarouselContainer>

      <StyledTextDepoimentos>
        <CustomButton 
          idBtn="clickwpp"
          text="Reservar agora!"
          textColor="var(--color--black)"
          backgroundColor="transparent"
          borderColor="var(--color--black)"
          iconColor="var(--color--black)"
          hoverBackgroundColor="var(--color--black)"
          hoverBorderColor="var(--color--black)"
          hoverColor="var(--color--white)"
          hoverIconColor="var(--color--white)"
          onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
        />
      </StyledTextDepoimentos>
    </>
  );
};

export default CarrosselDepoimentos;

