import React from "react";

interface IProps {
  className?: string;
  value?: string;
}

const Word = ({ className, value }: IProps) => {
  return (
    <div>
      {value?.split("").map((letter, index) => (
        <span key={`${letter}${index}`}>{letter}</span>
      ))}
    </div>
  );
};

export default Word;
