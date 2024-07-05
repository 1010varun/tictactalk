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
export const MessageModal = ({ showMessageModal, setShowMessageModal, message, setShowJoinModal }) => {

  const handleClick = () => {
    setShowMessageModal(false);
    setShowJoinModal(true);
  };

  return (
    <>
      {showMessageModal && (
        <motion.div
          className="modal-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="modal-card" variants={modal}>
            <h1 className="modal-card-title">{message}</h1>
            <button onClick={handleClick} className="modal-card-button">
              Okieee!
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
