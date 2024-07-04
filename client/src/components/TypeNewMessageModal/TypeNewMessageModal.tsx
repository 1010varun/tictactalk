import { useState } from "react";
import { motion } from "framer-motion";
import "./TypeNewMessageModal.css";

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
export const TypeNewMessageModal = ({setNewMessage, setShowTypeNewMessageModal, showTypeNewMessageModal}) => {
  const [message, setMessage] = useState<any | null>("");

  const handleSave = () => {
    setNewMessage(message);
    setShowTypeNewMessageModal(false);
  };

  return (
    <>
      {showTypeNewMessageModal && (
        <motion.div
          className="joinRoomModal-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="joinRoomModal-card" variants={modal}>
            <h1 className="joinRoomModal-card-title">Type a New Message</h1>
            <input
              className="joinRoomModal-card-input"
              type="text"
              placeholder="eg: hellooooooo"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSave} className="joinRoomModal-card-button">
              Send!
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
