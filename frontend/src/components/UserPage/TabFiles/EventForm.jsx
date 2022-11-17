import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { composeEvent } from '../../../store/events';
import { clearSessionErrors } from '../../../store/session';
import EventCard from '../../Events/EventCard';
import AddressInput from '../../Map/AddressInput';
import './eventForm.css';

function EventForm() {
	const [location, setLocation] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [guests, setGuests] = useState(null);
	const [restrictions, setRestrictions] = useState('');
	const [eventType, setEventType] = useState('')
	const errors = useSelector((state) => state.errors.session);
	const userId = useSelector((state) => state.session.user._id)
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(clearSessionErrors());
		};
	}, [dispatch]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			composeEvent({
				location,
				title,
				description,
				price,
				guests,
				restrictions,
				eventType,
				host: userId,
				images: (FormData)
			})
		);
	};

	return (
		<div>
			<form className='event-form' onSubmit={handleSubmit}>
				<div className='h2-wrapper'>
					<h2>Make an Event</h2>
				</div>
				<div className='errors'>{errors?.location}</div>
				<label>
					Location
					<AddressInput setLocation={setLocation} />
				</label>
				<div className='errors'>{errors?.title}</div>
				<label>
					Title
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='title'
					/>
				</label>
				<div className='errors'>{errors?.description}</div>
				<label>
					Description
					<input
						type='textarea'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='description'
					/>
				</label>
				<div className='errors'>{errors?.price}</div>
				<label>
					Price
					<input
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder='price'
					/>
				</label>
				<div className='errors'>{errors?.guests}</div>
				<label>
					Guests
					<input
						type='number'
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						placeholder='guests'
					/>
				</label>
				<div className='errors'>{errors?.restrictions}</div>
				<label>
					Restrictions
					<input
						type='text'
						value={restrictions}
						onChange={(e) => setRestrictions(e.target.value)}
						placeholder='restrictions'
					/>
				</label>
				<fieldset
					className='event-type'
					onChange={(e) => setEventType(e.target.value)} value={eventType}>
					<legend>Event Type</legend>
					<input type='radio' id='in-person' name='rating' value='in-person' />
					<label for='in-person'>In-person</label>
					<input type='radio' id='to-go' name='rating' value='to-go' />
					<label for='to-go'>To-go</label>
					<input type='radio' id='both' name='rating' value='both'/>
					<label for='both'>Both</label>
				</fieldset>

				<button type='submit' disabled={!location || !title}>
					Create
				</button>
			</form>
			<EventCard />
		</div>
	);
}

export default EventForm;
