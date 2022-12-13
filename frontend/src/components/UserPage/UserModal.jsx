import "./userModal.css";
import { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";
import P1 from "../../assets/cookingP1.jpg";
import P2 from "../../assets/cookingp2.jpg";
import P3 from "../../assets/cookingP3.jpg";
import P4 from "../../assets/cookingP4.jpg";
import { useSelector } from "react-redux";

export default function UserModal({ userId, setUserModal }) {
  const [user, setUser] = useState();
  const reviews = useSelector((state) =>
    state?.reviews?.new ? Object.values(state.reviews?.new) : null
  );
  const peopleImgs = [P1, P2, P3, P4];
  const currentUser = useSelector((state) => state.session.user);

  const fetchUser = async (userId) => {
    try {
      const res = await jwtFetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data[0]);
    } catch (err) {
      const resBody = await err.json();
      console.log(resBody);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, [reviews?.length]);

  const reviewsAverage = (type) => {
    if (user && user[type].length > 0) {
      return (
        user[type].reduce((acc, el) => {
          return acc + el.rating;
        }, 0) / user[type].length
      ).toFixed(2);
    }
  };

  return (
    <div id="user-modal">
      <img
        src={peopleImgs[Math.floor(Math.random() * 3)]}
        className="person-img"
        alt=""
      ></img>
      <div className="user-modal-info">
        <h1 id="user-modal-info-username">{user?.username}</h1>
        {currentUser?._id !== user?._id ? (
          <button
            className="submit-button"
            onClick={() => {
              setUserModal(true);
            }}
          >
            Leave a review
          </button>
        ) : (
          <div style={{ marginBottom: "15px" }}></div>
        )}
        <div>
          <h2>
            Host Reviews:{" "}
            <span>
              {reviewsAverage("hostReviews")}{" "}
              <i className="fa-regular fa-star"></i>
            </span>
          </h2>
          <ul className="reviews-list">
            {user?.hostReviews?.map((review) => {
              return (
                <li className="review-bubble" key={review._id}>
                  <h3>
                    {review.title}{" "}
                    <span>
                      {review.rating} <i className="fa-regular fa-star"></i>
                    </span>
                  </h3>
                  <p>{review.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <br />
        <br />
        {/* <div>
  <h2>
          Guest Reviews:{" "}
          <span>
            {reviewsAverage("guestReviews")}{" "}
            <i className="fa-regular fa-star"></i>
          </span>
        </h2>
        <ul className="reviews-list">
          {user?.guestReviews?.map((review) => {
            return (
              <li className="review-bubble">
                <h3>
                  {review.title}{" "}
                  <span>
                    {review.rating} <i className="fa-regular fa-star"></i>
                  </span>
                </h3>
                <p>{review.body}</p>
              </li>
            );
          })}
        </ul>
</div> */}
      </div>
    </div>
  );
}
