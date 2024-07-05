import { useState } from "react";
import {motion} from "framer-motion";
import "../Modal.css"

const backgrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },

  visible: {
    y: "00px",
    opacity: 1,
    transition: {
      delay: 0.5,
    },
  },
};

//@ts-ignore
export const JoinModal = ({showJoinModal, setShowJoinModal, setRoomCode, setUser}) => {
    const [roomId, setRoomId] = useState<any | null>(null);
    const [userName, setUserName] = useState<any | null>("");

    const handleSave = () => {
        setRoomCode(roomId);
        setShowJoinModal(false);
        setUser(userName)
    };

    return (
      <>
        {showJoinModal && (
          <motion.div
            className="modal-container"
            variants={backgrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="modal-card" variants={modal}>
              <h1 className="modal-card-title">Enter a room code</h1>
              <input
                className="modal-card-input"
                type="number"
                placeholder="eg: 1212"
                onChange={(e) => setRoomId(e.target.value)}
              />
              <input
                className="modal-card-input"
                type="text"
                placeholder="eg: John Doe"
                onChange={(e) => setUserName(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="modal-card-button"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </>
    );
};