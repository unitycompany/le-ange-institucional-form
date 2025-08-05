import React, { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ButtonAcomoda from './button2';
import 'aos/dist/aos.css';

const SwiperStyles = createGlobalStyle`
  .swiper-button-next, .swiper-button-prev {
      color: white; 
      background-color: black;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      
      &:hover {
          background-color: white;
          color: black;
          transform: scale(1.05);
      }
  }
  .swiper-pagination-bullet {
      background: black;
      opacity: 0.7;
      &.swiper-pagination-bullet-active {
          background: #A5C933;
      }
  }
`;

const waterWave = keyframes`
  0% { border-radius: 30px 20px 0 0; }
  100% { border-radius: 20px 30px 0 0; }
`;

const BorderOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(0deg, rgba(255, 255, 255, 1 ), rgba(0, 0, 0, 0)); 
    pointer-events: none;
    animation: ${waterWave} 5s ease-in-out infinite;
    z-index: 1;

    @media (max-width: 768px){
        border-radius: 20px 0 20px 0;
        animation: none;
    }
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 650px;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0; /* Placeholder background */
  animation: ${waterWave} 5s ease-in-out infinite;
  transition: all .3s ease-in-out;
  
  @media (max-width: 768px){
    animation: none!important;
    border-radius: 20px 0 20px 0;
    height: 80vh;
    width: 100%;
  }
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 20px;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;

  @media (max-width: 768px){
    display: flex;
    flex-direction: column;
    gap: 7px;
    width: 90%;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  font-family: var(--font--comfortaa);

  @media (max-width: 768px){
    font-family: var(--font--comfortaa);
    font-size: 1.4rem;
    font-weight: 800;
  }
`;

const Subtitle = styled.p`
  font-size: 13px;
  margin: 0px 0;
  font-weight: 200;
  opacity: 0.8;
  font-family: var(--font--comfortaa);

  @media (max-width: 768px){
    font-size: 12px;
    font-weight: 200;
    width: 80%;
    line-height: 100%;
    font-family: var(--font--comfortaa);
    margin: 0;
  }
`;

const Features = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;

  @media (max-width: 768px){
    gap: 6px;
  }

  span {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(0, 0, 0, 0.5);
      padding: 4px 8px;
      border-radius: 5px 0 5px 0;
      font-size: 10px;
      font-family: var(--font--comfortaa);
      transition: all .2s ease;

      @media (max-width: 768px){
        font-size: 10px;
        padding: 5px 8px;
        border-radius: 6px;
      }

      &:hover {
          color: black;
          background-color: white;
      }
  }

  svg {
      font-size: 12px;

      @media (max-width: 768px){
        font-size: 12px;
      }
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  
`;

const SliderAcomodaHome = ({
  content = [],
  spaceBetween = 10,
  autoplayDelay = 3000,
  showPagination = true,
  showNavigation = true,
}) => {
  const navigate = useNavigate();
  const [loadedImages, setLoadedImages] = useState(new Set([0, 1, 2])); // Carrega as 3 primeiras por padrão
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback((swiper) => {
    const currentIndex = swiper.realIndex;
    const nextIndex = (currentIndex + 1) % content.length;
    const prevIndex = currentIndex === 0 ? content.length - 1 : currentIndex - 1;

    // Carrega a imagem atual e as adjacentes silenciosamente
    setLoadedImages(prev => new Set([...prev, currentIndex, nextIndex, prevIndex]));
  }, [content.length]);

  // Preload das imagens de forma assíncrona
  const preloadImage = useCallback((src, index) => {
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, index]));
    };
    img.src = src;
  }, []);

  return (
    <SliderWrapper>
      <SwiperStyles />
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={showNavigation}
        pagination={false}
        spaceBetween={spaceBetween}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Preload das primeiras imagens de forma assíncrona
          setTimeout(() => {
            content.forEach((item, index) => {
              if (index < 3) { // Carrega as 3 primeiras imediatamente
                preloadImage(item.backgroundImage, index);
              }
            });
          }, 100);
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
      >
        {content.map((item, index) => (
          <SwiperSlide key={index}>
            <BorderOverlay />
            <SlideContainer
              style={{
                backgroundImage: `url(${item.backgroundImage})`
              }}
            >
              {/* Preload silencioso das imagens adjacentes */}
              {!loadedImages.has(index) && (
                <img
                  src={item.backgroundImage}
                  alt={item.title}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                    pointerEvents: 'none'
                  }}
                  loading="lazy"
                  onLoad={() => preloadImage(item.backgroundImage, index)}
                />
              )}
              <SlideContent data-aos="fade-down" data-aos-delay="100">
                <Title>{item.title}</Title>
                <Subtitle>{item.subtitle}</Subtitle>
                <Features>
                  {item.features.map((feature, idx) => (
                    <span key={idx}>
                      {feature.icon} {feature.text}
                    </span>
                  ))}
                </Features>
                <ButtonAcomoda
                  idBtn="conhecerAcomodacao"
                  onClick={() => {
                    const [location, suiteNumber] = item.id.split('#suite');
                    const routeMap = {
                      'Serra': '/acomodaSerra',
                      'Mar': '/acomodaMar'
                    };
                    const route = routeMap[location] || '/acomodaSerra';
                    navigate(`${route}#suite${suiteNumber}`);
                  }}
                  text="Conhecer essa acomodação"
                  suiteId={item.id}
                />
              </SlideContent>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderWrapper>
  );
};

export default SliderAcomodaHome;
