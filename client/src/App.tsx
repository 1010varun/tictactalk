// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {Landing} from "./screens/Landing.js"
// import {Room} from "./screens/Room.js"

// function App() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Landing/>}/>
//         <Route path="/room/:roomId" element={<Room/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App

import { useState, useEffect } from "react";
import io from "socket.io-client";

import { JoinModal } from "./components/JoinModal/JoinModal";
import { Main } from "./components/Main/Main";



const socket = io("http://localhost:5000");

const App = () => {
  const [roomCode, setRoomCode] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(true);

  useEffect(() => {
    console.log("roomCode = ", roomCode);
    if (roomCode) {
      socket.emit("Join Room", roomCode);
    }
  }, [roomCode]);

  useEffect(() => {
    socket.on("Room Filled", () => {
      setRoomCode(null);
      console.log("error")
    });
  })

  return (
    <>
      <JoinModal
        showJoinModal={showJoinModal}
        setShowJoinModal={setShowJoinModal}
        setRoomCode={setRoomCode}
      />
      {roomCode && (
        <Main socket={socket} roomCode={roomCode}/>
      )}
    </>
  );
};

export default App;
