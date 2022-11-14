import { NavLink } from 'react-router-dom';

export default function NavBar({setLoginModal, setSignupModal}) {
	return (
		<nav>
			<NavLink to='/' className='splash-nav-title'>
				Y<img src='../../assets/tongue.jpeg' alt=''/>M
			</NavLink>
			<button id='login' onClick={() => setLoginModal(true)}>
				Login
			</button>
			<button id='signup' onClick={() => setSignupModal(true)}>
				Signup
			</button>
		</nav>
	);
}
