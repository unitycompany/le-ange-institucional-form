import React, { useState, useEffect, useRef, forwardRef } from "react";
import styled from "styled-components";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Button from "../button";

const Content = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 25px;
    font-family: var(--font--comfortaa);
    flex-direction: ${props => props.direction ? 'row' : 'row-reverse'};
    height: 600px;

    @media (max-width: 768px){
        flex-direction: column;
        height: auto;
        gap: 20px;
    }

    & main {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        gap: 20px;

        @media (max-width: 768px){
            width: 100%;
        }

        & h1 {
            font-size: 28px;
            font-weight: 400;
            color: ${props => props.color || '#000'};
            position: relative;
            overflow: hidden;

            @media (max-width: 768px){
                font-size: 22px;
            }
            
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.6),
                    transparent
                );
                animation: shine 4s ease-in-out infinite;
            }
            
            @keyframes shine {
                0% {
                    left: -100%;
                }
                50% {
                    left: 100%;
                }
                100% {
                    left: 100%;
                }
            }
        }

        & > p {
            font-size: 18px;
            line-height: 100%;
            font-weight: 300;
            color: var(--color--black);
            font-family: var(--font--avenir);
            margin-top: -10px;
            margin-bottom: 5px;

            @media (max-width: 768px){
                font-size: 16px;
            }
        }

        & ol {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 5px;
            flex-wrap: wrap;

            & li {
                padding: 5px 15px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 300;
                border: 1px solid #00000020;
                color: #353535;
                font-family: var(--font--avenir);
                display: flex;
                align-items: center;
                gap: 8px;

                @media (max-width: 768px){
                    font-size: 12px;
                }
                
                & svg {
                    width: 14px;
                    height: 14px;
                    fill: currentColor;

                    @media (max-width: 768px){
                        width: 12px;
                        height: 12px;
                    }
                }
            }
        }

        & div {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;

            @media (max-width: 768px){
                display: none;
            }

            & img {
                width: 50%;
                height: 250px;
                object-fit: cover;
                border-radius: 20px;

                &:hover {
                    transform: scale(0.99);
                }
            }
        }
    }
`

const PictureContainer = styled.picture`
    position: relative;
    display: block;
    width: 50%;
    height: 100%;

    @media (max-width: 768px){
        width: 100%;
        height: 350px;
    }
`

const MainImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 20px;
    opacity: ${props => props.isLoading ? 0 : 1};
    transform: ${props => props.isLoading ? 'scale(1.05)' : 'scale(1)'};
    cursor: pointer;
`

const CarouselControls = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    pointer-events: none;
`

const CarouselButton = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.1);
    }
    
    & svg {
        width: 16px;
        height: 16px;
        color: #333;
    }
`

const PrevButton = styled(CarouselButton)`
`

const NextButton = styled(CarouselButton)`
`

const ProgressBar = styled.div`
    position: absolute;
    bottom: 30px;
    left: 7.5%;
    border-radius: 20px;
    width: 85%;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
`

const ProgressFill = styled.div`
    height: 100%;
    background: #fff;
    transition: width 0.1s linear;
    width: ${props => props.progress}%;
`

const ThumbnailImage = styled.img`
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
`

const ImageModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: ${props => props.isOpen ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: pointer;
`

const ExpandedImage = styled.img`
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
`

const CloseButton = styled.button`
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(255, 255, 255, 1);
        transform: scale(1.1);
    }
`

const CardSuite = forwardRef(({
    nome,
    descricao,
    features = [],
    CTA,
    images = [],
    autoSlideInterval = 10000,
    color,
    direction = false

}, ref) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isAutoSliding, setIsAutoSliding] = useState(true);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    // Intersection Observer to detect visibility
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.3, // Trigger when 30% of the component is visible
                rootMargin: '50px' // Start observing 50px before entering viewport
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Auto slide functionality
    useEffect(() => {
        if (!isAutoSliding || images.length <= 1 || !isVisible) return;

        const interval = setInterval(() => {
            setIsImageLoading(true);
            setTimeout(() => {
                setCurrentImageIndex(prev => (prev + 1) % images.length);
                setProgress(0);
                setIsImageLoading(false);
            }, 200);
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [currentImageIndex, isAutoSliding, images.length, autoSlideInterval, isVisible]);

    // Progress bar animation
    useEffect(() => {
        if (!isAutoSliding || images.length <= 1 || !isVisible) return;

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    return 0;
                }
                return prev + (100 / (autoSlideInterval / 100));
            });
        }, 100);

        return () => clearInterval(progressInterval);
    }, [currentImageIndex, isAutoSliding, autoSlideInterval, isVisible]);

    const handlePrevImage = () => {
        setIsAutoSliding(false);
        setIsImageLoading(true);
        setTimeout(() => {
            setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
            setProgress(0);
            setIsImageLoading(false);
        }, 200);
        setTimeout(() => setIsAutoSliding(true), 10000);
    };

    const handleNextImage = () => {
        setIsAutoSliding(false);
        setIsImageLoading(true);
        setTimeout(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length);
            setProgress(0);
            setIsImageLoading(false);
        }, 200);
        setTimeout(() => setIsAutoSliding(true), 10000);
    };

    const handleThumbnailClick = (index) => {
        setIsAutoSliding(false);
        setIsImageLoading(true);
        setTimeout(() => {
            setCurrentImageIndex(index);
            setProgress(0);
            setIsImageLoading(false);
        }, 200);
        setTimeout(() => setIsAutoSliding(true), 10000);
    };

    const getVisibleThumbnails = () => {
        if (images.length <= 2) return [];

        const thumbnails = [];
        for (let i = 1; i <= 2; i++) {
            const index = (currentImageIndex + i) % images.length;
            thumbnails.push({ src: images[index], index });
        }
        return thumbnails;
    };

    const handleClick2 = () => {
        window.open("https://tintim.link/whatsapp/85d10962-4e7e-4f65-9a44-898be828e6fd/76dadedc-00f5-4a34-a4b0-c2052c540329", "_blank");
    };

    const handleImageClick = () => {
        setIsImageModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsImageModalOpen(false);
    };

    return (
        <>
            <Content color={color} direction={direction} ref={ref}>
                <PictureContainer>
                    <MainImage
                        src={images.length > 0 ? images[currentImageIndex] : ""}
                        alt={nome}
                        isLoading={isImageLoading}
                        onClick={handleImageClick}
                    />

                    {images.length > 1 && (
                        <>
                            <CarouselControls>
                                <PrevButton onClick={handlePrevImage}>
                                    <SlArrowLeft />
                                </PrevButton>
                                <NextButton onClick={handleNextImage}>
                                    <SlArrowRight />
                                </NextButton>
                            </CarouselControls>

                            <ProgressBar>
                                <ProgressFill progress={progress} />
                            </ProgressBar>
                        </>
                    )}
                </PictureContainer>
                <main>
                    <h1>{nome}</h1>
                    <p>{descricao}</p>
                    <ol>
                        {features.map((feature, index) => (
                            <li key={index}>
                                {feature.icon}
                                {feature.text}
                            </li>
                        ))}
                    </ol>
                    <Button
                        idBtn="clickwpp"
                        onClick={handleClick2}
                        text="Fazer reserva!"
                        backgroundColor="transparent"
                        border="1px solid"
                        color="var(--color--black)"
                    />

                    <div>
                        {getVisibleThumbnails().map((thumb, idx) => (
                            <ThumbnailImage
                                key={idx}
                                src={thumb.src}
                                alt={`${nome} - Miniatura ${idx + 1}`}
                                onClick={() => handleThumbnailClick(thumb.index)}
                            />
                        ))}
                    </div>
                </main>
            </Content>

            <ImageModal isOpen={isImageModalOpen} onClick={handleCloseModal}>
                <CloseButton onClick={handleCloseModal}>×</CloseButton>
                <ExpandedImage
                    src={images.length > 0 ? images[currentImageIndex] : ""}
                    alt={nome}
                    onClick={(e) => e.stopPropagation()}
                />
            </ImageModal>
        </>
    )
});

export default CardSuite;