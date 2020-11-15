import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface IProps {
  className?: string;
  offset: number;
  value?: string;
}

const Letter = ({ className, offset, value }: IProps) => {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let id: number;
    if (value && display && value !== display) {
      id = setTimeout(() => setDisplay(value), 100 * offset);
    }
    return () => clearTimeout(id);
  }, [display, offset, value]);

  return (
    <Container className={className} ref={ref}>
      {display}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  text-align: center;
`;

export default Letter;
