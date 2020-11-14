import React from "react";
import styled from "styled-components";

interface IProps {
  chain: string[];
}

const Chain = ({ chain }: IProps) => (
  <Container>
    <Screen>
      {chain.map((word, index) => (
        <li key={`${word}${index}`}>
          <a
            href={`https://www.lexico.com/definition/${word}`}
            rel="noreferrer"
            target="_blank"
          >
            {word}
          </a>
        </li>
      ))}
    </Screen>
  </Container>
);

const Container = styled.div`
  bottom: 3rem;
  border: 5px solid #aaa;
  border-radius: 0.5rem;
  box-shadow: 0 0 5px #000;
  right: 3rem;
  position: absolute;
  width: 12rem;
`;

const Screen = styled.ul`
  background: #000;
  border-radius: 0.5rem;

  padding: 0.5rem;

  li {
    padding: 0.25rem 0.5rem;
    transition: all 0.5s ease-in-out;

    &:hover {
      background: rgba(0, 255, 0, 0.1);
    }

    a {
      color: #4af626;
      display: block;
      font-family: monospace;
      font-size: 1.5rem;
      letter-spacing: 2px;
      text-decoration: none;
      text-shadow: 0px 0px 1px #4af626;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;

      &:hover {
        text-shadow: 0px 0px 2px #4af626;
      }
    }
  }
`;

export default Chain;
