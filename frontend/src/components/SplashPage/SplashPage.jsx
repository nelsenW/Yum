import { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from '../SessionForms/LoginForm';
import SignupForm from '../SessionForms/SignupForm';

export default function SplashPage() {
	const [loginModal, setLoginModal] = useState(false);
	const [signupModal, setSignupModal] = useState(false);

	return (
		<>
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
		</>
	);
}
