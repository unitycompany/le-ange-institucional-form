import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import CardPacote from "../../components/cards/cardPacote";
import Footer from "../../components/footer";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet";
import SchemaMarkup from "../../components/SchemaMarkup";
import { sortByChrono } from "../../utils/dateSort";

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  left: 50%;
  top: 15vh;
  margin-bottom: 20vh;
  transform: translateX(-50%);
  position: relative;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  align-items: center;
  justify-content: space-between;
`;

const PacotesSection = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0 5% 5% 5%;
  gap: 20px;
`;

const PacotesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > div {
    & > h1 {
      font-size: 38px;
      font-weight: 800;
      font-family: var(--font--comfortaa);
      background: linear-gradient(90deg, var(--color--green), var(--color--blue));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      padding-bottom: 15px;

      @media (max-width: 768px) {
            font-size: 26px;
            padding-bottom: 15px;
        }
    }

    & > p {
      font-size: 16px;
      color: var(--color--black);
      font-family: var(--font--comfortaa);
      font-weight: 300;
      margin-bottom: 20px;
      
    }
  }
`;

const SwiperContainer = styled.div`
  width: 100%;
  height: auto;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  padding-top: 30px;

  & > div {
    width: 90%;
  }
`;

const Pacotes = () => {
  const [pacotes, setPacotes] = useState([]);

  useEffect(() => {
    const fetchPacotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pacotes"));
        const pacotesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPacotes(pacotesData);
      } catch (error) {
        console.error("❌ Erro ao buscar pacotes:", error);
      }
    };

    fetchPacotes();
  }, []);

  const categorias = [
    { key: "Programações Especiais", titulo: "Aproveite nossas noites especiais" },
    { key: "Feriados", titulo: "Venha aproveitar o feriado conosco" },
    { key: "Promoções", titulo: "Aproveite nossas promoções" }
  ];
  return (
    <>
      <Helmet>
        <title>Pacotes - Pousada Le Ange</title>
      </Helmet>
      <SchemaMarkup pageType="pacotes" />

      <Container>
        {categorias.map((categoria) => {
          const pacotesFiltrados = pacotes.filter((pacote) =>
            Array.isArray(pacote.categorias)
              ? pacote.categorias.includes(categoria.key)
              : pacote.categorias === categoria.key
          );

          const pacotesOrdenados = sortByChrono(pacotesFiltrados, (pacote) =>
            pacote?.datas ??
            pacote?.dateRange ??
            pacote?.data ??
            pacote?.date ??
            pacote?.periodo ??
            pacote?.inicio ??
            pacote?.startDate ??
            pacote?.dataInicio ??
            pacote?.data_inicial
          );

          // Se não há pacotes para esta categoria, não renderiza nada
          if (pacotesOrdenados.length === 0) {
            return null;
          }

          return (
            <PacotesSection key={categoria.key}>
              <PacotesDiv>
                <div>
                  <h1>{categoria.titulo}</h1>
                  <p>
                    Pacotes exclusivos para {categoria.key.toLowerCase()}! Reserve
                    agora e aproveite condições especiais.
                  </p>
                </div>
              </PacotesDiv>

              <SwiperContainer>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  modules={[Autoplay, Navigation]}
                  breakpoints={{
                    1280: { slidesPerView: 3, spaceBetween: 30 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    768: { slidesPerView: 1, spaceBetween: 15 },
                    480: { slidesPerView: 1, spaceBetween: 10 },
                  }}
                >
                  {pacotesOrdenados.map((pacote) => (
                    <StyledSwiperSlide key={pacote.id}>
                      <CardPacote pacote={pacote} />
                    </StyledSwiperSlide>
                  ))}
                </Swiper>
              </SwiperContainer>
            </PacotesSection>
          );
        })}
      </Container>
      <Footer />
    </>
  );
};

export default Pacotes;
