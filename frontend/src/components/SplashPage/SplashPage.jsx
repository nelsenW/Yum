import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';
import NavBar from './Navigation';
import './splashPage.css'
import UserInfoBubble from './userInfoBubble';
import foodReel from '../../assets/foodreel.mp4'

export default function SplashPage() {
	const [loginModal, setLoginModal] = useState(false);
	const [signupModal, setSignupModal] = useState(false);
	const [yanBubble, setYanBubble] = useState(false);
	const [williamBubble, setWilliamBubble] = useState(false);
	const [michaelBubble, setMichaelBubble] = useState(false);


	return (
		<div className='splash-page'>
			<header>
				<NavBar setLoginModal={setLoginModal} setSignupModal={setSignupModal}/>
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

			<main>
				<video autoPlay loop muted playsInline src={foodReel}/>
			</main>
			<footer className='splash-footer'>
				<ul>
					<div onMouseEnter={() =>{setYanBubble(true)}} onMouseLeave={() => {setYanBubble(false)}}>
					<h2 >Yan Rivera</h2>
						{yanBubble && <UserInfoBubble person={'y'}/>}
					</div>
					<div onMouseEnter={() =>{setMichaelBubble(true)}} onMouseLeave={() => {setMichaelBubble(false)}}>
					<h2 >Michael Shih</h2>
						{michaelBubble && <UserInfoBubble person={'m'}/>}
					</div>
					<div onMouseEnter={() =>{setWilliamBubble(true)}} onMouseLeave={() => {setWilliamBubble(false)}}>
					<h2>William Nelsen</h2>
						{williamBubble && <UserInfoBubble person={'w'}/>}
					</div>
				</ul>
			</footer>
		</div>
	);
}
