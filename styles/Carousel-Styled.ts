import styled from '@emotion/styled';

export const Title = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    z-index: -1;
    h2 {
        letter-spacing: 1px;
        margin: 0 0 15px 0;
        text-align: start;
    }
    p {
        cursor: pointer;
        margin-top: 1px;
        transition: color 1s, font-size 0.5s;
        &:hover {
            color: greenyellow;
            font-size: 20px;
            transition: color 1s, font-size 0.5s;
        }
    }
    @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
        margin-bottom: 0;
    }
    @media (max-width: 724px) {
        margin: 20px 0 10px 0;
        h2 {
            font-size: 20px;
            padding: 0;
            margin: 0;
        }
        p {
            font-size: 12px;
        }
    }
`;

export const Detail = styled.div`
    flex-shrink: 2;
    font-size: 20px;
    font-weight: 500;
    margin-top: 6px;
    text-align: center;
    div {
        color: #a6a6a6;
        font-size: 15px;
        text-align: center;
    }
    @media (max-width: 724px) {
        font-size: 15px;
        div {
            font-size: 11px;
        }
    }

    &:hover {
        transform: scale(1.1);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 3000ms;
    }
`;
