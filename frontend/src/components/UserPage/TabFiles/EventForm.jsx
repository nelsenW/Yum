import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { composeEvent } from '../../../store/events';
import { clearSessionErrors } from '../../../store/session';
import EventCard from '../../Events/EventCard';
import AddressInput from '../../Map/AddressInput';
import './eventForm.css'

function EventForm() {
	const [location, setLocation] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [guests, setGuests] = useState('');
	const [restrictions, setRestrictions] = useState('');
	const errors = useSelector((state) => state.errors.session);
	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(clearSessionErrors());
		};
	}, [dispatch]);

	const update = (field) => {
		let setState;
		switch (field) {
			case 'location':
				setState = setLocation;
				break;
			case 'title':
				setState = setTitle;
				break;
			case 'description':
				setState = setDescription;
				break;
			case 'price':
				setState = setPrice;
				break;
			case 'guests':
				setState = setGuests;
				break;
			case 'restrictions':
				setState = setRestrictions;
				break;
			default:
				return;
		}
		return (e) => setState(e.currentTarget.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			composeEvent({
				location,
				title,
				description,
				price,
				guests,
				restrictions
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
					<AddressInput />
				</label>
				<div className='errors'>{errors?.title}</div>
				<label>
					Title
					<input
						type='text'
						value={title}
						onChange={update('title')}
						placeholder='title'
					/>
				</label>
				<div className='errors'>{errors?.description}</div>
				<label>
					Description
					<input
						type='textarea'
						value={description}
						onChange={update('description')}
						placeholder='description'
					/>
				</label>
				<div className='errors'>{errors?.price}</div>
				<label>
					Price
					<input
						type='number\'
						value={price}
						onChange={update('price')}
						placeholder='price'
					/>
				</label>
				<div className='errors'>{errors?.guests}</div>
				<label>
					Guests
					<input
						type='text'
						value={guests}
						onChange={update('guests')}
						placeholder='guests'
					/>
				</label>
				<div className='errors'>{errors?.restrictions}</div>
				<label>
					Restrictions
					<input
						type='text'
						value={restrictions}
						onChange={update('restrictions')}
						placeholder='restrictions'
					/>
				</label>
				<button type='submit' disabled={!location || !title}>
					Create
				</button>
			</form>
            <EventCard />
		</div>
	);
}

export default EventForm;
