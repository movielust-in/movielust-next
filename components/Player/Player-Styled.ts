import styled from '@emotion/styled';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { ScrollbarStyle } from '../../styles';

export const PLayerContainer = styled.div`
    background-color: #090c14;
    display: flex;
    flex-direction: row;
    height: 100vh;
    left: 0;
    overflow-y: auto;
    padding-left: 3.5vh;
    padding-top: 8vh;
    position: fixed;
    top: 0;
    width: 100vw;
    z-index: 1;
    ${ScrollbarStyle}
    @media (max-width: 724px) {
        flex-direction: column;
        padding: 0;
        padding-top: 8vh;
    }
`;

export const VideoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 65vw;

    img {
        left: 300px;
        position: absolute;
        top: 100px;
        z-index: -1;
    }
    @media (max-width: 724px) {
        width: 100vw;
        img {
            left: 100px;
        }
    }
`;

export const BackArrow = styled(FaArrowAltCircleLeft)`
    cursor: pointer;
    margin: 15px 0;
    transform: scale(3);
    &:hover {
        color: gray;
        transition: all 1s;
    }
    @media (max-width: 724px) {
        margin-left: 10px;
        transform: scale(1.9);
    }
`;

export const Title = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 2rem;
    margin: 10px 0;
    @media (max-width: 724px) {
        font-size: 1.5rem;
    }
`;
