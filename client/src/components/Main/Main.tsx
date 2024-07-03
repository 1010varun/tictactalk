import { useState, useEffect } from "react";
import { Cell } from "../Cell/Cell";
import { MessageModal } from "../MessageModal/MessageModal";
import { Header } from "../Header/Header";
import "./Main.css"

//@ts-ignore
export const Main = ({ roomCode, socket, userName }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");

  //Main logic to check someone won or not
  useEffect(() => {
    if (
      (board[0] == board[1] && board[1] == board[2] && board[0] != "") ||
      (board[3] == board[4] && board[4] == board[5] && board[3] != "") ||
      (board[6] == board[7] && board[7] == board[8] && board[6] != "") ||
      (board[0] == board[3] && board[3] == board[6] && board[0] != "") ||
      (board[1] == board[4] && board[4] == board[7] && board[1] != "") ||
      (board[2] == board[5] && board[5] == board[8] && board[2] != "") ||
      (board[0] == board[4] && board[4] == board[8] && board[0] != "") ||
      (board[2] == board[4] && board[4] == board[6] && board[2] != "")
    ) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      if(!canPlay)setMessage(`You won this game!`);
      else setMessage(`You Loose this game!!`)
      setShowMessageModal(true);
    }
  }, [canPlay]);

  useEffect(() => {
    //@ts-ignore
    socket.on("game update", (id) => {
      setBoard((data) => ({ ...data, [id]: "O" }));
      setCanPlay(true);
    });

    return () => socket.off("game update");
  });

  //@ts-ignore
  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] == "") {
      setBoard((data) => ({ ...data, [id]: "X" }));
      socket.emit("play", { id, roomCode });
      setCanPlay(false);
    }
  };

  return (
    <>
      {showMessageModal && <MessageModal showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal} message={message} setShowJoinModal={true}/>}
      <Header canPlay={canPlay}/>
      <main>
        <section className="main-section">
          <Cell
            handelClick={handleCellClick}
            id={"0"}
            text={board[0]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"1"}
            text={board[1]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"2"}
            text={board[2]}
            canPlay={canPlay}
          />

          <Cell
            handelClick={handleCellClick}
            id={"3"}
            text={board[3]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"4"}
            text={board[4]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"5"}
            text={board[5]}
            canPlay={canPlay}
          />

          <Cell
            handelClick={handleCellClick}
            id={"6"}
            text={board[6]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"7"}
            text={board[7]}
            canPlay={canPlay}
          />
          <Cell
            handelClick={handleCellClick}
            id={"8"}
            text={board[8]}
            canPlay={canPlay}
          />
        </section>
      </main>
    </>
  );
};
