import React from "react";
import styled from "styled-components";
import Screen from "../../components/Screen";
import Stage from "../../components/Stage";

interface IProps {
  gameState: any;
  setGameState: (gameState: any) => void;
}

const GameOver = ({ gameState, setGameState }: IProps) => {
  const { chain, lives, timeLeft } = gameState;

  const chainScore = 100 * chain.length;
  const livesScore = 300 * lives;
  const moonshotBonus = chain.length === 10 ? 1000 : 0;
  const multiplier = chain.filter((link: any) => link.boost).length;
  const timeScore = !!lives ? Math.ceil((10 * (timeLeft / 1000)) / 10) * 10 : 0;

  const subTotal =
    Math.ceil((chainScore + livesScore + moonshotBonus + timeScore) / 10) * 10;
  const total = Math.ceil(((multiplier + 1) * subTotal) / 10) * 10;

  return (
    <Stage>
      <Container>
        <StyledScreen>
          <div>
            Chain Links:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{chainScore} (
            {chain.length} x 100)
            <br />
            Lives Left:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {livesScore} ({lives} x 300)
            <br />
            {!!lives && (
              <>
                Time Left:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {timeScore} ({Math.ceil((10 * (timeLeft / 1000)) / 10)} x 10)
                <br />
              </>
            )}
            Moonshot Bonus:&nbsp;&nbsp;&nbsp;&nbsp;{moonshotBonus}
            <br />
            <br />
            SubTotal:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {subTotal}
            <br />
            Rocket Multiplier: 1 + {multiplier} 🚀
            <br />
            <br />
            Final Score:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{total}
            <br />
            Your high score:&nbsp;&nbsp;&nbsp;
            {gameState.highScore > total ? gameState.highScore : total}
            <br />
          </div>
        </StyledScreen>
        <Button
          onClick={() =>
            setGameState((gameState: any) => ({
              ...gameState,
              highScore:
                gameState.highScore > total ? gameState.highScore : total,
              scene: "game",
            }))
          }
        >
          Play Again
        </Button>
        <Button
          onClick={() =>
            setGameState((gameState: any) => ({
              ...gameState,
              highScore:
                gameState.highScore > total ? gameState.highScore : total,
              scene: "intro",
            }))
          }
        >
          Go Home
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
  margin: 2rem 1rem;
  text-transform: uppercase;
  padding: 1rem;
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
  max-width: max-content;
  text-align: left;
  color: #4af626;
  font-family: monospace;
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 2px;
  text-decoration: none;
  text-shadow: 0px 0px 1px #4af626;
  text-transform: uppercase;

  > div {
    padding: 1rem;
  }
`;

export default GameOver;
