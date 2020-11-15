import React from "react";
import styled from "styled-components";
import Screen from "../Screen";

interface ILink {
  boost: boolean;
  word: string;
}

interface IProps {
  chain: ILink[];
}

const Chain = ({ chain }: IProps) => {
  if (!chain.length) {
    return null;
  }
  return (
    <Container>
      <ul>
        {chain.map(({ boost, word }, index) => (
          <li key={`${word}${index}`}>
            <a
              href={`https://www.merriam-webster.com/dictionary/${word}`}
              rel="noreferrer"
              target="_blank"
            >
              {word}
              {!!boost && " 🚀"}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled(Screen)`
  bottom: 3rem;
  right: 3rem;
  position: absolute;
  width: max-content;
`;

export default Chain;
