import { Modal } from '../../context/Modal';
import './eventBubble.css';
import { useEffect, useState } from 'react';
import EventModal from './EventModal';

export default function EventBubble({ event, setUserModal, setInputTab }) {
	const [eventModal, setEventModal] = useState(false);
	return (
		<div>
			<div
				className='event-bubble'
				onClick={() => {
					setEventModal(true);
				}}>
				<img id='event-bubble-img' src={event?.images[0]}></img>
				<div id='event-bubble-desc'>
					<h2>{event?.title}</h2>
					<h4>{`${event.guestLists.length === event.guestNumber ? 'Sold out' : '$ ' + event?.price}`}</h4>
				</div>
			</div>
			{eventModal && (
				<Modal
					onClose={() => {
						setEventModal(false);
					}}>
					<EventModal setEventModal={setEventModal} event={event} setUserModal={setUserModal} setInputTab={setInputTab}/>
				</Modal>
			)}
		</div>
	);
}
