import jwtFetch from './jwt';

const RECEIVE_NEW_REVIEW = 'REVIEWS/RECEIVE_NEW_REVIEW';
const REMOVE_REVIEW = 'REVIEWS/REMOVE_REVIEW';
const RECEIVE_REVIEW_ERRORS = 'REVIEWS/RECEIVE_REVIEW_ERRORS';
const CLEAR_REVIEW_ERRORS = 'REVIEWS/CLEAR_REVIEW_ERRORS';

const receiveNewReview = (review) => ({
	type: RECEIVE_NEW_REVIEW,
	review
});

const removeReview = (reviewID) => ({
	type: REMOVE_REVIEW
});

const receiveErrors = (errors) => ({
	type: RECEIVE_REVIEW_ERRORS,
	errors
});

export const clearReviewErrors = (errors) => ({
	type: CLEAR_REVIEW_ERRORS,
	errors
});

export const fetchReviews = () => async (dispatch) => {
	try {
		const res = await jwtFetch('/api/reviews/');
		const reviews = await res.json();
		dispatch(receiveReviews(reviews));
	} catch (err) {
		const resBody = await err.json();
		if (resBody.statusCode === 400) {
			dispatch(receiveErrors(resBody.errors));
		}
	}
};

export const composeReview = (data) => async (dispatch) => {
	try {
		const res = await jwtFetch('/api/reviews/', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		const review = await res.json();
		dispatch(receiveNewReview(review));
	} catch (err) {
		const resBody = await err.json();
		if (resBody.statusCode === 400) {
			return dispatch(receiveErrors(resBody.errors));
		}
	}
};

const nullErrors = null;

export const reviewErrorsReducer = (state = nullErrors, action) => {
	switch (action.type) {
		case RECEIVE_REVIEW_ERRORS:
			return action.errors;
		case RECEIVE_NEW_REVIEW:
		case CLEAR_REVIEW_ERRORS:
			return nullErrors;
		default:
			return state;
	}
};

const reviewsReducer = (
	state = { all: {}, user: {}, new: undefined },
	action
) => {
	switch (action.type) {
		case RECEIVE_REVIEWS:
			return { ...state, all: action.reviews, new: undefined };
		case RECEIVE_NEW_REVIEW:
			return { ...state, new: action.review };
		default:
			return state;
	}
};

export default reviewsReducer;
