import React, { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styled, { keyframes } from 'styled-components';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import IconButton from './button4';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { sortByChrono } from '../utils/dateSort';

// Importação dos ícones necessários
import { FaUtensils, FaRegCreditCard, FaPaw, FaCheck } from 'react-icons/fa';

// Mapeamento de strings para componentes de ícones
const iconMap = {
  '<FaUtensils />': <FaUtensils />,
  '<FaRegCreditCard />': <FaRegCreditCard />,
  '<FaPaw />': <FaPaw />,
  '<FaCheck />': <FaCheck />,
};

const waterWave2 = keyframes`
  0% {
    border-radius: 15px 20px 20px 15px;
  }
  100% {
    border-radius: 20px 15px 15px 20px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  padding: 4px;
  background: #00000005;
  border: 1px dashed #00000020;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  animation: ${waterWave2} 5s ease-in-out infinite;
  

  @media (max-width: 768px) {
    padding: 4px;
    border-radius: 15px;
    animation: none;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 40vh!important;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: #f0f0f0; /* Placeholder background */
  transition: opacity 0.3s ease-in-out;

  @media (max-width: 768px) {
    border: 2px solid var(--color--black);
    height: 320px;
  }

  /* Loading state */
  &.loading {
    opacity: 0.3;
    background-image: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #e0e0e0 50%,
      #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const CardContent = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #333;
`;

const Title = styled.h3`
  font-size: 22px;
  color: #000;
  line-height: 100%;
  font-weight: 500;
  font-family: var(--font--comfortaa);
  margin: 0;

  &:hover {
    animation-duration: 1.5s;
  }
`;

const DateRange = styled.p`
  font-size: 14px;
  color: #777;
  font-family: var(--font--comfortaa);
  font-weight: 100;
  margin: 0;
`;

const Features = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--color--black);

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    background: #00000008;
    font-family: var(--font--comfortaa);
    padding: 5px 8px;
    border-radius: 8px;
    font-size: 9px;
  }
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
`;

const Price = styled.p`
  font-size: 18px;
  font-family: var(--font--comfortaa);
  font-weight: 500;
  margin: 0;
  color: #333;

  & > span {
    font-size: 10px;
  }
`;

const EventCardCarousel = ({ events = [] }) => {
  const sortedEvents = sortByChrono(events, (event) => event?.dateRange ?? event?.date ?? event?.data);
  const [loadedImages, setLoadedImages] = useState(new Set([0, 1, 2])); // Carrega as 3 primeiras por padrão
  const swiperRef = useRef(null);

  const handleSlideChange = useCallback((swiper) => {
    const currentIndex = swiper.realIndex;
    const nextIndex = (currentIndex + 1) % sortedEvents.length;
    const prevIndex = currentIndex === 0 ? sortedEvents.length - 1 : currentIndex - 1;

    // Carrega a imagem atual e as adjacentes silenciosamente
    setLoadedImages(prev => new Set([...prev, currentIndex, nextIndex, prevIndex]));
  }, [sortedEvents.length]);

  // Preload das imagens de forma assíncrona
  const preloadImage = useCallback((src, index) => {
    const img = new Image();
    img.onload = () => {
      setLoadedImages(prev => new Set([...prev, index]));
    };
    img.src = src;
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 7000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      spaceBetween={20}
      navigation
      pagination={false}
      loop={true}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
        // Preload das primeiras imagens de forma assíncrona
        setTimeout(() => {
          sortedEvents.forEach((event, index) => {
            if (index < 3) { // Carrega as 3 primeiras imediatamente
              preloadImage(event.image, index);
            }
          });
        }, 100);
      }}
      breakpoints={{
        1024: { slidesPerView: 3, spaceBetween: 20 }, // Exibe 3 cards em telas maiores
        768: { slidesPerView: 2, spaceBetween: 15 }, // Exibe 2 cards em tablets
        0: { slidesPerView: 1, spaceBetween: 0 }, // Exibe 1 card no mobile
      }}
    >
      {sortedEvents.map((event, index) => (
        <SwiperSlide key={event.id ?? index}>
          <CardContainer data-aos="fade-up" data-aos-delay="0">
            <CardImage
              src={event.image}
              alt={event.title}
              className={loadedImages.has(index) ? '' : 'loading'}
              data-aos="fade-up"
              data-aos-delay="100"
              onLoad={() => preloadImage(event.image, index)}
            />
            {/* Preload silencioso das imagens adjacentes */}
            {!loadedImages.has(index) && (
              <img
                src={event.image}
                alt={event.title}
                style={{
                  position: 'absolute',
                  opacity: 0,
                  width: '1px',
                  height: '1px',
                  pointerEvents: 'none'
                }}
                loading="lazy"
                onLoad={() => preloadImage(event.image, index)}
              />
            )}
            <CardContent>
              <Title data-aos="fade-up" data-aos-delay="200">{event.title}</Title>
              <DateRange data-aos="fade-down" data-aos-delay="250">{event.dateRange}</DateRange>
              <Features data-aos="fade-up" data-aos-delay="300">
                {event.features.map((feature, i) => (
                  <span key={i} data-aos="fade-up" data-aos-delay="400">
                    {iconMap[feature.icon] || feature.icon} {feature.text}
                  </span>
                ))}
              </Features>
              <PriceSection>
                <Price data-aos="fade-in" data-aos-delay="500">A partir de: <span>{event.payment}</span>R${event.price}</Price>
              </PriceSection>
              <IconButton
                idBtn="clickwpp"
                text="Saber mais sobre o pacote"
                text2="Clique e veja!"
                borderColor="var(--color--black)"
                textColor="var(--color--black)"
                hoverColor="var(--color--black)"
                hoverTextColor="var(--color--white)"
                onClick={() => window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank")}
              />
            </CardContent>
          </CardContainer>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


export default EventCardCarousel;
