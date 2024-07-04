import { useState, useEffect } from "react";
import io from "socket.io-client";

import { JoinModal } from "./components/JoinModal/JoinModal";
import { Main } from "./components/Main/Main";
import { MessageModal } from "./components/MessageModal/MessageModal";
import { ErrorModal } from "./components/ErrorModal/ErrorModal";
import { NewMessageModal } from "./components/NewMessageModal/NewMessageModal";
import { TypeNewMessageModal } from "./components/TypeNewMessageModal/TypeNewMessageModal";
import { Footer } from "./components/Footer/Footer"; 

const socket = io(import.meta.env.VITE_BACKEND_URL);

const App = () => {
  const [roomCode, setRoomCode] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userName, setUserName] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [message, setMessage] = useState({});
  const [showNewMesageModal, setShowNewMessageModal] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [showTypeNewMessageModal, setShowTypeNewMessageModal] = useState(false);

  useEffect(() => {
    console.log("roomCode = ", roomCode);
    if (roomCode) {
      socket.emit("Join Room", { roomCode, userName });
    }
  }, [roomCode]);

  useEffect(() => {
    console.log("newMessage = ", newMessage);
    if ( newMessage ) {
      socket.emit("message", { "message": newMessage, roomCode });
    }
  }, [newMessage])

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

    socket.on("opponent not present", () => {
      setShowErrorModal(true);
      
    });

    socket.on("newMessage", (newMessage) => {
      setMessage(newMessage);
      setShowNewMessageModal(true);
    })

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
      <ErrorModal
        showErrorModal={showErrorModal}
        setShowErrorModal={setShowErrorModal}
        error={`No opponent present in this room`}
      />
      <NewMessageModal
        setShowNewMessageModal={setShowNewMessageModal}
        showNewMessageModal={showNewMesageModal}
        newMessage={message}
      />
      <TypeNewMessageModal
        setNewMessage={setNewMessage}
        setShowTypeNewMessageModal={setShowTypeNewMessageModal}
        showTypeNewMessageModal={showTypeNewMessageModal}
      />
      {roomCode && (
        <Main socket={socket} roomCode={roomCode} userName={userName} />
      )}
      <Footer setShowTypeNewMessageModal={setShowTypeNewMessageModal} />
    </>
  );
};

export default App;
