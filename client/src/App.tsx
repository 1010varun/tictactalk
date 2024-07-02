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
  const [userName, setUserName] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    console.log("roomCode = ", roomCode);
    if (roomCode) {
      socket.emit("Join Room", {roomCode, userName});
    }
  }, [roomCode]);

  useEffect(() => {
    socket.on("Room Filled", () => {
      setRoomCode(null);
      setShowMessageModal(true);
    });

    socket.on("user joined", (userName) => {
      console.log("userName = ", userName);
      setUserName(userName);
      setShowUserModal(true);
    });
  });

  return (
    <>
      <JoinModal
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        setRoomCode={setRoomCode}
        setUser={setUserName}
      />
      <MessageModal
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        message={"Room Already Filled"}
        setShowJoinModal={setShowJoinModal}
      />
        <MessageModal
          showMessageModal={showUserModal}
          setShowMessageModal={setShowUserModal}
          message={`${userName} joined in the room`}
          setShowJoinModal={true}
        />
      {roomCode && <Main socket={socket} roomCode={roomCode} userName={userName}/>}
    </>
  );
};

export default App;
