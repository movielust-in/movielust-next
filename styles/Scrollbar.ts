import { css } from '@emotion/react';

const Scrollbar = css`
    &::-webkit-scrollbar {
        width: 0.2em;
    }

    &::-webkit-scrollbar:hover {
        width: 0.8em;
    }

    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
    }

    &::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: grey;
        outline: 1px solid darkgrey;
    }

    &::-webkit-scrollbar-thumb:active {
        background-color: grey;
        outline: 2px solid darkgrey;
    }
`;

export default Scrollbar;
