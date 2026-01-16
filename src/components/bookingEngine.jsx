import React, { useMemo, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MapPin, CalendarBlank, Users, MagnifyingGlass } from 'phosphor-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { openExternal } from '../utils/openExternal';

const StickyViewport = styled.div`
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: #353535;
    position: fixed;
    bottom: 0;
    z-index: 9999;

    padding: 10px 0;


    @media (max-width: 768px){
        background: transparent;
        width: auto;
        margin-left: 0;
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
    }
`;

const EngineWrapper = styled.section`
    position: relative;
    z-index: 15;
    width: min(1280px, 100%);
    margin: 0 auto;
    padding: 6px 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (max-width: 768px){
        display: none;
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const InlineRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: clamp(10px, 1.5vw, 18px);
    align-items: flex-end;

    @media (max-width: 768px){
        display: none;
    }
`;

const Field = styled.label`
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: var(--font--comfortaa);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color--white);
    flex: 1;
    min-width: 150px;
`;

const FieldLabel = styled.span`
    display: flex;
    align-items: center;
    gap: 6px;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const IconWrapper = styled.span`
    position: absolute;
    left: 14px;
    display: flex;
    align-items: center;
    color: rgba(15, 43, 55, 0.5);
    pointer-events: none;
    z-index: 10;
`;

const sharedInputStyles = css`
    width: 100%;
    border: 1px solid rgba(16, 45, 55, 0.15);
    padding: 14px 16px 14px 44px;
    font-size: 0.95rem;
    font-family: var(--font--comfortaa);
    background: var(--color--white);
    color: #0f2b37;
    transition: border 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease, background 0.2s ease;

    &::-webkit-calendar-picker-indicator {
        filter: grayscale(1);
        opacity: 0.8;
    }

    &::placeholder {
        color: rgba(15,43,55,0.45);
    }

    &:focus {
        border-color: rgba(8, 124, 138, 0.7);
        box-shadow: 0 12px 30px rgba(8, 124, 138, 0.12);
        background: #fff;
        outline: none;
        transform: translateY(-1px);
    }
`;

const Input = styled.input`
    ${sharedInputStyles};
`;

const Select = styled.select`
    ${sharedInputStyles};
`;

const StyledDatePicker = styled(DatePicker)`
    ${sharedInputStyles};
`;

const ButtonSlot = styled.div`
    display: flex;
    align-items: stretch;
    min-width: 160px;
    flex: 0 0 auto;
`;

const MobileButtonWrapper = styled.div`
    display: none;

    @media (max-width: 768px){
        display: block;
    }
`;

const MobileCTAButton = styled.button`
    border: none;
    padding: 14px 20px;
    font-size: 0.85rem;
    font-weight: 700;
    font-family: var(--font--comfortaa);
    background-color: ${(props) => (props.$accentColor ? props.$accentColor : 'var(--color--yellow)')};
    cursor: pointer;
    color: ${(props) => (props.$accentColor ? '#fff' : '#0f1b23')};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    border-radius: 50px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    white-space: nowrap;

    &:active {
        transform: scale(0.96);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const CTAButton = styled.button`
    border: none;
    padding: 0 36px;
    font-size: 0.95rem;
    font-weight: 700;
    font-family: var(--font--comfortaa);
    background-color: ${(props) => (props.$accentColor ? props.$accentColor : 'var(--color--yellow)')};
    cursor: pointer;
    color: ${(props) => (props.$accentColor ? '#fff' : '#0f1b23')};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    min-height: 58px;
    transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }
`;

const ADULT_MAX = 4;
const DEFAULT_BASE_URL = 'https://book.omnibees.com/hotelresults';

const getDateInputValue = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatForOmnibees = (value) => {
    if (!value) return '';
    const [year, month, day] = value.split('-');
    return `${day}${month}${year}`;
};

const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
};

const sanitizeAges = (ages) =>
    ages
        .map((age) => {
            const parsed = parseInt(age, 10);
            if (Number.isNaN(parsed) || parsed < 0) return '0';
            if (parsed > 17) return '17';
            return String(parsed);
        })
        .join(';');

const BookingEngine = ({
    propertyOptions = [],
    defaultPropertyId,
    showPropertySelector = false,
    ctaLabel = 'Buscar',
    accentColor,
    className,
}) => {
    const initialCheckIn = useMemo(() => addDays(new Date(), 1), []);
    const initialCheckOut = useMemo(() => addDays(new Date(), 3), []);

    const [selectedProperty, setSelectedProperty] = useState(() => defaultPropertyId || propertyOptions?.[0]?.id || '');
    const [checkIn, setCheckIn] = useState(initialCheckIn);
    const [checkOut, setCheckOut] = useState(initialCheckOut);
    const [adults, setAdults] = useState(2);

    const propertyMap = useMemo(() => {
        return propertyOptions.reduce((acc, option) => {
            if (option?.id) acc[option.id] = option;
            return acc;
        }, {});
    }, [propertyOptions]);

    useEffect(() => {
        if (!propertyMap[selectedProperty] && propertyOptions.length) {
            setSelectedProperty(propertyOptions[0].id);
        }
    }, [propertyMap, propertyOptions, selectedProperty]);

    useEffect(() => {
        if (!defaultPropertyId) return;
        if (!propertyMap[defaultPropertyId]) return;
        if (selectedProperty === defaultPropertyId) return;

        setSelectedProperty(defaultPropertyId);
    }, [defaultPropertyId, propertyMap, selectedProperty]);

    useEffect(() => {
        if (!checkIn || !checkOut) return;
        const minCheckOut = addDays(checkIn, 2);

        if (checkOut < minCheckOut) {
            setCheckOut(minCheckOut);
        }
    }, [checkIn, checkOut]);

    const searchUrl = useMemo(() => {
        const property = propertyMap[selectedProperty];
        if (!property?.q) return '';

        const params = new URLSearchParams();
        params.set('q', property.q);
        params.set('NRooms', '1');

        if (adults) params.set('ad', String(adults));
        if (checkIn) params.set('CheckIn', formatForOmnibees(getDateInputValue(checkIn)));
        if (checkOut) params.set('CheckOut', formatForOmnibees(getDateInputValue(checkOut)));

        const baseUrl = property.baseUrl || DEFAULT_BASE_URL;
        return `${baseUrl}?${params.toString()}`;
    }, [adults, checkIn, checkOut, propertyMap, selectedProperty]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!searchUrl) return;
        openExternal(searchUrl, { target: '_self' });
    };

    const handleMobileClick = () => {
        const property = propertyMap[selectedProperty];
        if (!property?.q) return;
        
        const baseUrl = property.baseUrl || DEFAULT_BASE_URL;
        const url = `${baseUrl}?q=${property.q}`;
        openExternal(url, { target: '_self' });
    };

    const canSubmit = Boolean(searchUrl);

    return (
        <StickyViewport className={className}>
            <MobileButtonWrapper>
                <MobileCTAButton 
                    type="button" 
                    onClick={handleMobileClick}
                    $accentColor={accentColor}
                >
                    <MagnifyingGlass size={20} weight="bold" />
                    Fazer minha reserva
                </MobileCTAButton>
            </MobileButtonWrapper>
            <EngineWrapper>
                <Form onSubmit={handleSubmit}>
                    <InlineRow>
                        {showPropertySelector && propertyOptions.length > 1 && (
                            <Field>
                                <FieldLabel>
                                    <MapPin size={16} weight="duotone" />
                                    Unidade
                                </FieldLabel>
                                <InputWrapper>
                                    <IconWrapper>
                                        <MapPin size={20} weight="duotone" />
                                    </IconWrapper>
                                    <Select value={selectedProperty} onChange={(event) => setSelectedProperty(event.target.value)}>
                                        {propertyOptions.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Select>
                                </InputWrapper>
                            </Field>
                        )}

                        <Field>
                            <FieldLabel>
                                <CalendarBlank size={16} weight="duotone" />
                                Check-in
                            </FieldLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <CalendarBlank size={20} weight="duotone" />
                                </IconWrapper>
                                <StyledDatePicker
                                    selected={checkIn}
                                    onChange={(date) => setCheckIn(date)}
                                    minDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data"
                                    required
                                />
                            </InputWrapper>
                        </Field>
                        <Field>
                            <FieldLabel>
                                <CalendarBlank size={16} weight="duotone" />
                                Check-out
                            </FieldLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <CalendarBlank size={20} weight="duotone" />
                                </IconWrapper>
                                <StyledDatePicker
                                    selected={checkOut}
                                    onChange={(date) => setCheckOut(date)}
                                    minDate={checkIn ? addDays(checkIn, 2) : addDays(new Date(), 2)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione a data"
                                    required
                                />
                            </InputWrapper>
                        </Field>
                        <Field>
                            <FieldLabel>
                                <Users size={16} weight="duotone" />
                                Adultos
                            </FieldLabel>
                            <InputWrapper>
                                <IconWrapper>
                                    <Users size={20} weight="duotone" />
                                </IconWrapper>
                                <Input
                                    type="number"
                                    min={1}
                                    max={ADULT_MAX}
                                    value={adults}
                                    onChange={(event) => {
                                        const value = parseInt(event.target.value, 10);
                                        if (Number.isNaN(value)) return;
                                        setAdults(Math.max(1, Math.min(value, ADULT_MAX)));
                                    }}
                                />
                            </InputWrapper>
                        </Field>
                        <ButtonSlot>
                            <CTAButton type="submit" disabled={!canSubmit} $accentColor={accentColor}>
                                <MagnifyingGlass size={20} weight="bold" />
                                {ctaLabel}
                            </CTAButton>
                        </ButtonSlot>
                    </InlineRow>
                </Form>
            </EngineWrapper>
        </StickyViewport>
    );
};

export default BookingEngine;
