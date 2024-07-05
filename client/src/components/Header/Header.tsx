import "./Header.css";

//@ts-ignore
export const Header = ({canPlay}) => {
  return (
    <header>
      <h1 className="header-title">Multiplayer Tic Tac Toe</h1>
      {canPlay ? (
        <h3 className="turn-title">Your Turn, U are X</h3>
      ) : (
        <h3 className="noturn-title">Opponent's Turn</h3>
      )}
    </header>
  );
};

