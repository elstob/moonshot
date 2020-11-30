import React from "react";
import Stage from "../../components/Stage";
import Screen from "../../components/Screen";
import styled from "styled-components";

interface IProps {
  setGameState: (gameState: any) => void;
}

const Guide = ({ setGameState }: IProps) => {
  return (
    <Stage>
      <Container>
        <h2>How to Play</h2>
        <StyledScreen>
          <div>
            <p>
              MOONSHOT is a word making space race. Your aim is to make enough 8
              letter words from pairs of 4 letter words to make it to the moon
              🌕
            </p>
            <p>
              You’ll start with a 4 letter word and 5 starry letters 💫 These
              stars contain a possible 4 letter combination that, when added to
              your starting word, will make an 8 letter link in your chain.
            </p>
            <p>
              For example you may be given the word <strong>MOON</strong> to
              start with and 5 stars to choose from: H, U, S, O &amp; T. By
              selecting (or typing) the S, H, O &amp; T star letters you can
              make the word <strong>MOONSHOT</strong>! Your ship will blast
              forward and <strong>SHOT</strong> will be the starting word for
              your next test.
            </p>
            <p>
              Create as many word links as fast as you can to rack up a High
              Score. Also, look out for the special rocket words 🚀 If you can
              create a link with one of these you get a brand new start word and
              a score multiplier once your adventure is complete.
            </p>
            <p>
              Be careful though, you only have 3 astronauts 👨🏻‍🚀 manning your
              ship. Creating a word that doesn’t combine to form an 8 letter
              link will cause you to lose one of them to the depths of space.
              Lose all 3 of your crew and it is Game Over!
            </p>
          </div>
        </StyledScreen>
        <Button
          onClick={() =>
            setGameState({
              scene: "intro",
            })
          }
        >
          Go Back
        </Button>
      </Container>
    </Stage>
  );
};

const Button = styled.button`
  border: 5px outset #ccc;
  background: #ddd;
  color: #000;
  cursor: pointer;
  font-family: monospace;
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 2px;
  margin-top: 2rem;
  text-transform: uppercase;
  padding: 1rem;

  &:last-child {
    margin-left: 1rem;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
  user-select: none;

  h2 {
    font-size: 8rem;
    font-weight: normal;
    margin-bottom: 2rem;
    letter-spacing: 2rem;
    text-transform: uppercase;
    margin-right: -2rem;
  }

  p {
    font-family: sans-serif;
    font-size: 1.2rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const StyledScreen = styled(Screen)`
  margin: 0 auto;
  max-width: 80%;
  text-align: left;

  > div {
    padding: 1rem;

    strong {
      color: #4af626;
      font-family: monospace;
      font-size: 1.5rem;
      letter-spacing: 2px;
      text-decoration: none;
      text-shadow: 0px 0px 1px #4af626;
      text-transform: uppercase;
    }
  }
`;

export default Guide;
