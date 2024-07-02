import { motion } from "framer-motion";
import "./JoinModal.css";

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
export const JoinModal = ({ showMessageModal, setShowMessageModal, message }) => {

  const handleClick = () => {
    setShowMessageModal(false);
  };

  return (
    <>
      {showMessageModal && (
        <motion.div
          className="joinRoomModal-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="joinRoomModal-card" variants={modal}>
            <h1 className="joinRoomModal-card-title">{message}</h1>
            <button onClick={handleClick} className="joinRoomModal-card-button">
              Understood!
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// export default JoinModal;
