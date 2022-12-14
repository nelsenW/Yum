import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { composeReview, updateReview } from "../../../store/reviews";
import { clearSessionErrors } from "../../../store/session";
import "./reviewForm.css";

function ReviewForm({
  type,
  review,
  revieweeId,
  kind,
  setUserModal,
  reviewee,
}) {
  // kind = "create"
  // type="host"
  // revieweeId = "637292693d2b405d3bbe38db"

  // getting a single review by Id
  const [title, setTitle] = useState(review?.title ?? "");
  const [rating, setRating] = useState(review?.rating ?? "");
  const [body, setBody] = useState(review?.body ?? "");
  const errors = useSelector((state) => state.errors.session);
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    let setState;
    switch (field) {
      case "title":
        setState = setTitle;
        break;
      case "rating":
        setState = setRating;
        break;
      case "body":
        setState = setBody;
        break;
      default:
        return;
    }
    return (e) => setState(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      title,
      rating,
      body,
      userId: currentUser._id,
    };
    if (kind === "create") {
      dispatch(composeReview({ revieweeId, newReview, type }));
    } else {
      dispatch(
        updateReview({ revieweeId, newReview, type, reviewId: review._id })
      );
    }
    setUserModal(false);
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <div className="h2-wrapper review">
        <h2>Leave a review for {reviewee?.username}</h2>
      </div>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={update("title")}
          placeholder="title"
        />
      </label>
      <div className="errors">{errors?.title}</div>
      <label>
        Body
        <input
          type="textarea"
          value={body}
          onChange={update("body")}
          placeholder="body"
        />
      </label>

      <div className="errors">{errors?.body}</div>

      <fieldset className="rating" onChange={(e) => setRating(e.target.value)}>
        <legend>Rating</legend>
        <input type="radio" id="star1" name="rating" value="1" />
        <label htmlFor="star1"></label>
        <input type="radio" id="star2" name="rating" value="2" />
        <label htmlFor="star2"></label>
        <input type="radio" id="star3" name="rating" value="3" />
        <label htmlFor="star3"></label>
        <input type="radio" id="star4" name="rating" value="4" />
        <label htmlFor="star4"></label>
        <input type="radio" id="star5" name="rating" value="5" />
        <label htmlFor="star5"></label>
      </fieldset>
      <div className="errors">{errors?.rating}</div>
      <div className="create-review-btn-container">
        <button type="submit" disabled={!rating || !title}>
          Create
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
