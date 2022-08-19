import { MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { FaArrowLeft } from 'react-icons/fa';

interface BackArrowProps {
    scale: number;
    onClick: MouseEventHandler<SVGAElement>;
}

function BackArrow({ scale, onClick }: BackArrowProps) {
    return <BackArow scale={scale} onClick={onClick} />;
}

export default BackArrow;

const BackArow = styled(FaArrowLeft)`
    cursor: pointer;
    transform: scale(${(props) => props.scale});
`;
