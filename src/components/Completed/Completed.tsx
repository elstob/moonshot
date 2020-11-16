import React from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  body: string;
  moon: boolean;
  progress: () => void;
  title: string;
}

const Completed = ({ body, moon, progress, title }: IProps) => (
  <>
    {moon && (
      <Moon>
        <img alt="" src="/images/moon.png" />
      </Moon>
    )}
    <Container>
      <h2>{title}</h2>
      <p>{body}</p>
      <Button onClick={progress}>View Final Score</Button>
    </Container>
  </>
);

const fadeIn = keyframes`
    0% {
    opacity: 0;
    transform: translateY(30%);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const moonIn = keyframes`
    0% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(50%);
    }
`;

const Moon = styled.div`
  animation: ${moonIn} 3s forwards;
  position: absolute;
  bottom: 100%;
  width: 100%;

  img {
    display: block;
    margin: 0 auto;
    width: 50%;
  }
`;

const Button = styled.button`
  border: 5px outset #ccc;
  background: #ddd;
  color: #000;
  cursor: pointer;
  font-family: monospace;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 1rem;
`;

const Container = styled.div`
  animation: ${fadeIn} 3s forwards;
  margin: 0 auto;
  padding-top: 10rem;
  text-align: center;
  user-select: none;
  width: max-content;

  h2 {
    font-size: 8rem;
    font-weight: normal;
    margin-bottom: 2rem;
    letter-spacing: 2rem;
    text-transform: uppercase;
    margin-right: -2rem;
  }

  p {
    font-size: 2rem;
    margin-bottom: 4rem;
  }
`;

export default Completed;
