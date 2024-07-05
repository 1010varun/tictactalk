import { useState } from "react";
import { motion } from "framer-motion";
import "../Modal.css";

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
  const Cancel = () => {
    setShowTypeNewMessageModal(false);
  };

  return (
    <>
      {showTypeNewMessageModal && (
        <motion.div
          className="modal-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="modal-card" variants={modal}>
            <h1 className="modal-card-title">Type a New Message</h1>
            <input
              className="modal-card-input"
              type="text"
              placeholder="eg: hellooooooo"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSave} className="modal-card-button">
              Send!
            </button>
            <button onClick={Cancel} className="cancel-modal-card-button">
              Cancel!
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
