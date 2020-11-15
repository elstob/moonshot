import React from "react";
import styled from "styled-components";
import Letter from "../Letter";
import Screen from "../Screen";

interface IProps {
  value?: string;
}

const Input = ({ value }: IProps) => (
  <Container>
    {value?.split("").map((letter, index) => (
      <Letter key={`letter-${index}`} offset={index} value={letter} />
    ))}
  </Container>
);

const Container = styled(Screen)`
  color: #4af626;
  font-family: monospace;
  margin: 10rem auto 0;
  text-decoration: none;
  text-shadow: 0px 0px 1px #4af626;
  text-transform: uppercase;
  transition: all 0.5s ease-in-out;
  width: 34rem;

  > div > div {
    font-size: 4rem;
    text-align: center;
    width: 4rem;
  }
`;

export default Input;
