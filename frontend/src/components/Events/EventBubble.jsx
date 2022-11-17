import { Modal } from '../../context/Modal';
import './eventBubble.css'
import { useState } from 'react';


export default function EventBubble({event}){
    const [eventModal, setEventModal] = useState(false);

    return (
        <div className="event-bubble" onClick={() => {setEventModal(true)}}>
            <img id='event-bubble-img' src={event.image}></img>
            <div id='event-bubble-desc'>
                <h2>{event.title}</h2>
                <h4>{event.price}</h4>
            </div>
            {eventModal && (
					<Modal onClose={() => setEventModal(false)}>
						<EventModal setEventModal={setEventModal} event={event}/>
					</Modal>
				)}
        </div>
    )
}