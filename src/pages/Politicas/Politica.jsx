import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../../components/footer';

const BREAKPOINT_MOBILE = 768;

/* Container global */
const All = styled.section`
  width: 100%;
  min-height: 100vh;
  background-color: #f9f9f9;
  margin: 0;
  padding: 0;
  font-family: var(--font--comfortaa);
`;

/**
 * Cabeçalho fixo:
 * - No topo da página (scrollY === 0):
 *   -> Desktop: 500px 
 *   -> Mobile: 250px
 *   -> z-index = 2
 * - Ao rolar a página (scrollY > 0):
 *   -> Desktop: 350px 
 *   -> Mobile: 175px
 *   -> z-index = 999
 */
const Topo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => props.height}px;
  background: #f1f1f180;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 5%;
  gap: 20px;
  transition: height 0.4s ease;
  z-index: ${(props) => props.zIndex};

  /* Imagem e título */
  & > img {
    width: 100px;
    @media (max-width: ${BREAKPOINT_MOBILE}px) {
      width: 70px;
    }
  }

  & > h1 {
    font-size: 3rem;
    color: #333;
    font-weight: 500;
    margin: 0;
    @media (max-width: ${BREAKPOINT_MOBILE}px) {
      font-size: 2rem;
    }
  }
`;

/* Contêiner principal com margem para não ficar escondido atrás do cabeçalho */
const ContentContainer = styled.div`
  max-width: 1280px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 350px;
  padding: 5% 5%;
  background-color: #ffffff;
  border-radius: 8px;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    margin-top: 280px;
    padding: 3% 5%;
  }
`;

/* Títulos e parágrafos */
const Title = styled.h2`
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color--blue);
  font-size: 1.8rem;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    font-size: 1.4rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  color: var(--color--black);
  line-height: 1.6;
  font-size: 1rem;

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    font-size: 0.95rem;
  }
`;

/* Wrapper de tabela com scroll horizontal no mobile */
const TableWrapper = styled.div`
  margin: 2rem 0;
  position: relative;
  overflow-x: auto; 
  
  &::after {
    content: 'Arraste para o lado →';
    position: absolute;
    top: -20px;
    right: 10px;
    background: #f1f1f150;
    backdrop-filter: blur(1px);
    color: #666;
    padding: 0.3rem 0.6rem;
    font-size: 0.55rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    pointer-events: none;
    opacity: 0.9;

    @media (min-width: ${BREAKPOINT_MOBILE + 1}px) {
      display: none;
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  thead {
    background-color: #f1f1f1;
  }

  th,
  td {
    padding: 1rem;
    border: 1px solid #ddd;
    text-align: left;
    vertical-align: middle;
  }

  th {
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  @media (max-width: ${BREAKPOINT_MOBILE}px) {
    display: block;
    white-space: nowrap;
    font-size: 0.9rem;
  }
`;

const PoliticaDePrivacidade = () => {
  const [headerHeight, setHeaderHeight] = useState(500); // Cabeçalho "cheio" no Desktop
  const [topoZIndex, setTopoZIndex] = useState(2);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= BREAKPOINT_MOBILE;
      if (window.scrollY === 0) {
        // No topo: cabeçalho maior
        setHeaderHeight(isMobile ? 250 : 350);
        setTopoZIndex(2);
      } else {
        // Ao rolar: cabeçalho reduzido
        setHeaderHeight(isMobile ? 175 : 250);
        setTopoZIndex(999);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <All>
      <Topo height={headerHeight} zIndex={topoZIndex}>
        <img
          src="https://imagedelivery.net/1n9Gwvykoj9c9m8C_4GsGA/d3fbafba-3dfe-4924-e857-b45059def500/public"
          alt="logo da le ange"
          loading="lazy"
        />
        <h1>Política de Privacidade</h1>
      </Topo>

      <ContentContainer>
        <Paragraph>
          Bem-vindo(a) à nossa <strong>Política de Privacidade</strong>. Este documento explica como coletamos, usamos e protegemos as suas informações pessoais, sempre em conformidade com a legislação vigente. Nosso compromisso é oferecer transparência e segurança em cada etapa do tratamento dos seus dados.
        </Paragraph>

        <Title>1. Definições e Escopo</Title>
        <Paragraph>
          <strong>Informações Pessoais:</strong> dados que podem identificar você, como nome, e-mail, CPF e endereço.
          <br />
          <strong>Usuário:</strong> pessoa que utiliza nossos serviços.
          <br />
          <strong>Controlador:</strong> entidade que define as finalidades e meios para o tratamento das informações.
          <br />
          <strong>Operador:</strong> prestador de serviços que realiza o tratamento dos dados em nome do controlador.
        </Paragraph>

        <Title>2. Coleta e Uso das Informações</Title>
        <Paragraph>
          Coletamos as informações que você nos fornece ao se cadastrar, solicitar serviços ou entrar em contato. Também obtemos dados automaticamente, como cookies, endereço IP e dados de navegação, para aprimorar a sua experiência e oferecer conteúdos personalizados.
        </Paragraph>

        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Tipo de Informação</th>
                <th>Exemplo</th>
                <th>Finalidade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identificação</td>
                <td>Nome, CPF, RG</td>
                <td>Cadastro e validação de identidade</td>
              </tr>
              <tr>
                <td>Contato</td>
                <td>E-mail, Telefone</td>
                <td>Comunicação e suporte</td>
              </tr>
              <tr>
                <td>Navegação</td>
                <td>Cookies, IP, Sessão</td>
                <td>Análise de uso e melhoria contínua</td>
              </tr>
            </tbody>
          </StyledTable>
        </TableWrapper>

        <Title>3. Compartilhamento e Divulgação</Title>
        <Paragraph>
          As suas informações pessoais não são comercializadas. Compartilhamos seus dados apenas nos seguintes casos:
        </Paragraph>
        <ul>
          <li>
            <strong>Parceiros de Serviço:</strong> empresas que auxiliam na prestação de nossos serviços, sempre sob rigorosas cláusulas de confidencialidade.
          </li>
          <li>
            <strong>Obrigação Legal:</strong> em atendimento a requisições judiciais ou normativas legais.
          </li>
          <li>
            <strong>Consentimento:</strong> quando você autoriza explicitamente o compartilhamento para finalidades específicas.
          </li>
        </ul>

        <Title>4. Segurança das Informações</Title>
        <Paragraph>
          Empregamos medidas técnicas, administrativas e físicas para garantir a proteção dos seus dados. Confira alguns exemplos de nossas práticas:
        </Paragraph>
        <TableWrapper>
          <StyledTable>
            <thead>
              <tr>
                <th>Medida de Segurança</th>
                <th>Descrição</th>
                <th>Benefício</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Criptografia</td>
                <td>Proteção dos dados sensíveis durante armazenamento e transmissão.</td>
                <td>Reduz o risco de acessos não autorizados.</td>
              </tr>
              <tr>
                <td>Controle de Acesso</td>
                <td>Restrição de acesso às informações somente a colaboradores autorizados.</td>
                <td>Minimiza a possibilidade de vazamento de dados.</td>
              </tr>
              <tr>
                <td>Backup Regular</td>
                <td>Cópias de segurança realizadas periodicamente.</td>
                <td>Assegura a integridade e a disponibilidade dos dados.</td>
              </tr>
            </tbody>
          </StyledTable>
        </TableWrapper>

        <Title>5. Direitos dos Usuários</Title>
        <Paragraph>
          Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão das suas informações pessoais. Para exercer esses direitos, entre em contato conosco:
        </Paragraph>
        <ul>
          <li>
            Email: <em>pousadaleange@gmail.com</em>
          </li>
          <li>
            Telefone: <em>(21) 99423-0871</em>
          </li>
        </ul>

        <Title>6. Uso de Cookies e Tecnologias Similares</Title>
        <Paragraph>
          Utilizamos cookies e outras tecnologias para personalizar sua experiência, analisar o tráfego do site e oferecer conteúdos relevantes. Você pode gerenciar as suas preferências através das configurações do seu navegador.
        </Paragraph>

        <Title>7. Alterações na Política</Title>
        <Paragraph>
          Esta Política de Privacidade pode ser atualizada periodicamente para refletir melhorias em nossos processos ou mudanças na legislação. Alterações significativas serão comunicadas através de nossos canais oficiais.
        </Paragraph>

        <Paragraph>
          Em caso de dúvidas ou para obter mais informações, entre em contato. Estamos comprometidos com a proteção e a privacidade das suas informações.
        </Paragraph>

        <Paragraph>
          <em>Última atualização: 01 de Janeiro de 2025</em>
        </Paragraph>
      </ContentContainer>

      <Footer />
    </All>
  );
};

export default PoliticaDePrivacidade;
