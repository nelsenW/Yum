import { NavLink } from 'react-router-dom';
import tongue from '../../assets/tongue.png'
import './navigation.css'

export default function NavBar({setLoginModal, setSignupModal}) {
	return (
		<nav className='splash-nav'>
			<NavLink to='/' className='splash-nav-title'>
				Y<img src={tongue} alt='' id='tongue'/>M
			</NavLink>
			<div>
				<button className='nav-button' onClick={() => setLoginModal(true)}>
				Login
				</button>
				<button className='nav-button' onClick={() => setSignupModal(true)}>
					Signup
				</button>
			</div>
		</nav>
	);
}
