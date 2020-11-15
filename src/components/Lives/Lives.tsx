import React from "react";
import styled from "styled-components";

interface IProps {
  count: number;
}

const ASTRONAUTS = ["👩🏾‍🚀", "👨🏻‍🚀", "👩🏻‍🚀"];

const Lives = ({ count }: IProps) => {
  let content: React.ReactNode[] = [];
  let x = 0;

  while (x < 3) {
    content.push(
      <Astronaut dead={x >= count} key={`${ASTRONAUTS[x]}-${x}`}>
        {ASTRONAUTS[x]}
      </Astronaut>
    );
    x++;
  }

  return <Container>{content}</Container>;
};

const Container = styled.div`
  background: #222;
  bottom: 3rem;
  border: 0.5rem solid #aaa;
  border-radius: 1rem;
  font-size: 4rem;
  left: 3rem;
  line-height: 4rem;
  overflow: hidden;
  padding: 0.5rem 1rem 0;
  position: absolute;
  white-space: pre;
  user-select: none;

  > span {
  }
`;

const Astronaut = styled.span<{ dead: boolean }>`
  display: inline-block;
  margin-right: 1rem;
  position: relative;
  top: ${({ dead }) => (dead ? "6rem" : "5px")};
  transition: top 0.5s ease-in-out;
  width: 4rem;

  &:last-child {
    margin-right: 0;
  }
`;

export default Lives;
