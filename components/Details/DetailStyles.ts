// import { motion } from 'framer-motion';
// import { FaShareAlt } from 'react-icons/fa';
// import styled from '@emotion/styled';
// import { keyframes, css } from '@emotion/react';

// export const Container = styled.div`
//     font-family: 'bariolregular', sans-serif;
//     min-height: calc(100vh - 73px);
//     overflow: hidden;
//     padding: calc(3.5vw + 5px);
//     position: relative;
//     width: 100%;
//     @media (max-width: 724px) {
//         padding-bottom: 80px;
//     }
// `;

// export const fadeIn = keyframes`
// from{opacity:0;}
// to{opacity:1;}
// `;

// export const Zooming = keyframes`
// 0%{transform:scale(1);}
// 50%{transform:scale(1.02);}
// 100%{transform:scale(1);}
// `;

// export const Background = styled(motion.div)`
//     animation: ${Zooming} 5s linear infinite;
//     bottom: 0;
//     left: 0;
//     opacity: 0.4;
//     position: fixed;
//     right: 0;
//     top: 0;
//     z-index: -1;
//     img {
//         height: 100%;
//         object-fit: cover;
//         width: 100%;
//     }
// `;

// export const HoverMessage = styled.div`
//     background-color: black;
//     border-radius: 10px;
//     color: white;
//     display: none;
//     float: right;
//     font-size: 15px;
//     margin-top: -50px;
//     padding: 10px;
//     position: absolute;
//     z-index: 1001;
// `;

// export const TopContainer = styled.div`
//     display: flex;
//     margin: 20px 0 0 0;
//     max-width: 100%;
//     @media (max-width: 870px) {
//         margin: 0;
//     }
//     @media (max-width: 724px) {
//         flex-direction: row;
//         margin: 0;
//     }
// `;

// export const Poster = styled(motion.div)`
//     animation: ${fadeIn} 200ms linear 300ms 1 forwards;
//     display: flex;
//     flex-direction: column;
//     height: 400px;
//     margin: 0;
//     min-height: 400px;
//     min-width: 280px;
//     object-fit: contain;
//     opacity: 0;
//     width: 280px;
//     img {
//         border-radius: 20px;
//         height: 100%;
//         width: 100%;
//     }
//     @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//         height: 300px;
//     }
//     @media (max-width: 1024px) {
//         min-height: 300px;
//         height: 350px;
//         min-width: 250px;
//         width: 270px;
//     }
//     @media (max-width: 870px) {
//         height: 200px;
//         width: auto;
//         min-width: 0;
//     }
//     @media (max-width: 724px) {
//         display: none;
//         align-items: center;
//         margin-top: 0;
//         height: 380px;
//         margin-left: auto;
//         margin-right: auto;
//         img {
//             box-shadow: none;
//         }
//     }
// `;

// export const YouTube = styled.div`
//     animation: ${fadeIn} 200ms linear 300ms 1 forwards;
//     iframe {
//         border: none;
//         border-radius: 18px;
//     }
//     margin-left: 200px;
//     opacity: 0;
//     @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//         iframe {
//             border-radius: 10px;
//             margin-left: 100px;
//         }
//     }
//     @media (max-width: 1024px) {
//         margin-left: 70px;
//         iframe {
//             height: 360px;
//             width: 550px;
//         }
//     }
//     @media (max-width: 820px) {
//         margin-left: 70px;
//         iframe {
//             height: 360px;
//             width: 550px;
//         }
//     }
//     @media (max-width: 870px) {
//         iframe {
//             height: 200px;
//             width: auto;
//         }
//     }
//     @media (max-width: 724px) {
//         width: 100%;
//         margin-left: 0;
//         iframe {
//             height: 260px !important;
//             width: 100%;
//             margin-left: 0;
//         }
//     }
// `;

// export const ContentOptions = styled.div`
//     align-items: center;
//     color: white;
//     display: flex;
//     margin: 0px 0 15px 0;
//     div {
//         background-color: rgba(200, 200, 200, 0.4);
//         border-radius: 10px;
//         cursor: pointer;
//         margin: 0 0 0 8px;
//         padding: 10px 6px;
//         text-align: center;
//         vertical-align: middle;
//         a {
//             color: white;
//             white-space: nowrap;
//         }
//     }
//     svg {
//         vertical-align: middle;
//     }
//     @media (max-width: 724px) {
//         font-size: 10px;
//         div {
//             padding: 10px 6px;
//         }
//     }
// `;

// export const Controls = styled.div`
//     align-items: center;
//     display: flex;
//     margin: 0 0 0 0;
//     @media (max-width: 724px) {
//         margin: 10px 0 0 0;
//     }
// `;

// export const PlayMovie = styled.span<{ loading: string }>`
//     align-items: center;
//     background: transparent;
//     border: 2px solid rgba(255, 255, 255, 0.1);
//     border-radius: 10px;
//     box-shadow: 0 0 80px rgba(0, 0, 0, 0.25);
//     cursor: pointer;
//     display: flex;
//     justify-content: space-around;
//     overflow: hidden;
//     padding: 8px 10px;
//     transition: all 200ms linear;
//     white-space: nowrap;
//     width: ${(props) => (props.loading === 'true' ? '80px' : '120px')};
//     img {
//         vertical-align: middle;
//         width: 20px;
//     }
//     svg {
//         vertical-align: middle;
//     }
//     &:hover {
//         transform: scale(1.05);
//         transition: 1s all;
//     }
// `;

// export const IMDBRatings = styled.span`
//     cursor: pointer;
// `;

// export const AddButton = styled.button`
//     align-items: center;
//     background: transparent;
//     border: 2px solid rgba(255, 255, 255, 0.1);
//     border-radius: 10px;
//     cursor: pointer;
//     display: flex;
//     height: 44px;
//     justify-content: center;
//     margin-left: 5px;
//     width: 44px;
//     span {
//         color: white;
//         font-size: 30px;
//     }
//     &:hover {
//         background: rgba(255, 255, 255, 0.1);
//         ${HoverMessage} {
//             display: flex;
//         }
//     }
// `;

// export const ShareButton = styled(FaShareAlt)`
//     background: transparent;
//     border: 2px solid rgba(255, 255, 255, 0.1);
//     border-radius: 10px;
//     cursor: pointer;
//     display: flex;
//     height: 44px;
//     justify-content: center;
//     margin-left: 10px;
//     width: 44px;
//     padding: 10px;

//     &:hover {
//         background: rgba(255, 255, 255, 0.1);
//         ${HoverMessage} {
//             display: flex;
//         }
//     }
//     @media (max-width: 724px) {
//         padding: 8px;
//         img {
//             width: 18px;
//             height: 18px;
//         }
//     }
// `;

// export const Title = styled.div`
//     font-family: 'bariolregular', sans-serif;
//     letter-spacing: 0.8px;
//     margin: 10px 0 10px 0;
//     h2 {
//         display: inline-block;
//         font-size: 40px;
//         margin: 0;
//     }
//     h4 {
//         display: inline-block;
//         font-size: 30px;
//         margin: 0;
//     }
//     @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//         h2 {
//             font-size: 30px;
//         }
//         h4 {
//             display: inline-block;
//             margin: 0;
//             font-size: 20px;
//         }
//     }
//     @media (max-width: 724px) {
//         h2 {
//             margin: 0;
//             font-size: 23px;
//         }
//         h4 {
//             margin-left: 0;
//             font-size: 12px;
//         }
//     }
// `;

// export const Rating = styled.div`
//     display: flex;
//     align-items: center;
//     margin-bottom: 15px;
//     margin-top: 10px;
//     letter-spacing: 2px;
//     span {
//         margin-left: 10px;
//         img {
//             vertical-align: middle;
//         }
//     }
// `;

// export const SubTitle = styled.div`
//     color: rgb(249, 249, 249);
//     font-size: 15px;
//     letter-spacing: 1.5px;
//     margin-bottom: 15px;
// `;

// export const ReleaseDate = styled(SubTitle)``;

// export const Description = styled.div`
//     display: flex;
//     font-family: 'bariolregular', sans-serif;
//     font-size: 22px;
//     letter-spacing: 1.2px;
//     line-height: 1.5;
//     margin-top: 16px;
//     padding-right: 10px;
//     text-align: justify;
//     text-justify: inter-word;
//     width: 77vw;
//     @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//         line-height: 1.3;
//         font-size: 15px;
//     }
//     @media (max-width: 724px) {
//         font-size: 15px;
//         width: 85vw;
//     }
// `;

// export const Information = styled(motion.div)<{ dom: any }>`
//     animation: ${fadeIn} 200ms linear 300ms 1 forwards;
//     border-radius: 15px;
//     box-shadow: 5px 3px 20px black;
//     margin: 10px 0 0 0;
//     max-width: 78vw;
//     padding: 10px;
//     width: 100%;
//     @media (orientation: landscape) and (min-width: 600px) and (max-width: 896px) {
//         max-width: 90vw;
//     }
//     @media (min-width: 724px) {
//         ${({ dom }) =>
//             dom.length > 0
//                 ? css`
//                       background-color: rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.3);
//                   `
//                 : ''};
//     }
//     @media (max-width: 1024px) {
//         min-width: 100%;
//     }
//     @media (max-width: 724px) {
//         max-width: 50vw;
//         background-color: transparent;
//         margin: 0;
//     }
// `;

// export const Collection = styled.div<{ dom: any }>`
//     border-radius: 15px;
//     box-shadow: 5px 3px 30px black;
//     margin: 15px 0 10px 0;
//     overflow: hidden;
//     padding: 10px;
//     position: relative;
//     @media (min-width: 724px) {
//         ${({ dom }) =>
//             dom.length > 0
//                 ? css`
//                       background-color: rgba(${dom[0]}, ${dom[1]}, ${dom[2]}, 0.3);
//                   `
//                 : ''};
//     }
//     @media (max-width: 724px) {
//         padding: 5px;
//         margin: 5px 0 5px 0;
//     }
// `;

export {};