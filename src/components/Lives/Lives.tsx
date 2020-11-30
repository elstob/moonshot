import React from "react";
import styled from "styled-components";
import Screen from "../../components/Screen";

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

  return (
    <Wrapper>
      <StyledScreen>
        <h2>🚀 WORDS</h2>
        <ul>
          <li>ABLE</li>
          <li>LESS</li>
          <li>LING</li>
          <li>NESS</li>
        </ul>
      </StyledScreen>
      <Container>{content}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  bottom: 3rem;
  left: 3rem;
  position: absolute;
`;

const Container = styled.div`
  background: #222;
  border: 0.5rem solid #aaa;
  border-radius: 1rem;
  font-size: 4rem;
  line-height: 4rem;
  overflow: hidden;
  padding: 0.5rem 1rem 0;
  white-space: pre;
  user-select: none;

  > span {
  }
`;

const StyledScreen = styled(Screen)`
  color: #4af626;
  font-family: monospace;
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  text-decoration: none;
  text-shadow: 0px 0px 1px #4af626;
  text-transform: uppercase;

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    margin-top: 0.5rem;
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
