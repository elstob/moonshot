import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
  offset?: number;
}

const Stage = ({ children, offset = 0 }: IProps) => {
  return (
    <Container>
      <Background offset={offset} />
      <Midground offset={offset} />
      <Foreground offset={offset} />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: #001;
  color: white;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  position: relative;
`;

const Wrapper = styled.div`
  height: 100vh;
  padding-top: 10rem;
  position: relative;
  z-index: 2;
`;

const Layer = styled.div<{ offset: number }>`
  background-color: transparent;
  background-repeat: repeat;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: background-position 1s ease-in-out;
  z-index: 1;
`;

const Background = styled(Layer)`
  background-image: url("/images/space1.gif");
  background-position: ${({ offset }) => `0% ${offset * 10}%`};
  opacity: 0.4;
`;

const Midground = styled(Layer)`
  background-image: url("/images/space2.gif");
  background-position: ${({ offset }) => `0% ${offset * 30}%`};
  opacity: 0.5;
`;

const Foreground = styled(Layer)`
  background-image: url("/images/space3.gif");
  background-position: ${({ offset }) => `0% ${offset * 50}%`};
  opacity: 0.6;
  filter: grayscale(100%);
`;

export default Stage;
