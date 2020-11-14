import React from "react";
import styled, { css, keyframes } from "styled-components";

interface IProps {
  pickLetter: (index: number) => void;
  removeLetter: (index: number) => void;
  selectedIndexes: number[];
  value: string[];
}

const Path = ({ pickLetter, removeLetter, selectedIndexes, value }: IProps) => (
  <Container>
    {value.map((letter, index) => {
      const selected = selectedIndexes.includes(index);
      return (
        <Star
          selected={selected}
          key={`${letter}${index}`}
          onClick={() => (selected ? removeLetter(index) : pickLetter(index))}
        >
          {letter}
        </Star>
      );
    })}
  </Container>
);

const twinkleKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: .6;
  }
`;

const twinkle = css`
  ${twinkleKeyframes} 1.5s alternate infinite;
`;

const Container = styled.div`
  display: block;
  margin: 0 auto;
  position: relative;
  text-align: center;
  user-select: none;
  width: 60rem;
`;

const Star = styled.div<{ selected: boolean }>`
  animation: ${({ selected }) => (selected ? "none" : twinkle)};
  animation-delay: 1.61404s;
  border: 1px solid black;
  color: white;
  cursor: pointer;
  display: inline-block;
  font-size: 3rem;
  height: 3rem;
  line-height: 3rem;
  margin: 3rem;
  opacity: ${({ selected }) => (selected ? 0.2 : 1)};
  position: relative;
  text-align: center;
  text-transform: uppercase;
  text-shadow: 0px 0px 10px transparent;
  transition: all 0.5s ease-in;
  width: 3rem;

  &:nth-child(1) {
    top: -2rem;
  }

  &:nth-child(2) {
    animation-delay: 4.09091s;
    top: 1.2rem;
  }

  &:nth-child(3) {
    animation-delay: 1.77143s;
    animation-duration: 1.75s;
    top: -0.2rem;
  }

  &:nth-child(4) {
    animation-delay: 1.55357s;
    top: 2.42rem;
  }

  &:nth-child(5) {
    animation-delay: 0.88462s;
    animation-duration: 1.75s;
    top: -1.8rem;
  }

  &:nth-child(5) {
    animation-delay: 0.66s;
  }

  &:nth-child(6) {
    animation-delay: 0.03279s;
    animation-duration: 1.75s;
    top: 1.6rem;
  }

  &:hover {
    animation: none;
    text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.75);
    transition: all 0.5s ease-in;
    opacity: ${({ selected }) => (selected ? 0.2 : 1)};
  }
`;

export default Path;
