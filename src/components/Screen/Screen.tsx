import React from "react";
import styled from "styled-components";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const Screen = ({ children, className }: IProps) => (
  <Container className={className}>
    <Inner>{children}</Inner>
  </Container>
);

export const Container = styled.div`
  background: #aaa;
  border: 0.5rem solid #aaa;
  border-radius: 1rem;
  box-shadow: 0 0 5px #000;
`;

export const Inner = styled.div`
  background: #000;
  border-radius: 1rem;
  padding: 0.5rem;

  ul {
    margin: 0;
    padding: 0;
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
  }
`;

export default Screen;
