import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaCalendarCheck, FaTriangleExclamation } from 'react-icons/fa6';
import { redirectToBookingEngine } from '../utils/bookingRedirect';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const riseUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background:
    radial-gradient(circle at 20% 20%, rgba(122, 196, 243, 0.22), transparent 48%),
    radial-gradient(circle at 80% 85%, rgba(202, 215, 102, 0.22), transparent 50%),
    rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  z-index: 99999;
  animation: ${fadeIn} 0.2s ease-out;
`;

const Card = styled.div`
  width: min(560px, 100%);
  border-radius: 18px;
  border: 1px solid rgba(122, 196, 243, 0.35);
  background: linear-gradient(165deg, #fbfbfb 0%, #f4f8fb 100%);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.24);
  padding: 28px;
  animation: ${riseUp} 0.25s ease-out;

  @media (max-width: 768px) {
    padding: 22px;
    border-radius: 14px;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font--comfortaa);
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #1f4c6b;
  background-color: rgba(122, 196, 243, 0.24);
  border-radius: 999px;
  padding: 8px 12px;
  margin-bottom: 14px;
`;

const Title = styled.h2`
  font-family: var(--font--avenir);
  color: #1d2f3a;
  font-size: clamp(1.3rem, 2.3vw, 1.8rem);
  line-height: 1.2;
  margin: 0 0 10px;
`;

const Description = styled.p`
  margin: 0;
  color: #394754;
  font-family: var(--font--comfortaa);
  font-size: 0.96rem;
  line-height: 1.6;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
`;

const PrimaryButton = styled.button`
  border: none;
  border-radius: 12px;
  padding: 12px 18px;
  font-family: var(--font--comfortaa);
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f2411;
  background: linear-gradient(115deg, var(--color--green) 0%, #dce887 100%);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 24px rgba(151, 153, 87, 0.35);
  }
`;

const SecondaryButton = styled.button`
  border: 1px solid rgba(29, 47, 58, 0.2);
  border-radius: 12px;
  padding: 12px 16px;
  font-family: var(--font--comfortaa);
  font-size: 0.9rem;
  color: #273641;
  background-color: rgba(255, 255, 255, 0.72);
  cursor: pointer;
  transition: border-color 0.2s ease, background-color 0.2s ease;

  &:hover {
    border-color: rgba(29, 47, 58, 0.45);
    background-color: rgba(255, 255, 255, 0.95);
  }
`;

const EmergencyBookingPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleReserveNow = () => {
        redirectToBookingEngine({ target: '_self' });
    };

    return (
        <Overlay onClick={onClose}>
            <Card
                role="dialog"
                aria-modal="true"
                aria-labelledby="emergency-booking-title"
                onClick={(event) => event.stopPropagation()}
            >
                <Badge>
                    <FaTriangleExclamation />
                    Aviso Importante
                </Badge>

                <Title id="emergency-booking-title">WhatsApp temporariamente indisponivel</Title>

                <Description>
                    Nosso WhatsApp está com instabilidade no momento e nossa equipe já está resolvendo.
                    Para não perder disponibilidade, você pode reservar agora mesmo direto pelo site.
                </Description>

                <Actions>
                    <PrimaryButton type="button" onClick={handleReserveNow}>
                        <FaCalendarCheck />
                        Reservar Agora
                    </PrimaryButton>
                    <SecondaryButton type="button" onClick={onClose}>
                        Entendi
                    </SecondaryButton>
                </Actions>
            </Card>
        </Overlay>
    );
};

export default EmergencyBookingPopup;