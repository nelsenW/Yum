import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logoutUser } from '../../store/session';

export default function SideNav() {
	const userName = useSelector((state) => state.session.user.username);
    const dispatch = useDispatch();

	return (
		<nav id='nav-sidebar'>
			<div></div>
			<div className='sidebar-profile-token'>
				<h1>{userName}</h1>
				<button className='settings-button' onClick={() => dispatch(logout())}>
					<svg role='img' width='16' height='16' viewBox='0 0 24 24'>
						<path
							fill='currentColor'
							d='M18 2H7C5.897 2 5 2.898 5 4V11H12.59L10.293 8.708L11.706 7.292L16.414 11.991L11.708 16.706L10.292 15.294L12.582 13H5V20C5 21.103 5.897 22 7 22H18C19.103 22 20 21.103 20 20V4C20 2.898 19.103 2 18 2Z'></path>
					</svg>
				</button>
			</div>
		</nav>
	);
}
