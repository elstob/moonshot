import React from "react";
import styled from "styled-components";
import Screen from "../../components/Screen";

interface IProps {
  time: number;
}

const Timer = ({ time }: IProps) => {
  return (
    <StyledScreen>
      <div>{time}</div>
    </StyledScreen>
  );
};

const StyledScreen = styled(Screen)`
  position: absolute;
  bottom: 3rem;
  text-align: left;
  color: #4af626;
  font-family: monospace;
  font-size: 2rem;
  line-height: 2rem;
  letter-spacing: 2px;
  text-decoration: none;
  text-shadow: 0px 0px 1px #4af626;
  text-transform: uppercase;
  left: 50%;

  transform: translateX(-2rem);

  > div {
    padding: 1rem;
    text-align: center;
  }
`;

export default Timer;
