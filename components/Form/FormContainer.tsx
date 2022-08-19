import React from 'react';
import styled from '@emotion/styled';

import { MovielustLogo } from '../../assets';

import { useWindowSize } from '../../hooks';

interface FormerProps {
    children: React.ReactNode;
}

function Former({ children }: FormerProps) {
    const size = useWindowSize();
    const width = size.width - 18;

    return (
        <Container>
            <Contact size={width}>
                <SEO>
                    Movielust is the exclusive home for your favourite movies and TV series online
                    or stream right to your device{' '}
                </SEO>
                <Info>
                    <h2>Welcome to Movielust</h2>
                    <img src={MovielustLogo} alt="logo" />
                    <p>A New Experience for your movie lust</p>
                </Info>
                <FormContainer>{children}</FormContainer>
            </Contact>
        </Container>
    );
}
export default Former;

const Container = styled.div`
    overflow: hidden;

    &:before {
        background-image: url('images/login-background.webp');
        background-position: top;
        background-repeat: no-repeat;
        background-size: cover;
        bottom: 0;
        content: '';
        left: 0;
        opacity: 0.3;
        position: absolute;
        right: 0;
        top: 0;
        z-index: -1;
    }
`;

const Contact = styled.div<{ size: number }>`
    border: 1px solid silver;
    border-radius: 14px;
    color: white;
    display: flex;
    height: 550px;
    margin: 5% 20% 1%;
    text-align: center;
    width: 60vw;

    @media (max-width: 724px) {
        display: flex;
        flex-direction: column-reverse;
        border: none;
        margin: 0;
        width: 100vw;
        height: auto;
    }
    @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
        width: 80vw;
        margin: 3% 10% 1%;
    }
`;

const Info = styled.div`
    background: rgba(20, 20, 20, 0.8);
    border-radius: 15px 0 0 15px;
    width: 45%;

    h2 {
        font-size: 30px;
        font-weight: 500;
        margin-top: 85px;
    }
    p {
        font-size: 16px;
        margin-top: 20px;
    }
    img {
        height: 38%;
        width: 80%;
    }
    @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
        width: 35%;
    }

    @media (max-width: 724px) {
        padding: 40px 30px;
        width: 100%;
        h2 {
            margin-top: 0;
            font-weight: 500;
            font-size: 1rem;
        }
        p {
            font-size: 0.8rem;
            margin-top: 10px;
        }
        img {
            width: 30%;
        }
    }
    @media (max-width: 653px) {
        padding: 40px 30px;
        h2 {
            margin-top: 0;
            font-size: 1rem;
        }
        img {
            width: 30%;
        }
        p {
            font-size: 0.8rem;
            margin-top: 10px;
        }
    }
`;

const FormContainer = styled.div`
    align-items: center;
    background: rgba(9, 13, 21, 0.65);
    border-radius: 0 15px 15px 0;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    transition: 0.2s;
    width: 70%;
    ul {
        list-style-type: none;
        padding: 0 30px;
    }
    h2 {
        font-size: 30px;
        font-weight: 500;
    }
    p {
        color: white;
        opacity: 0.6;
        &:hover {
            color: white;
            opacity: 1;
        }
    }
    @media (max-width: 724px) {
        width: 100%;
        p {
            font-size: 13px;
        }
        h2 {
            font-size: 24px;
        }
    }
    @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
        width: 60%;
    }
`;

const SEO = styled.div`
    display: none;
`;
