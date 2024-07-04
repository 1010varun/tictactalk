import { LinkSvg } from "./Link";
import "./Footer.css";

//@ts-ignore
export const Footer = ({ setShowTypeNewMessageModal }) => {
  return (
    <footer>
      <LinkSvg setShowTypeNewMessageModal={setShowTypeNewMessageModal} />
    </footer>
  );
};