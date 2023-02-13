import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import Errors from "../Errors/Errors";
import LoginForm from "../SessionForms/LoginForm";
import SignupForm from "../SessionForms/SignupForm";
import Canvas from "./Canvas";
import NavBar from "./Navigation";
import "./splashPage.css";
import "./navigation.css"
import UserInfoBubble from "./userInfoBubble";
import michael from "../../assets/profiles/michael.jpeg";
import william from "../../assets/profiles/william.jpeg";
import yan from "../../assets/profiles/yan.jpg";

export default function SplashPage() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [yanBubble, setYanBubble] = useState(false);
  const [williamBubble, setWilliamBubble] = useState(false);
  const [michaelBubble, setMichaelBubble] = useState(false);
  const [canvasLoad, setCanvasLoad] = useState(false);
  const errors = useSelector((state) =>
    state.errors.session ? state.errors.session : []
  );

  useEffect(() => {
    setCanvasLoad(true);
  }, []);

  return (
    <div className="splash-page">
      <header>
        <NavBar setLoginModal={setLoginModal} setSignupModal={setSignupModal} />
      </header>

      {signupModal && (
        <Modal onClose={() => setSignupModal(false)}>
          <SignupForm setSignupModal={setSignupModal} />
        </Modal>
      )}
      {loginModal && (
        <Modal onClose={() => setLoginModal(false)}>
          <LoginForm setLoginModal={setLoginModal} />
        </Modal>
      )}

      <main id="splash-main">
        <p className="splash-nav-title" id="welcome-sign">A way home chefs can connect with their local community and share or sell extra food!</p>
        <canvas id="canvas">{canvasLoad && <Canvas />}</canvas>
      </main>
      <footer className="splash-footer">
        <ul>
          <div
            onMouseEnter={() => {
              setYanBubble(true);
            }}
            onMouseLeave={() => {
              setYanBubble(false);
            }}
            className="footer-bubble"
          >
            <h2>Yan Rivera</h2>
            {yanBubble && <UserInfoBubble person={"y"} image={yan} />}
          </div>
          <div
            onMouseEnter={() => {
              setMichaelBubble(true);
            }}
            onMouseLeave={() => {
              setMichaelBubble(false);
            }}
            className="footer-bubble"
          >
            <h2>Michael Shih</h2>
            {michaelBubble && <UserInfoBubble person={"m"} image={michael} />}
          </div>
          <div
            onMouseEnter={() => {
              setWilliamBubble(true);
            }}
            onMouseLeave={() => {
              setWilliamBubble(false);
            }}
            className="footer-bubble"
          >
            <h2>William Nelsen</h2>
            {williamBubble && <UserInfoBubble person={"w"} image={william} />}
          </div>
        </ul>
        <p>copyright © Yum 2023</p>
      </footer>
    </div>
  );
}
