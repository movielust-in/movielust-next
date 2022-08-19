import styled from '@emotion/styled';

export const WrapText = styled.h3`
    color: white;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
    padding: 0;
    text-align: center;
    text-size-adjust: auto;
    @media (max-width: 724px) {
        font-size: 0.7rem;
    }
`;

export const Loading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(50%) translateY(-50%);

    img {
        height: 50px;
        opacity: 0.5;
        width: 50px;
    }
`;
