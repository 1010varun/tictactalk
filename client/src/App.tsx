import { useState, useEffect } from "react";
import io from "socket.io-client";

import { JoinModal } from "./components/JoinModal/JoinModal";
import { Main } from "./components/Main/Main";
import { MessageModal } from "./components/MessageModal/MessageModal";



const socket = io("http://localhost:5000");

const App = () => {
  const [roomCode, setRoomCode] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);

  useEffect(() => {
    console.log("roomCode = ", roomCode);
    if (roomCode) {
      socket.emit("Join Room", roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    socket.on("Room Filled", () => {
      setRoomCode(null);
      setShowMessageModal(true);
    });
  })

  return (
    <>
      <JoinModal
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        setRoomCode={setRoomCode}
      />
      <MessageModal
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        message={"Room Already Filled"}
        setShowJoinModal={setShowJoinModal}
      />
      {roomCode && <Main socket={socket} roomCode={roomCode} />}
    </>
  );
};

export default App;
