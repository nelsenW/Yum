import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddressInput from '../../Map/AddressInput';

function ReviewForm () {
    const [title, setTitle] = useState('');
    const [rating, setRating] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');
    const errors = useSelector(state => state.errors.session);
    const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState
    switch (field){
        case 'title':
            setState = setTitle;
            break;
        case 'rating':
            setState = setRating;
            break;
        case 'body':
            setState = setBody;
            break;
    }
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className='h2-wrapper'>
        <h2>Review</h2>
      </div>
      <div className="errors">{errors?.title}</div>
      <label>Title
        <input type="text"
          value={title}
          onChange={update('title')}
          placeholder="title"
        />
      </label>
      <div className="errors">{errors?.rating}</div>
      <fieldset className='rating-box'>Rating
        <input type='radio' name='rating' value={1} id='rating-1'></input>
            <label className='rating-ind' for='rating-1'></label>
        <input type='radio' name='rating' value={2} id='rating-2'></input>
            <label className='rating-ind' for='rating-2'></label>
        <input type='radio' name='rating' value={3} id='rating-3'></input>
            <label className='rating-ind' for='rating-3'></label>
        <input type='radio' name='rating' value={4} id='rating-4'></input>
            <label className='rating-ind' for='rating-4'></label>
        <input type='radio' name='rating' value={5} id='rating-5'></input>
            <label className='rating-ind' for='rating-5'></label>
      </fieldset>
      <div className="errors">{errors?.body}</div>
      <label>Body
        <input type="textarea"
          value={body}
          onChange={update('body')}
          placeholder="ur mom"
        />
      </label>
      <div className="errors">{errors?.guests}</div>
      <label>Guests
        <input type="text"
          value={guests}
          onChange={update('guests')}
          placeholder="guests"
        />
      </label>
      <div className="errors">{errors?.restrictions}</div>
      <label>Restrictions
        <input type="text"
          value={restrictions}
          onChange={update('restrictions')}
          placeholder="restrictions"
        />
      </label>
      <button
        type="submit"
        disabled={!location || !title}
      >Create</button>
    </form>
  );
}

export default ReviewForm;
