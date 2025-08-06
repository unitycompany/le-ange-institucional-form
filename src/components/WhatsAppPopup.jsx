import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(3px);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const PopupContainer = styled.div`
  background: white;
  border-radius: 8px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease;
  border: 1px solid #e5e5e5;

  @keyframes slideUp {
    from { 
      transform: translateY(30px);
      opacity: 0;
    }
    to { 
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    margin: 20px;
    width: calc(100% - 40px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #333;
  }
`;

const PopupHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;

  h2 {
    color: #333;
    font-family: var(--font--comfortaa);
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  p {
    color: #666;
    font-weight: 300;
    font-size: 14px;
    line-height: 1.4;
    margin: 0;
    font-family: var(--font--comfortaa);

    @media (max-width: 768px) {
      font-size: 13px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-family: var(--font--comfortaa);
  font-weight: 400;
  color: #333;
  font-size: 13px;
`;

const PhoneInput = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 200;
  font-family: var(--font--comfortaa);
  transition: all 0.2s ease;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #25d366;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 8px 0;
`;

const CheckboxInput = styled.input`
  width: 16px;
  height: 16px;
  margin-top: 1px;
  cursor: pointer;
  accent-color: var(--color--green);
`;

const CheckboxLabel = styled.label`
  font-size: 12px;
  color: #555;
  line-height: 1.4;
  cursor: pointer;
  flex: 1;
  font-family: var(--font--comfortaa);

  a {
    color: var(--color--green);
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const SubmitButton = styled.button`
  background: #25d366;
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 8px;
  font-family: var(--font--comfortaa);
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover:not(:disabled) {
    background: #22c55e;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 12px 18px;
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 12px;
  margin: 4px 0 0 0;
  font-weight: 500;
  font-family: var(--font--comfortaa);
`;

const WhatsAppPopup = ({ isOpen, onClose, originalWhatsAppUrl }) => {
  const [phone, setPhone] = useState('');
  const [lgpdAccepted, setLgpdAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formatação do telefone brasileiro padrão (XX) XXXXX-XXXX
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length === 0) return '';
    if (limitedNumbers.length <= 2) return `(${limitedNumbers})`;
    if (limitedNumbers.length <= 7) return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);

    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const validatePhone = (phoneNumber) => {
    const numbers = phoneNumber.replace(/\D/g, '');

    if (numbers.length !== 11) {
      return 'Telefone deve ter 11 dígitos (DDD + número)';
    }

    const ddd = parseInt(numbers.slice(0, 2));
    if (ddd < 11 || ddd > 99) {
      return 'DDD inválido';
    }

    if (numbers[2] !== '9') {
      return 'Número deve ser de celular (começar com 9)';
    }

    return null;
  };

  // Função para capturar UTMs da URL
  const getUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get('utm_source') || 'organico',
      utm_medium: urlParams.get('utm_medium') || null,
      utm_campaign: urlParams.get('utm_campaign') || null,
      utm_term: urlParams.get('utm_term') || null,
      utm_content: urlParams.get('utm_content') || null,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = {};

    const phoneError = validatePhone(phone);
    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phoneError) {
      newErrors.phone = phoneError;
    }

    if (!lgpdAccepted) {
      newErrors.lgpd = 'Você deve aceitar os termos de privacidade';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      const utmParams = getUTMParams();

      // Converter telefone para formato internacional: 5521999181950
      const phoneNumbers = phone.replace(/\D/g, '');
      const internationalPhone = `55${phoneNumbers}`;

      // Criar timestamp no horário de São Paulo em formato brasileiro
      const now = new Date();
      const saoPauloTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      const timestamp = saoPauloTime.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });

      const formData = {
        telefone: internationalPhone,
        timestamp: timestamp,
        fonte: 'WhatsApp Popup',
        url_origem: window.location.href,
        user_agent: navigator.userAgent,
        utm_source: utmParams.utm_source,
        utm_medium: utmParams.utm_medium,
        utm_campaign: utmParams.utm_campaign,
        utm_term: utmParams.utm_term,
        utm_content: utmParams.utm_content,
      }; await fetch('https://hook.us1.make.com/ziaj9165bfybtavdge3ajixeer10ige7', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      onClose();

      setTimeout(() => {
        window.open(originalWhatsAppUrl, '_blank');
      }, 200);

    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      onClose();
      setTimeout(() => {
        window.open(originalWhatsAppUrl, '_blank');
      }, 200);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setPhone('');
      setLgpdAccepted(false);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <PopupOverlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <PopupContainer>
        <CloseButton onClick={onClose} type="button">
          <IoCloseOutline />
        </CloseButton>

        <PopupHeader>
          <h2>
            Fale Conosco
          </h2>
          <p>Para melhor atendimento, informe seu telefone</p>
        </PopupHeader>

        <Form onSubmit={handleSubmit} id='contactForm'>
          <InputGroup>
            <Label htmlFor="tel">Seu WhatsApp *</Label>
            <PhoneInput
              id="tel"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(24) 99999-9999"
              maxLength={15}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </InputGroup>

          <CheckboxContainer>
            <CheckboxInput
              id="lgpd"
              type="checkbox"
              checked={lgpdAccepted}
              onChange={(e) => {
                setLgpdAccepted(e.target.checked);
                if (errors.lgpd) {
                  setErrors(prev => ({ ...prev, lgpd: '' }));
                }
              }}
            />
            <CheckboxLabel htmlFor="lgpd">
              Aceito que meus dados sejam utilizados para contato conforme a{' '}
              <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer">
                Política de Privacidade
              </a>{' '}
              e autorizo o contato via WhatsApp. *
            </CheckboxLabel>
          </CheckboxContainer>
          {errors.lgpd && <ErrorMessage>{errors.lgpd}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              'Enviando...'
            ) : (
              <>
                <FaWhatsapp />
                Continuar para WhatsApp
              </>
            )}
          </SubmitButton>
        </Form>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default WhatsAppPopup;
