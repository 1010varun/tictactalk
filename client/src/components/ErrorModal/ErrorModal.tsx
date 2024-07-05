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
export const ErrorModal = ({showErrorModal, setShowErrorModal, error}) => {
  const handleClick = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      {showErrorModal && (
        <motion.div
          className="modal-container"
          variants={backgrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="modal-card" variants={modal}>
            <h1 className="modal-card-title">{error}</h1>
            <button onClick={handleClick} className="cancel-modal-card-button">
              Okieee!
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
