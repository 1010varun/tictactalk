import { useState } from "react";
import {motion} from "framer-motion";
import "./JoinModal.css"

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
export const JoinModal = ({showJoinModal, setShowJoinModal, setRoomCode}) => {
    const [roomId, setRoomId] = useState<any | null>(null);

    const handleSave = () => {
        setRoomCode(roomId);
        setShowJoinModal(false);
    };

    return (
      <>
        {showJoinModal && (
          <motion.div
            className="joinRoomModal-container"
            variants={backgrop}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="joinRoomModal-card" variants={modal}>
              <h1 className="joinRoomModal-card-title">Enter a room code</h1>
              <input
                className="joinRoomModal-card-input"
                type="number"
                placeholder="eg: 1212"
                onChange={(e) => setRoomId(e.target.value)}
              />
              <button
                onClick={handleSave}
                className="joinRoomModal-card-button"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </>
    );
};

// export default JoinModal;