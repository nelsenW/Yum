import jwtFetch from "./jwt";

const RECEIVE_NEW_REVIEW = "REVIEWS/RECEIVE_NEW_REVIEW";
const REMOVE_REVIEW = "REVIEWS/REMOVE_REVIEW";
const RECEIVE_REVIEW_ERRORS = "REVIEWS/RECEIVE_REVIEW_ERRORS";
const CLEAR_REVIEW_ERRORS = "REVIEWS/CLEAR_REVIEW_ERRORS";
const RECEIVE_REVIEWS = "REVIEWS/RECEIVE_REVIEWS";

//add one review
const receiveNewReview = (review) => ({
  type: RECEIVE_NEW_REVIEW,
  review,
});

//remove removes
const removeReview = (reviewID) => ({
  type: REMOVE_REVIEW,
});

//create new review
const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews,
});

//error handling
const receiveErrors = (errors) => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors,
});

export const clearReviewErrors = (errors) => ({
  type: CLEAR_REVIEW_ERRORS,
  errors,
});

export const fetchOfMeReviews = (userId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/${userId}/reviewsOf/`);
    const reviews = await res.json();
    dispatch(receiveReviews(reviews));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchMyReviews = (currentUserId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/${currentUserId}/myReviews/`);
    const reviews = await res.json();
    dispatch(receiveReviews(reviews));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composeHostReview = ({hostId, data}) => async (dispatch) => {
  debugger
  try {
    const res = await jwtFetch(`/api/users/${hostId}/host_reviews/`, {
      method: "POST",
      body: JSON.stringify(data),
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

export const composeGuestReview = ({guestId, data}) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/users/${guestId}/guest_reviews/`, {
      method: "POST",
      body: JSON.stringify(data),
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
  state = { all: {}, new: undefined },
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
